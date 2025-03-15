package login

import (
	"net/http"

	"github.com/highercomve/go-react-ssr/modules/conf"
	"github.com/highercomve/go-react-ssr/modules/dao"

	"github.com/daodao97/xgo/xdb"
	"github.com/daodao97/xgo/xjwt"
	"github.com/daodao97/xgo/xrequest"
	"github.com/gin-gonic/gin"
)

func GithubCallbackHandler(c *gin.Context) {
	config := conf.Get()

	var authProvider *conf.AuthProvider
	for _, provider := range config.Website.AuthProvider {
		if provider.Provider == "github" {
			providerCopy := provider
			authProvider = &providerCopy
			break
		}
	}

	if authProvider == nil {
		c.JSON(http.StatusOK, gin.H{"error": "github auth provider not found"})
		return
	}

	code := c.Query("code")
	// state := c.Query("state")

	// savedState, _ := c.Cookie("oauth_state")

	// if state == "" || state != savedState {
	// 	helper.Render(c, http.StatusOK, xerr.Error("invalid state"))
	// 	return
	// }

	resp, err := xrequest.New().
		SetHeader("Accept", "application/json").
		SetFormData(map[string]string{
			"client_id":     authProvider.ClientID,
			"client_secret": authProvider.ClientSecret,
			"code":          code,
		}).Post("https://github.com/login/oauth/access_token")

	if err != nil {
		c.JSON(http.StatusOK, gin.H{"error": "failed to get access token"})
		return
	}

	if resp.Error() != nil {
		c.JSON(http.StatusOK, gin.H{"error": "failed to get access token"})
		return
	}

	errMsg := resp.Json().Get("error_description").String()
	if errMsg != "" {
		c.JSON(http.StatusOK, gin.H{"error": errMsg})
		return
	}

	accessToken := resp.Json().Get("access_token").String()

	resp, err = xrequest.New().
		SetHeader("Authorization", "Bearer "+accessToken).
		SetHeader("Accept", "application/json").
		Get("https://api.github.com/user")
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"error": "failed to get user info"})
		return
	}

	var userInfo struct {
		ID        int    `json:"id"`
		Login     string `json:"login"`
		Name      string `json:"name"`
		Email     string `json:"email"`
		AvatarURL string `json:"avatar_url"`
	}

	if err := resp.Json().Unmarshal(&userInfo); err != nil {
		c.JSON(http.StatusOK, gin.H{"error": "failed to parse user info"})
		return
	}

	userId, err := dao.CreateUserOrIgnore(xdb.Record{
		"email":      userInfo.Email,
		"user_name":  userInfo.Name,
		"avatar_url": userInfo.AvatarURL,
		"channel":    "github",
	})

	if err != nil {
		c.JSON(http.StatusOK, gin.H{"error": "failed to create user"})
		return
	}

	token, err := xjwt.GenHMacToken(map[string]any{
		"user_id":    userId,
		"email":      userInfo.Email,
		"user_name":  userInfo.Name,
		"avatar_url": userInfo.AvatarURL,
	}, config.JwtSecret)

	if err != nil {
		c.JSON(http.StatusOK, gin.H{"error": "failed to generate token"})
		return
	}

	c.SetCookie("session_token", token, 3600*24*30, "/", "", false, true)

	c.Redirect(http.StatusTemporaryRedirect, "/")
}
