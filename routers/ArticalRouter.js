const express = require("express")
const router = express.Router()
const db = require("../db/DbUtils")
const { Article } = require('../db/article')
const pagination = require('mongoose-sex-page')

// 查看博客 /blog/detail?id=xxx
router.get("/detail", async (req, res) => {
    let id = req.query.id
    let article = await Article.findById({ _id: id })
    if (article) {
        res.send({
            code: 200,
            msg: "查看成功",
            article
        })
    } else {
        res.send({
            code: 500,
            msg: "查看失败"
        })
    }
})

// 添加博客
router.post("/_token/add", async (req, res) => {
    let { title, categoryid, content } = req.body;
    let article = await Article.create({
        title: title,
        categoryid: categoryid,
        content: content
    })
    if (article) {
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

// 修改博客
router.put("/_token/update", async (req, res) => {
    let { _id, title, categoryid, content } = req.body;
    let artical = await Article.updateOne({ _id: _id }, {
        title,
        categoryid,
        content
    })

    if (artical) {
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

// 删除博客 /blog/delete?id=xxx
router.delete("/_token/delete", async (req, res) => {
    let id = req.query.id;
    let artical = await Article.deleteOne({ _id: id })
    if (artical) {
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

// 查找博客
router.get("/search", async (req, res) => {
    let { keyword, categoryid, page, pageSize } = req.query;
    // console.log("req:", req);
    // 若没传，则赋默认值
    page = page == null ? 1 : page;
    pageSize = pageSize == null ? 10 : pageSize
    categoryid = categoryid == null ? 0 : categoryid
    keyword = keyword == null ? "" : keyword

    // 正则表达  /.(keyword)/gi
    // let re = new RegExp("^\.(" + keyword + ")$", "g")
    let re = new RegExp("\.(" + keyword + ")", "g")
    console.log(re);
    // db.users.find({"$or" : [{"ticket_no" : 725}, {"winner" : true}]}) 
    // db.users.find({"username" : "joe", "age" : 27}) 
    // let articals = await pagination(Article).find({ "$or": [{ title: re }, { categoryid: categoryid }] }).page(page).size(pageSize).display(3).exec();
    let articals;
    if (keyword !== "") {
        console.log("有keyword")
        articals = await pagination(Article).find({ title: re }).page(page).size(pageSize).display(3).exec();
    } else if (categoryid != 0) {
        console.log("没有keyword，有分类")
        articals = await pagination(Article).find({ categoryid: categoryid }).page(page).size(pageSize).display(3).exec();
    } else {
        console.log("没有keyword，没有分类")
        articals = await pagination(Article).find({ title: re }).page(page).size(pageSize).display(3).exec();

    }


    let articals1 = JSON.stringify(articals)
    let articals2 = JSON.parse(articals1)

    console.log("articals2", articals2)

    if (articals2) {
        res.send({
            code: 200,
            msg: "查询成功",
            data: {
                keyword,
                categoryid,
                page,
                pageSize,
                articals2,
                count: articals2.records.length
            }
        })
    } else {
        res.send({
            code: 500,
            msg: "查询失败",
        })
    }

})

module.exports = router