const mongoose = require('mongoose')

// 管理员账户模型
const schema = new mongoose.Schema({
    username: {
        type: String
    },
    userpwd: {
        type: String
    },
    name: {
        type: String
    },
    userpic: {
        type: String
    },
    create_time: {
        type: Number
    },
    role: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'roleModel'
    }
})

const adminUserModel = mongoose.model('adminUserModel', schema)

module.exports = {
    adminUserModel
}