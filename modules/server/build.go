package server

import (
	"fmt"
	"strings"

	esbuild "github.com/evanw/esbuild/pkg/api"
	"github.com/highercomve/go-react-ssr/modules/lib/util"
)

/*

使用 esbuild 打包 前端代码文件

*/

const textEncoderPolyfill = `function TextEncoder(){} TextEncoder.prototype.encode=function(string){var octets=[],length=string.length,i=0;while(i<length){var codePoint=string.codePointAt(i),c=0,bits=0;codePoint<=0x7F?(c=0,bits=0x00):codePoint<=0x7FF?(c=6,bits=0xC0):codePoint<=0xFFFF?(c=12,bits=0xE0):codePoint<=0x1FFFFF&&(c=18,bits=0xF0),octets.push(bits|(codePoint>>c)),c-=6;while(c>=0){octets.push(0x80|((codePoint>>c)&0x3F)),c-=6}i+=codePoint>=0x10000?2:1}return octets};function TextDecoder(){} TextDecoder.prototype.decode=function(octets){var string="",i=0;while(i<octets.length){var octet=octets[i],bytesNeeded=0,codePoint=0;octet<=0x7F?(bytesNeeded=0,codePoint=octet&0xFF):octet<=0xDF?(bytesNeeded=1,codePoint=octet&0x1F):octet<=0xEF?(bytesNeeded=2,codePoint=octet&0x0F):octet<=0xF4&&(bytesNeeded=3,codePoint=octet&0x07),octets.length-i-bytesNeeded>0?function(){for(var k=0;k<bytesNeeded;){octet=octets[i+k+1],codePoint=(codePoint<<6)|(octet&0x3F),k+=1}}():codePoint=0xFFFD,bytesNeeded=octets.length-i,string+=String.fromCodePoint(codePoint),i+=bytesNeeded+1}return string};`

const messageChannelPolyfill = `if(typeof MessageChannel==="undefined"){var MessageChannel=function(){this.port1={postMessage:function(msg){setTimeout(()=>{this.onmessage&&this.onmessage({data:msg})},0)},onmessage:null},this.port2={postMessage:function(msg){setTimeout(()=>{this.onmessage&&this.onmessage({data:msg})},0)},onmessage:null}}}`

const processPolyfill = `var process = {env: {NODE_ENV: "production"}};`

func BuildClientComponents(jsFolder, jsOutput string) error {
	fmt.Println("Building client Javascript")

	filesJSX, err := util.GetFiles(jsFolder, ".jsx")
	if err != nil {
		return err
	}

	filesTSX, err := util.GetFiles(jsFolder, ".tsx")
	if err != nil {
		return err
	}

	allFiles := append(filesJSX, filesTSX...)
	allFiles = append(allFiles, "./frontend/app.js")

	builds := esbuild.Build(esbuild.BuildOptions{
		EntryPoints:    allFiles,
		Bundle:         true,
		Write:          true,
		Splitting:      true,
		AllowOverwrite: true,
		AssetNames:     "[name]-[hash]",
		Outdir:         jsOutput,
		Format:         esbuild.FormatESModule,
		Platform:       esbuild.PlatformBrowser,
		Target:         esbuild.ESNext,
		Loader: map[string]esbuild.Loader{
			".jsx":  esbuild.LoaderJSX,
			".tsx":  esbuild.LoaderTSX,
			".scss": esbuild.LoaderLocalCSS,
		},
	})

	if len(builds.Errors) > 0 {
		return fmt.Errorf("error on esbuild: %v", builds.Errors)
	}

	for _, file := range builds.OutputFiles {
		fmt.Println("Created file:", file.Path)
	}

	return nil
}

func BuildServerComponents(jsFolder, jsOutput string) (map[string]string, error) {
	fmt.Println("Building server Javascript")
	result := map[string]string{}

	filesJSX, err := util.GetFiles(jsFolder, ".jsx")
	if err != nil {
		return result, err
	}

	filesTSX, err := util.GetFiles(jsFolder, ".tsx")
	if err != nil {
		return result, err
	}

	// filesJS, err := GetFiles(jsFolder, ".js")
	// if err != nil {
	// 	return result, err
	// }

	allFiles := append(filesJSX, filesTSX...)

	builds := esbuild.Build(esbuild.BuildOptions{
		EntryPoints: allFiles,
		Bundle:      true,
		Write:       true,
		Outdir:      jsOutput,
		Format:      esbuild.FormatESModule,
		Platform:    esbuild.PlatformBrowser,
		Target:      esbuild.ESNext,
		Banner: map[string]string{
			"js": processPolyfill + messageChannelPolyfill + textEncoderPolyfill,
		},
		Loader: map[string]esbuild.Loader{
			".jsx":  esbuild.LoaderJSX,
			".tsx":  esbuild.LoaderTSX,
			".scss": esbuild.LoaderLocalCSS,
		},
	})

	if len(builds.Errors) > 0 {
		return result, fmt.Errorf("error on esbuild: %v", builds.Errors)
	}

	for _, file := range builds.OutputFiles {
		if strings.Contains(file.Path, jsOutput) {
			paths := strings.Split(file.Path, jsOutput)
			path := ""
			if len(paths) >= 2 {
				path = strings.Join(paths[1:], "")
			}
			result[path] = string(file.Contents)
			fmt.Println("Server file built in:", path)

		}
	}

	return result, nil
}
