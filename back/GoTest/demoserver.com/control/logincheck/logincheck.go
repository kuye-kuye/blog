package logincheck

import (
	"fmt"
	"net/http"

	"demoserver.com/mysql"
)

type searchResult struct {
	truepasswd string
	permission string
}

const (
	noUser      = "Nonexistent username"
	wrongPasswd = "Incorrect Password"
)

func LoginCheck(w http.ResponseWriter, r *http.Request) (bool, string) {
	r.ParseForm()
	username := r.FormValue("username")
	password := r.FormValue("password")
	fmt.Println(username, password)

	search_mysql := "select password,permission from AccountLoginUser where user = ?"
	var searchResult searchResult
	dbConnection := mysql.GetDBConnection()
	defer fmt.Println("断开数据库连接")
	defer dbConnection.Close()
	search_err := dbConnection.QueryRow(search_mysql, username).Scan(&searchResult.truepasswd, &searchResult.permission)

	if search_err != nil {
		fmt.Println(username, "用户不存在")
		return false, noUser
	}
	if searchResult.truepasswd != password {
		fmt.Println(username, "密码错误")
		return false, wrongPasswd
	}
	fmt.Println(searchResult.truepasswd, searchResult.permission)
	return true, searchResult.permission
}
