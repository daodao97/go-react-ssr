package conf

import (
	"github.com/daodao97/xgo/xapp"
	"github.com/daodao97/xgo/xdb"
	"github.com/highercomve/go-react-ssr/modules/lib/i18n"
)

type Conf struct {
	AppID           string       `json:"app_id" yaml:"app_id"`
	Database        []xdb.Config `json:"database" yaml:"database"`
	GoogleAdsTxt    string       `yaml:"google_ads_txt"`
	GoogleAdsJS     string       `yaml:"google_ads_js"`
	GoogleAnalytics string       `yaml:"google_analytics"`
	Website         Website      `json:"website" yaml:"website"`
	JwtSecret       string       `json:"jwt_secret" yaml:"jwt_secret"`
}

var ConfInstance *Conf

func Init() error {
	ConfInstance = &Conf{}
	ConfInstance.Website = Website{
		Lang:        i18n.DefaultLanguage,
		SupportLang: i18n.SupportedLanguages,
		LangMap:     i18n.LangMap,
		Header: Header{
			// Logo:  "/static/logo.svg",
			Title: "root.title",
			Nav: []Link{
				{Text: "root.nav.about", URL: "/about"},
			},
		},
		Footer: Footer{
			Logo:  "/static/logo.svg",
			Title: "root.footer.title",
			Desc:  "root.footer.desc",
			Social: []Social{
				{
					Icon:  "twitter",
					Title: "twitter",
					URL:   "https://x.com/daodao_97",
				},
				{
					Icon:  "github",
					Title: "github",
					URL:   "https://github.com/daodao97",
				},
			},
			Links: []LinkGroup{
				{
					Title: "关于",
					Links: []Link{
						{Text: "功能特点", URL: "#features"},
						{Text: "FAQ", URL: "#faq"},
						{Text: "文档", URL: "/docs"},
					},
				},
				{
					Title: "资源",
					Links: []Link{
						{Text: "文档", URL: "/docs"},
						{Text: "支持", URL: "/support"},
					},
				},
				{
					Title: "社区",
					Links: []Link{
						{Text: "论坛", URL: "/forum"},
						{Text: "社交媒体", URL: "/social"},
					},
				},
			},
			Copyright: "root.footer.copyright",
			Policy: []Link{
				{Text: "root.footer.privacy", URL: "/privacy"},
				{Text: "root.footer.terms", URL: "/terms"},
			},
		},
	}

	err := xapp.InitConf(ConfInstance)
	if err != nil {
		return err
	}

	return nil
}

func Get() *Conf {
	return ConfInstance
}
