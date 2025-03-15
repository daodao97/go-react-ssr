package conf

type Website struct {
	Lang         string
	SupportLang  []string
	LangMap      map[string]string
	AuthProvider []AuthProvider
	Header       Header
	Footer       Footer
}

type AuthProviderType string

const (
	AuthProviderTypeGoogle AuthProviderType = "google"
	AuthProviderTypeGithub AuthProviderType = "github"
)

type AuthProvider struct {
	Provider     AuthProviderType
	ClientID     string
	ClientSecret string
	RedirectURI  string
}

type Header struct {
	Logo  string `json:"Logo,omitempty" yaml:"Logo,omitempty"`
	Title string `json:"Title,omitempty" yaml:"Title,omitempty"`
	Nav   []Link `json:"Nav,omitempty" yaml:"Nav,omitempty"`
}

type Link struct {
	Text string
	URL  string
}

type LinkGroup struct {
	Title string
	Links []Link
}

type Footer struct {
	Logo      string
	Title     string
	Desc      string
	Social    []Social
	Links     []LinkGroup
	Copyright string
	Policy    []Link
}

type Social struct {
	Icon  string
	URL   string
	Title string
}
