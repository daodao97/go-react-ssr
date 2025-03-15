package main

import (
	"os"
	"strings"

	"github.com/highercomve/go-react-ssr/modules/server"
)

//go:generate go run ./cmd/build/...

func init() {
	buildEnvironmentJS("build")
}

func main() {
	server.Start()
}

func buildEnvironmentJS(folder string) error {
	var environment = "if (!window.env) { window.env = {} } \n"
	for _, e := range os.Environ() {
		if strings.Contains(e, "REACT_APP_") {
			pair := strings.SplitN(e, "=", 2)
			environment = environment + "window.env." + pair[0] + "='" + pair[1] + "';"
		}
	}

	return os.WriteFile(folder+"/environment.js", []byte(environment), 0644)
}
