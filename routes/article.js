var express = require('express');
var router = express.Router();
const { WxArticleModel } = require('../models/applet/articleModel')

/**
 * 文章操作接口
 */

// 获取列表
router.get('/list', async (req, res) => {
    const items = await WxArticleModel.find().populate('user').populate('tag')
    res.send({
        code: 200,
        data: items
    })
});

// 获取信息
router.get('/:id', async (req, res) => {
    let userInfo = req.userInfo
    res.send({
        code: 200,
        data: userInfo
    })
});

// 删除
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await WxUserModel.findByIdAndDelete(id)
    res.send({
        code: 200,
        msg: '删除成功！'
    })
});


// 添加
router.post('/add', async (req, res) => {
    const model = await WxArticleModel.create({
        ...req.body,
        create_time: new Date().valueOf()
    })
    res.send({
        code: 200,
        msg: '添加成功！',
        data: model
    })
});




module.exports = router;
