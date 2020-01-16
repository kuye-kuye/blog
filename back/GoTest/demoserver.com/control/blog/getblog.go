package blog

import (
	"reflect"
	"time"

	"demoserver.com/config"
	"demoserver.com/elasticsearch"
)

func GetBlogs() ([]config.Blog, []string) {
	var blog config.Blog    //定义博客的类型，用于将从es中获取的数据格式化
	var blogs []config.Blog //定义切片，存放所有元素
	var ids []string
	result := elasticsearch.Search(config.BLOG_INDEX, config.BLOG_TYPE)
	for i, item := range result.Each(reflect.TypeOf(blog)) {
		ids = append(ids, result.Hits.Hits[i].Id)
		blogs = append(blogs, item.(config.Blog))
	}
	return blogs, ids
}

func InsertBlog(blog config.Blog) bool {
	return elasticsearch.Insert(config.BLOG_INDEX, config.BLOG_TYPE, blog)
}

func GetBlogById(id string) config.Blog {
	return elasticsearch.GetBlogByID("blog", id)
}

func SearchByContions(conditions string, startTime, endTime time.Time) ([]config.Blog, []string) {
	var blog config.Blog
	var blogs []config.Blog
	var ids []string
	result := elasticsearch.SearchByContions(config.BLOG_INDEX, config.BLOG_TYPE, conditions, startTime, endTime)
	for i, item := range result.Each(reflect.TypeOf(blog)) {
		ids = append(ids, result.Hits.Hits[i].Id)
		blogs = append(blogs, item.(config.Blog))
	}
	return blogs, ids
}
