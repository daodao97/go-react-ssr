package app

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type PrivacyProps struct {
	Title   string           `json:"title"`
	Content []PrivacyContent `json:"content"`
}

type PrivacyContent struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

func Privacy(c *gin.Context) {
	data := PrivacyProps{
		Title: "Privacy Policy",
		Content: []PrivacyContent{
			{
				Title:   "Cookie Policy",
				Content: "This is the cookie policy",
			},
		},
	}

	// data := map[string]interface{}{
	// 	"title": "Privacy Policy",
	// }

	c.HTML(http.StatusOK, "index.html:Privacy.js", data)
}
