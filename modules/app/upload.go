package app

import (
	"net/http"

	"github.com/daodao97/xgo/xrequest"
	"github.com/gin-gonic/gin"
)

func GenUploadToken(c *gin.Context) {
	resp, err := xrequest.New().
		SetHeader("X-API-Key", "hello_uploadr2_ok").
		Post("https://file.wanx.space/get-upload-token")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if resp.Error() != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": resp.Error().Error(),
		})
		return
	}

	body := resp.Json()

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"token":   body.Get("token").String(),
	})
}
