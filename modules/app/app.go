package app

import (
	"net/http"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	"github.com/highercomve/go-react-ssr/modules/app/login"
	"github.com/highercomve/go-react-ssr/modules/conf"
	"github.com/highercomve/go-react-ssr/modules/lib/i18n"
	"github.com/highercomve/go-react-ssr/modules/model"
)

func LoadApp(r *gin.Engine) *gin.RouterGroup {
	app := r.Group("")
	app.Use(gzip.Gzip(gzip.DefaultCompression))
	app.Use(i18n.I18nMiddleware())

	registerMultiLangRoutes(app, func(group *gin.RouterGroup) {
		group.GET("", IndexPage)
		group.GET("/about", AboutPage)
		group.GET("/terms", Terms)
		group.GET("/privacy", Privacy)
	})

	app.POST("/login/google", login.GoogleCallbackHandler)
	app.POST("/login/github", login.GithubCallbackHandler)
	app.GET("/logout", login.LogoutHandler)

	if conf.Get().GoogleAdsTxt != "" {
		app.GET("/ads.txt", func(c *gin.Context) {
			c.String(http.StatusOK, conf.Get().GoogleAdsTxt)
		})
	}

	return app
}

func registerMultiLangRoutes(app *gin.RouterGroup, registerRoutes func(group *gin.RouterGroup)) {
	groups := append([]string{""}, i18n.SupportedLanguages...)

	for _, lang := range groups {
		group := app.Group("/" + lang)
		registerRoutes(group)
	}
}

// AboutPage 关于页面
func AboutPage(c *gin.Context) {
	data := map[string]interface{}{}

	c.HTML(http.StatusOK, "index.html:About.js", data)
}

// IndexPage 首页
func IndexPage(c *gin.Context) {
	data := map[string]interface{}{
		"message":      i18n.Get(c, "messages.welcome", "Welcome from the server1"),
		"initialCount": 100,
	}

	head := &model.Head{
		Title: "Go React SSR",
		Meta: []model.Meta{
			{
				Name:    "description",
				Content: "Go React SSR",
			},
			{
				Name:    "keywords",
				Content: "Go React SSR",
			},
			{
				Name:    "author",
				Content: "Go React SSR",
			},
		},
		Link: []model.Link{
			{
				Rel:  "canonical",
				Href: "https://www.google.com",
			},
		},
	}

	// head
	c.Set("head", head)
	c.HTML(http.StatusOK, "index.html:Home.js", data)
}
