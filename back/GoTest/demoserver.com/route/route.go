package route

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"demoserver.com/config"

	"demoserver.com/control/blog"
	"demoserver.com/control/log"
	"demoserver.com/control/logincheck"
)

type MyMux struct {
}
type ResponseData struct {
	config.Blog
	Id string
}

func (mymux *MyMux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")             //允许访问所有域
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type") //header的类型
	w.Header().Set("content-type", "application/json")             //返回数据格式是json
	if r.Method == "OPTIONS" {
		return
	}
	switch r.URL.Path {
	case "/":
		http.Redirect(w, r, "http://127.0.0.1:3001/login", http.StatusFound)
	case "/logincheck":
		{
			isTrue, _ := logincheck.LoginCheck(w, r)
			if isTrue == true {
			}
		}
	case "/mainPage/blog/getBlogs":
		{
			blogs, ids := blog.GetBlogs()
			var responseData []ResponseData
			for i, blog := range blogs {
				data := ResponseData{blog, ids[i]}
				responseData = append(responseData, data)
			}
			err := responseJson(w, responseData)
			if err != nil {
				fmt.Println(err)
			}
		}
	case "/mainPage/markdown/writeBlog":
		{
			r.ParseForm()
			title := r.FormValue("title")
			author := r.FormValue("author")
			content := r.FormValue("content")
			summary := r.FormValue("summary")
			created := time.Now()
			tagsString := r.FormValue("tags")
			tags := strings.SplitAfter(tagsString, ",")
			blogdata := config.Blog{Author: author, Title: title, Viewed: 0, Summary: summary, Content: content, Created: created, Tags: tags}
			result := blog.InsertBlog(blogdata)
			log.Info.Println("写入博客", result)
		}
	case "/getBlogById":
		{
			r.ParseForm()
			id := r.FormValue("id")
			data := blog.GetBlogById(id)
			err := responseJson(w, data)
			if err != nil {
				fmt.Println(err)
			}
		}

	case "/getBlogByConditions":
		{
			r.ParseForm()
			contions := r.FormValue("condtions")
			startTime := r.FormValue("startTime")
			endTime := r.FormValue("endTime")
			timeLayout := "2006-01-02"           //转化所需模板
			loc, _ := time.LoadLocation("Local") //重要：获取时区
			sTime, _ := time.ParseInLocation(timeLayout, startTime, loc)
			eTime, _ := time.ParseInLocation(timeLayout, endTime, loc)

			blogs, ids := blog.SearchByContions(contions, sTime, eTime)
			var responseData []ResponseData
			for i, blog := range blogs {
				data := ResponseData{blog, ids[i]}
				responseData = append(responseData, data)
			}
			err := responseJson(w, responseData)
			if err != nil {
				fmt.Println(err)
			}
		}

	}

	return
}

func responseJson(w http.ResponseWriter, data interface{}) error {
	w.Header().Set("Content-Type", "application/json")
	encoder := json.NewEncoder(w)
	return encoder.Encode(data)
}
