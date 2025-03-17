package server

import (
	"net/http"
	"time"

	"github.com/daodao97/xgo/xapp"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/highercomve/go-react-ssr/modules/app"
	"github.com/highercomve/go-react-ssr/modules/conf"
	"github.com/highercomve/go-react-ssr/modules/dao"
	"github.com/highercomve/go-react-ssr/modules/lib/i18n"
	"github.com/kataras/sitemap"
)

func Start(commit string, tag string) {
	app := xapp.NewApp().
		AddStartup(i18n.InitI18n, conf.Init, dao.Init).
		AddStartup(func() error {
			conf.SetGitInfo(commit, tag)
			return nil
		}).
		AddServer(xapp.NewHttp(xapp.Args.Bind, h))

	if err := app.Run(); err != nil {
		panic(err)
	}
}

func h() http.Handler {
	r := xapp.NewGin()

	// 静态文件服务
	r.Static("/assets", "build")
	r.Static("/static", "static")
	// 设置模板渲染器
	r.HTMLRender = CreateTemplateRenderer()

	r.Use(SetRendererContextMiddleware(r.HTMLRender.(*TemplateRenderer)))

	// CORS 配置
	corsConfig := cors.Config{
		AllowAllOrigins: true,
		AllowHeaders: []string{
			"Accept",
			"Content-Type",
			"Content-Length",
			"X-Custom-Header",
			"Origin",
			"Authorization",
			"X-Trace-ID",
			"Trace-Id",
			"x-request-id",
			"X-Request-ID",
			"TraceID",
			"ParentID",
			"Uber-Trace-ID",
			"uber-trace-id",
			"traceparent",
			"tracestate",
		},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodHead,
			http.MethodPut,
			http.MethodPatch,
			http.MethodPost,
			http.MethodDelete,
			http.MethodOptions,
		},
	}
	r.Use(cors.New(corsConfig))

	// 安全中间件
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("X-XSS-Protection", "1; mode=block")
		c.Writer.Header().Set("X-Content-Type-Options", "nosniff")
		c.Writer.Header().Set("X-Frame-Options", "DENY")
		c.Writer.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		c.Next()
	})

	// 加载应用路由
	app.LoadApp(r)

	r.GET("/robots.txt", func(c *gin.Context) {
		c.String(http.StatusOK, "User-agent: *\nAllow: /\nDisallow: /assets\nDisallow: /static\n")
	})
	r.GET("/sitemap.xml", func(c *gin.Context) {
		sm := sitemap.New("https://go-react-ssr.com")
		sm.URL(sitemap.URL{
			Loc:        "/",
			LastMod:    time.Now(),
			ChangeFreq: sitemap.Daily,
		})
		c.XML(http.StatusOK, sm.Build()[0])
	})

	return r
}

func SetRendererContextMiddleware(renderer *TemplateRenderer) gin.HandlerFunc {
	return func(c *gin.Context) {
		renderer.SetGinContext(c)
		c.Next()
	}
}
