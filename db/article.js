//引入mongoose
const mongoose = require('mongoose')

//创建集合规则
const articleSchema = new mongoose.Schema({
    categoryid: {
        type: String,
    },
    title: {
        type: String,
        maxLength: 200,
        minLength: 1,
        // required: [true, '错误信息：请填写文章标题']
    },
    content: {
        type: String
    },
    createtime: {
        type: Date,
        default: Date.now()
    },


})

// 创建文章集合
const Article = mongoose.model('Article', articleSchema);

async function createArticle() {
    // 创建一些数据，第一次导入初始化数据用的
    const article = await Article.create({
        categoryid: '63d1f8db6d2c85c307c91f9f',
        title: "test1",
        content: "gfvmdsvmslmvfdsklv",

    })
}
// createArticle();

// 导出模块
module.exports = {
    Article
}