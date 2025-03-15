package main

import (
	"log"

	"github.com/highercomve/go-react-ssr/modules/server"
)

func main() {
	err := server.BuildClientComponents("./frontend/app", "build/")
	if err != nil {
		log.Fatal(err)
	}

	_, err = server.BuildServerComponents("./frontend/server", "build/server/")
	if err != nil {
		log.Fatal(err)
	}
}
