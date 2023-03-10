const mongoose = require('mongoose')

// ๆ้ๆจกๅ
const schema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    title: {
        type: String
    },
    parentId: {
        type: mongoose.SchemaTypes.ObjectId, ref: 'authModel' || null
    },
})

const authModel = mongoose.model('authModel', schema)

module.exports = {
    authModel
}