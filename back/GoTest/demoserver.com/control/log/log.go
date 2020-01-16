package log

import (
	"io"
	"log"
	"os"
)

var (
	Info    *log.Logger
	Warning *log.Logger
	Error   *log.Logger
)

func init() {
	infoFile, err := os.OpenFile("log/info.txt", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalln("打开日志文件失败：", err)
	}

	warningFile, err := os.OpenFile("log/warning.txt", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 666)
	if err != nil {
		log.Fatalln("打开日志文件失败：", err)
	}

	errorFile, err := os.OpenFile("log/errors.txt", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 666)
	if err != nil {
		log.Fatalln("打开日志文件失败：", err)
	}

	Info = log.New(io.MultiWriter(os.Stdout, infoFile), "Info:", log.Ldate|log.Ltime|log.Lshortfile)

	Warning = log.New(io.MultiWriter(os.Stdout, warningFile), "Info:", log.Ldate|log.Ltime|log.Lshortfile)

	Error = log.New(io.MultiWriter(os.Stdout, errorFile), "Info:", log.Ldate|log.Ltime|log.Lshortfile)
}
