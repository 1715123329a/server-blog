var express = require('express');
var router = express.Router();
const { WxArticleModel } = require('../models/applet/articleModel')
const { WxUserModel } = require('../models/applet/userModel')
const { WxTagsModel } = require('../models/applet/tagsModel');
const { query } = require('express');

// 获取小程序文章标签列表
router.get('/tags', async (req, res) => {
    const items = await WxTagsModel.find()
    res.send({
        code: 200,
        data: items
    })
});

// 获取列表
router.get('/', async (req, res) => {
    const { tag, name, page, size } = req.query
    const query = {}

    if (tag) {
        const tagId = await WxTagsModel.findById(tag)
        query.tag = tagId
    }
    if (name) {
        const regex = new RegExp(name);
        const userId = await WxUserModel.find({ nick_name: { $regex: regex } })
        query.user = userId
    }

    const items = await WxArticleModel.find(query).sort([['_id', -1]]).skip((page - 1) * size).limit(size).populate('user').populate('tag')
    res.send({
        code: 200,
        data: items
    })
});

// 获取列表总数
router.get('/count', async (req, res) => {
    const { tag, name } = req.query
    const query = {}
    if (tag) {
        const tagId = await WxTagsModel.findById(tag)
        query.tag = tagId
    }
    if (name) {
        const regex = new RegExp(name);
        const userId = await WxUserModel.find({ nick_name: { $regex: regex } })
        query.user = userId
    }
    const count = await WxArticleModel.find(query).count()
    res.send({
        code: 200,
        data: count
    })
});


// 删除
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await adminUserModel.findByIdAndDelete(id)
    res.send({
        code: 200,
        msg: '删除成功！'
    })
});

module.exports = router;
