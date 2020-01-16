package main

import (
	"net/http"

	"demoserver.com/control/log"
	_ "demoserver.com/elasticsearch"
	"demoserver.com/route"
)

func main() {
	mux := &route.MyMux{}
	err := http.ListenAndServe(":3005", mux)
	if err == nil {
		log.Info.Println("服务启动")
	}
}
