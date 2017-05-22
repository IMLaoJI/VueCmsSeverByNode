// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user( username, password) values ( ?, ?)',
        check: 'SELECT id , username , password  from admin WHERE username=? AND password=?'
    },
    admin: {
        check: 'SELECT id , username , password  from admin WHERE username=? AND password=?'

    }

}
module.exports = sqlMap;