const mongoose = require('mongoose')

// 小程序用户模型
const schema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'WxUserModel'
    },
    text: {
        type: String
    },
    tag: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'WxTagsModel'
    },
    create_time: {
        type: Number
    }
}, {
    toJSON: { virtuals: true }
})

schema.virtual("comments", {
    ref: "WxCommentModel",
    localField: "_id",
    foreignField: "article_id",
    justOne: false, //取Array值
    count: true,  //取总数
})

const WxArticleModel = mongoose.model('WxArticleModel', schema)

module.exports = {
    WxArticleModel
}