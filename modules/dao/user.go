package dao

import (
	"github.com/gin-gonic/gin"
	"github.com/highercomve/go-react-ssr/modules/conf"

	"github.com/daodao97/xgo/xdb"
	"github.com/daodao97/xgo/xjwt"
)

func GetUser(id string) ([]xdb.Record, error) {
	return UserModel.Selects()
}

func CreateUserOrIgnore(user xdb.Record) (int64, error) {
	existing, _ := UserModel.First(
		xdb.WhereEq("email", user.GetString("email")),
		xdb.WhereEq("appid", conf.Get().AppID),
	)
	if existing != nil {
		return int64(existing.GetInt("id")), nil
	}
	user["appid"] = conf.Get().AppID
	return UserModel.Insert(user)
}

func GetUserInfo(c *gin.Context) (xdb.Record, error) {
	cookie, err := c.Cookie("session_token")
	if err != nil {
		return nil, err
	}

	claims, err := xjwt.VerifyHMacToken(cookie, conf.Get().JwtSecret)
	if err != nil {
		return nil, err
	}

	userInfo := xdb.Record{
		"email":      claims["email"],
		"name":       claims["user_name"],
		"avatar_url": claims["avatar_url"],
		"user_id":    claims["user_id"],
	}

	return userInfo, nil
}
