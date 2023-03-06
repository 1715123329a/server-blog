const mongoose = require('mongoose')

// 小程序文章评论模型
const schema = new mongoose.Schema({
    article_id: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'WxArticleModel'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'WxUserModel'
    },
    content: {
        type: String
    },
    create_time: {
        type: Number
    }
})

const WxCommentModel = mongoose.model('WxCommentModel', schema)

module.exports = {
    WxCommentModel
}