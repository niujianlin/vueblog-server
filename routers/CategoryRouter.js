const express = require('express');
// 创建博客展示页面路由,返回的是路由对象
const router = express.Router();
//调用分类集合构造函数
const { Category } = require("../db/category");

//二级路由：匹配/login（先匹配/category，后匹配/list）

router.get("/list", async (req, res) => {
    console.log('进入list')
    let categorys = await Category.find({});
    console.log(categorys)
    if (categorys) {
        res.send({
            code: 200,
            msg: "查询成功",
            categorys //categorys:categorys
        })
    } else {
        res.send({
            code: 500,
            msg: "查询失败"
        })
    }
})

router.post("/add", async (req, res) => {
    let category = await Category.create(req.body);
    if (category) {
        res.send({
            code: 200,
            msg: "添加成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "添加失败"
        })
    }
})

// 删除接口 /category/_token/delete?id=xxx
router.delete("/_token/delete", async (req, res) => {
    let id = req.query.id;
    console.log("id", id);
    let category = await Category.findOneAndDelete({ _id: id })
    if (category) {
        res.send({
            code: 200,
            msg: "删除成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "删除失败"
        })
    }
})

// 修改接口
router.put("/_token/update", async (req, res) => {
    let { id, name } = req.body
    let category = await Category.updateOne({ _id: id }, {
        name: name
    })
    if (category) {
        res.send({
            code: 200,
            msg: "修改成功"
        })
    } else {
        res.send({
            code: 500,
            msg: "修改失败"
        })
    }
})

module.exports = router;