package elasticsearch

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"demoserver.com/config"
	"demoserver.com/control/log"
	"github.com/olivere/elastic"
)

var host = "http://127.0.0.1:9200/"

var client *elastic.Client

func init() {
	var err error
	client, err = elastic.NewClient(elastic.SetURL(host))
	if err != nil {
		log.Error.Println("连接elasticsearch失败", err)
	} else {
		log.Info.Println("成功连接elasticsearch数据库")
	}
	isExist := IndexExists(config.BLOG_INDEX)
	if !isExist {
		result := CreateIndex(config.BLOG_INDEX, config.BOLG_MAPPING)
		log.Info.Println("索引创建结果", result)
	}
}

func PingNode() {
	start := time.Now()
	info, code, err := client.Ping(host).Do(context.Background())
	if err != nil {
		log.Error.Println("ping 失败", err)
	}
	duration := time.Since(start)
	log.Info.Println("ping 时间", duration)
	log.Info.Println("ping 结果", code, info.Version.Number)
}

func IndexExists(index ...string) bool {
	exists, err := client.IndexExists(index...).Do(context.Background())
	if err != nil {
		log.Error.Println("验证索引失败", err)
	}
	return exists
}

func CreateIndex(index, mapping string) bool {
	result, err := client.CreateIndex(index).BodyString(mapping).Do(context.Background())
	if err != nil {
		log.Error.Println("创建索引失败", err)
	}
	return result.Acknowledged
}

func DelIndex(index ...string) bool {
	response, err := client.DeleteIndex(index...).Do(context.Background())
	if err != nil {
		log.Error.Println("删除索引失败", err)
	}
	return response.Acknowledged
}

func Insert(index string, estype string, blog config.Blog) bool {
	//b1 := Blog{"rex", 200, "this is the context", time.Now(), []string{"a", "b"}}
	result, err := client.Index().Index(index).Type(estype).BodyJson(blog).Do(context.Background())
	if err != nil {
		log.Error.Println("插入失败", err)
		return false
		//panic(err)
	}
	log.Info.Println(result)
	return true
}

func Search(index, type_ string) *elastic.SearchResult {
	//boolQuery := elastic.NewBoolQuery()
	//boolQuery.Must(elastic.NewMatchQuery("author", "rex"))
	//boolQuery.Filter(elastic.NewRangeQuery("viewed").Gt("30"))
	searchResult, err := client.Search(index).
		Type(type_).From(0).Size(100).Do(context.Background())
	if err != nil {
		log.Error.Println("查找博客失败", err)
	}
	return searchResult
}

func GetBlogByID(index, id string) config.Blog {
	result, err := client.Get().Index(index).Id(id).Do(context.Background())
	if err != nil {
		log.Error.Println("获取博客失败", err)
	}
	var blog config.Blog
	json.Unmarshal(*result.Source, &blog)
	return blog
}

func SearchByContions(index, estype, contions string, startTime, endTime time.Time) *elastic.SearchResult {
	boolQuery := elastic.NewBoolQuery()
	if contions != "" {
		boolQuery.Must(elastic.NewTermQuery("title", contions))
	}
	boolQuery.Must(elastic.NewRangeQuery("created").Gte(startTime))
	boolQuery.Must(elastic.NewRangeQuery("created").Lte(endTime))

	//boolQuery.Must(elastic.NewMatchQuery("title", contions))
	result, err := client.Search(index).Type(estype).Query(boolQuery).Do(context.Background())
	if err != nil {
		fmt.Println("条件搜索失败", err)
	}
	return result
}
