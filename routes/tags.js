var express = require('express');
var router = express.Router();
const { WxTagsModel } = require('../models/applet/tagsModel')

/**
 * 文章标签操作接口
 */

// 获取列表
router.get('/list', async (req, res) => {
    const items = await WxTagsModel.find()
    res.send({
        code: 200,
        data: items
    })
});


// 删除
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await WxTagsModel.findByIdAndDelete(id)
    res.send({
        code: 200,
        msg: '删除成功！'
    })
});


// 添加
router.post('/add', async (req, res) => {
    const model = await WxTagsModel.create({
        ...req.body
    })
    res.send({
        code: 200,
        msg: '添加成功！',
        data: model
    })
});




module.exports = router;
