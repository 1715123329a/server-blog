const mongoose = require('mongoose')

// 小程序用户模型
const schema = new mongoose.Schema({
    title: {
        type: String
    }
})

const WxTagsModel = mongoose.model('WxTagsModel', schema)

module.exports = {
    WxTagsModel
}