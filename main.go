package main

import (
	"os"
	"strings"

	"github.com/daodao97/xgo/xlog"
	"github.com/highercomve/go-react-ssr/modules/server"
)

var (
	GitCommit string
	GitTag    string
)

func init() {
	buildEnvironmentJS("build")
}

func main() {
	xlog.Debug("GitCommit", xlog.Any("GitCommit", GitCommit))
	xlog.Debug("GitTag", xlog.Any("GitTag", GitTag))
	server.Start(GitCommit, GitTag)
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
