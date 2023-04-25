const mongoose = require("mongoose")

// 链接数据库
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://localhost/vueblog`)
    .then(() => console.log('<数据库链接成功>'))
    .catch(() => console.log('数据库链接失败'))