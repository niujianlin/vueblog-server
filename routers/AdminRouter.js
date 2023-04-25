const express = require('express');
//调用用户集合构造函数
const { User } = require('../db/user');
// 创建博客展示页面路由,返回的是路由对象
const router = express.Router();
// //引入加密模块
// const bcryptjs = require('bcryptjs')

//二级路由：匹配/login（先匹配/admin，后匹配/login）
// 渲染登录页面
router.post('/login', async (req, res) => {
    // const { account, password } = req.query;
    const { account, password } = req.body;
    console.log(account, password)
    console.log(req.body)

    // let { err, rows } = await db.async.all("select * from `admin` where `account` = ? AND `password` = ?", [account, password])

    // if (account.trim().length == 0 || password.trim().length == 0) {
    //     res.send({
    //         code: 400,
    //         msg: "登录失败"
    //     })
    // }
    // {"username" : "joe", "age" : 27}
    let user = await User.findOne({ account: account, password: password })
    // console.log(user)
    if (user) {
        res.send({
            code: 200,
            msg: "登录成功",
            data: user
        })
    } else {
        res.send({
            code: 500,
            msg: "登录失败"
        })
    }

    // if (err == null && rows.length > 0) {

    //     let login_token = uuidv4();
    //     let update_token_sql = "UPDATE `admin` SET `token` = ? where `id` = ?"

    //     await db.async.run(update_token_sql,[login_token,rows[0].id])

    //     let admin_info = rows[0]
    //     admin_info.token = login_token
    //     admin_info.password = ""

    //     res.send({
    //         code: 200,
    //         msg: "登录成功",
    //         data:admin_info
    //     })
    // } else {
    //     res.send({
    //         code: 500,
    //         msg: "登录失败"
    //     })
    // }

});


// 将路由对象作为模块成员进行导出
module.exports = router;