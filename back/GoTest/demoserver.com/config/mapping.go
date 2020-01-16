package config

const BOLG_MAPPING = `{
	"mappings":{
		"blog":{
			"properties":{
				"author":{
					"type": "keyword"
				},
				"title":{
					"type": "text"
				},
				"viewed":{
					"type": "integer"
				},
				"summary":{
					"type": "text"
				},
				"content":{
					"type": "text"
				},
				"created":{
					"type": "date"
				},
				"tags":{
					"type":	"keyword"
				}
			}
		}
	}
}`
