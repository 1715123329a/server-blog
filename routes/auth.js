var express = require('express');
var router = express.Router();
const { authModel } = require('../models/authModel')
const { createTouter } = require('../utils/index')


router.get('/', async (req, res) => {
    const items = await authModel.find().populate('parentId')
    res.send({
        code: 200,
        data: items
    })
});

router.get('/list', async (req, res) => {
    const items = await authModel.find()
    const data = createTouter(items)
    res.send({
        code: 200,
        data: data
    })
});

router.post('/add', async (req, res) => {
    const model = await authModel.create(req.body)
    res.send({
        code: 200,
        msg: '添加成功！',
        data: model
    })
});

router.put('/', async (req, res) => {
    const model = await authModel.findByIdAndUpdate(req.body._id, req.body)
    res.send({
        code: 200,
        msg: '修改成功！',
        data: model
    })
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await authModel.findByIdAndDelete(id)
    res.send({
        code: 200,
        msg: '删除成功！'
    })
});

module.exports = router;
