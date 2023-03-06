var express = require('express');
var router = express.Router();
const { roleModel } = require('../models/roleModel')


router.get('/', async (req, res) => {
    const items = await roleModel.find().populate('roles')
    res.send({
        code: 200,
        data: items
    })
});


router.post('/add', async (req, res) => {
    const model = await roleModel.create(req.body)
    res.send({
        code: 200,
        msg: '添加成功！',
        data: model
    })
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await roleModel.findByIdAndDelete(id)
    res.send({
        code: 200,
        msg: '删除成功！'
    })
});

router.put('/', async (req, res) => {
    const model = await roleModel.findByIdAndUpdate(req.body._id, req.body)
    res.send({
        code: 200,
        msg: '修改成功！',
        data: model
    })
});

module.exports = router;
