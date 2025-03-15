package login

import (
	"fmt"
	"time"

	"crypto/rsa"
	"encoding/base64"
	"math/big"

	"github.com/highercomve/go-react-ssr/modules/conf"
	"github.com/highercomve/go-react-ssr/modules/dao"

	"github.com/daodao97/xgo/xdb"
	"github.com/daodao97/xgo/xjwt"
	"github.com/daodao97/xgo/xlog"
	"github.com/daodao97/xgo/xrequest"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// Google OAuth2 配置
const (
	GoogleCertsURL = "https://www.googleapis.com/oauth2/v3/certs"
)

// GoogleClaims 定义 JWT claims 结构
type GoogleClaims struct {
	jwt.RegisteredClaims
	Email         string `json:"email"`
	EmailVerified bool   `json:"email_verified"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
}

func GoogleCallbackHandler(c *gin.Context) {
	config := conf.Get()
	var authProvider *conf.AuthProvider
	for _, provider := range config.Website.AuthProvider {
		if provider.Provider == "google" {
			authProvider = &provider
			break
		}
	}

	if authProvider == nil {
		c.JSON(401, gin.H{"error": "Google auth provider not found"})
		return
	}

	// 定义请求体结构
	type GoogleCallback struct {
		ClientID   string `json:"clientId"`
		Credential string `json:"credential"`
		SelectBy   string `json:"select_by"`
	}

	var callback GoogleCallback
	if err := c.ShouldBindJSON(&callback); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request body"})
		return
	}

	certsResp, err := xrequest.New().Get(GoogleCertsURL)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to get Google certs"})
		return
	}

	// 解析证书
	var certs struct {
		Keys []struct {
			Kid string `json:"kid"`
			N   string `json:"n"`
			E   string `json:"e"`
		} `json:"keys"`
	}
	if err := certsResp.Json().Unmarshal(&certs); err != nil {
		c.JSON(500, gin.H{"error": "Failed to parse Google certs"})
		return
	}

	// 解析未验证的 token
	token, err := jwt.ParseWithClaims(callback.Credential, &GoogleClaims{}, func(token *jwt.Token) (interface{}, error) {
		// 验证算法
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// 获取 token header 中的 kid
		kid, ok := token.Header["kid"].(string)
		if !ok {
			return nil, fmt.Errorf("kid header not found")
		}

		// 查找对应的公钥
		for _, cert := range certs.Keys {
			if cert.Kid == kid {
				// 解码 modulus
				nBytes, err := base64.RawURLEncoding.DecodeString(cert.N)
				if err != nil {
					return nil, fmt.Errorf("failed to decode modulus: %v", err)
				}
				n := new(big.Int).SetBytes(nBytes)

				// 解码 exponent
				eBytes, err := base64.RawURLEncoding.DecodeString(cert.E)
				if err != nil {
					return nil, fmt.Errorf("failed to decode exponent: %v", err)
				}
				e := new(big.Int).SetBytes(eBytes)

				// 构造 RSA 公钥
				return &rsa.PublicKey{
					N: n,
					E: int(e.Int64()),
				}, nil
			}
		}
		return nil, fmt.Errorf("key not found")
	})

	xlog.Info("token", xlog.Any("token", token), xlog.Any("err", err))

	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid token"})
		return
	}

	if claims, ok := token.Claims.(*GoogleClaims); ok && token.Valid {
		// 验证 iss
		if claims.Issuer != "https://accounts.google.com" {
			c.JSON(401, gin.H{"error": "Invalid issuer"})
			return
		}

		// 验证 aud
		if claims.Audience[0] != authProvider.ClientID {
			c.JSON(401, gin.H{"error": "Invalid audience"})
			return
		}

		// 验证过期时间
		if claims.ExpiresAt.Time.Before(time.Now()) {
			c.JSON(401, gin.H{"error": "Token expired"})
			return
		}

		userId, err := dao.CreateUserOrIgnore(xdb.Record{
			"email":      claims.Email,
			"user_name":  claims.Name,
			"avatar_url": claims.Picture,
			"channel":    "google",
		})

		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to create user"})
			return
		}

		payload := map[string]any{
			"email":      claims.Email,
			"user_name":  claims.Name,
			"avatar_url": claims.Picture,
			"user_id":    userId,
		}

		token, err := xjwt.GenHMacToken(payload, config.JwtSecret)

		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to create token"})
			return
		}

		// 验证成功，返回用户信息
		c.SetCookie("session_token", token, 3600*24*30, "/", "", false, true)
		c.JSON(200, payload)
		return
	}

	c.JSON(401, gin.H{"error": "Invalid token"})
}
