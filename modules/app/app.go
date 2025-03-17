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
	app.POST("/upload/token", GenUploadToken)

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
		"message":      i18n.GetWithDefault(c, "messages.welcome", "Welcome from the server1"),
		"initialCount": 100,
	}

	head := &model.Head{
		Title: "Go React SSR - 高性能的服务端渲染React框架 | 快速开发Web应用",
		Meta: []model.Meta{
			{
				Name:    "description",
				Content: i18n.Get(c, "home.head.description"),
			},
			{
				Name:    "keywords",
				Content: i18n.Get(c, "home.head.keywords"),
			},
			{
				Name:    "author",
				Content: i18n.Get(c, "home.head.author"),
			},
			// Open Graph 标签 (Facebook, LinkedIn等)
			{
				Property: "og:title",
				Content:  i18n.Get(c, "home.head.og.title"),
			},
			{
				Property: "og:description",
				Content:  i18n.Get(c, "home.head.og.description"),
			},
			{
				Property: "og:type",
				Content:  "website",
			},
			{
				Property: "og:url",
				Content:  i18n.Get(c, "home.head.og.url"),
			},
			{
				Property: "og:image",
				Content:  i18n.Get(c, "home.head.og.image"),
			},
			// Twitter 卡片标签
			{
				Name:    "twitter:card",
				Content: i18n.Get(c, "home.head.twitter.card"),
			},
			{
				Name:    "twitter:site",
				Content: i18n.Get(c, "home.head.twitter.site"),
			},
			{
				Name:    "twitter:title",
				Content: i18n.Get(c, "home.head.twitter.title"),
			},
			{
				Name:    "twitter:description",
				Content: i18n.Get(c, "home.head.twitter.description"),
			},
			{
				Name:    "twitter:image",
				Content: i18n.Get(c, "home.head.twitter.image"),
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
