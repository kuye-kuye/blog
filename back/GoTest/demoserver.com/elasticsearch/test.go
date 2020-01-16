package elasticsearch

import (
	"fmt"
	"testing"
)

var mapping = `{
	"mappings":{
		"blog":{
			"properties":{
				"author":{
					"type":"keyword"
				},
				"viewed":{
					"type": "integer"
				},
				"message":{
					"type":"text"
				},
				"created":{
					"type":"date"
				},
				"tags":{
					"type":"keyword"
				}
			}
		}
	}
}`

func TestPingNode(t *testing.T) {
	PingNode()
}

func TestIndexExists(t *testing.T) {
	result := IndexExists("kuye")
	fmt.Println("all index exists: ", result)
}

func TestDeleteIndex(t *testing.T) {
	result := DelIndex("kuye")
	fmt.Println("all index deleted: ", result)
}

func TestCreateIndex(t *testing.T) {
	result := CreateIndex("kuye", mapping)
	fmt.Println("mapping created: ", result)
}

// func TestBatch(t *testing.T) {
// 	tweet1 := Tweet{User: "Jame1", Age: 23, Message: "Take One", Retweets: 1, Created: time.Now()}
// 	tweet2 := Tweet{User: "Jame2", Age: 32, Message: "Take Two", Retweets: 0, Created: time.Now()}
// 	tweet3 := Tweet{User: "Jame3", Age: 32, Message: "Take Three", Retweets: 0, Created: time.Now()}
// 	Batch("twitter", "doc", tweet1, tweet2, tweet3)
// }

// func TestGetDoc(t *testing.T) {
// 	var tweet Tweet
// 	data := GetDoc("twitter", "1")
// 	if err := json.Unmarshal(data, &tweet); err == nil {
// 		fmt.Printf("data: %v\n", tweet)
// 	}
// }

// func TestTermQuery(t *testing.T) {
// 	var tweet Tweet
// 	result := TermQuery("twitter", "doc", "user", "Take Two")
// 	//获得数据, 方法一
// 	for _, item := range result.Each(reflect.TypeOf(tweet)) {
// 		if t, ok := item.(Tweet); ok {
// 			fmt.Printf("tweet : %v\n", t)
// 		}
// 	}
// 	//获得数据, 方法二
// 	fmt.Println("num of raws: ", result.Hits.TotalHits)
// 	if result.Hits.TotalHits > 0 {
// 		for _, hit := range result.Hits.Hits {
// 			err := json.Unmarshal(*hit.Source, &tweet)
// 			if err != nil {
// 				fmt.Printf("source convert json failed, err: %v\n", err)
// 			}
// 			fmt.Printf("data: %v\n", tweet)
// 		}
// 	}
// }

// func TestSearch(t *testing.T) {
// 	fmt.Println("------")

// 	result := Search("kuye", "blog")
// 	fmt.Println(result.Hits)
// 	var blog Blog
// 	for _, item := range result.Each(reflect.TypeOf(blog)) {
// 		fmt.Println("-----", item)
// 	}
// }

// func TestAggsSearch(t *testing.T) {
// 	AggsSearch("twitter", "doc")
// }
