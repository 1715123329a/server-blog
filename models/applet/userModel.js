const mongoose = require('mongoose')

// 小程序用户模型
const schema = new mongoose.Schema({
    openid: {
        type: String
    },
    nick_name: {
        type: String
    },
    gender: {
        type: Number
    },
    city: {
        type: String
    },
    avatar_url: {
        type: String
    },
    create_time: {
        type: Number
    }
})

const WxUserModel = mongoose.model('WxUserModel', schema)

module.exports = {
    WxUserModel
}