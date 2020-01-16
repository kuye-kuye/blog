package config

import "time"

const (
	BLOG_INDEX = "blog"
	BLOG_TYPE  = "blog"
	//BLOG_COMMENTS_TYPE = "comment"
)

type Blog struct {
	Author  string    `json:"author"`            //标题
	Title   string    `json:"title"`             //标题
	Viewed  int       `json:"viewed"`            //浏览次数
	Summary string    `json:"summary"`           //文章概要
	Content string    `json:"content"`           //内容
	Created time.Time `json:"created,omitempty"` //写作时间
	Tags    []string  `json:"tags,omitempty"`    //标签
}
