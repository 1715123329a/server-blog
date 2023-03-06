const mongoose = require('mongoose')

// 角色模型
const schema = new mongoose.Schema({
    name: {
        type: String
    },
    roles: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'authModel' }],
})

const roleModel = mongoose.model('roleModel', schema)

module.exports = {
    roleModel
}