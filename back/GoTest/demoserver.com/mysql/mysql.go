package mysql

import (
	"database/sql"
	"fmt"
	"strings"

	_ "github.com/go-sql-driver/mysql"
)

const (
	userName = "root"
	password = "7041"
	ip       = "127.0.0.1"
	port     = "3306"
	dbName   = "role"
)

func GetDBConnection() *sql.DB {
	path := strings.Join([]string{userName, ":", password, "@tcp(", ip, ":", port, ")/", dbName, "?charset=utf8"}, "")
	DB, _ := sql.Open("mysql", path)
	if err := DB.Ping(); err != nil {
		fmt.Println("连接数据库失败")
		return nil
	}
	fmt.Println("连接数据库成功")
	return DB
}
