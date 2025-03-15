package app

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Terms(c *gin.Context) {
	data := PrivacyProps{
		Title: "Terms of Service",
		Content: []PrivacyContent{
			{
				Title:   "Cookie Policy",
				Content: "This is the cookie policy",
			},
		},
	}
	c.HTML(http.StatusOK, "index.html:Privacy.js", data)
}
