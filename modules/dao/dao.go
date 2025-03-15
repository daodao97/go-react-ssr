package dao

import (
	"github.com/highercomve/go-react-ssr/modules/conf"

	"github.com/daodao97/xgo/xdb"
	_ "github.com/go-sql-driver/mysql"
)

var UserModel xdb.Model
var UserBalanceModel xdb.Model

func Init() error {
	err := xdb.Inits(conf.Get().Database)
	if err != nil {
		return err
	}

	UserModel = xdb.New("project_user")
	return nil
}
