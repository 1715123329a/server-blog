var express = require('express');
var router = express.Router();
const { adminUserModel } = require('../models/adminUserModel')
const { createRouter } = require('../utils/index')
const { roleModel } = require('../models/roleModel')

// 获取用户列表
router.get('/', async (req, res) => {
    const items = await adminUserModel.find().populate('role')
    res.send({
        code: 200,
        data: items
    })
});

// 添加用户
router.post('/add', async (req, res) => {
    const model = await adminUserModel.create({
        ...req.body,
        create_time: new Date().valueOf()
    })
    res.send({
        code: 200,
        msg: '添加成功！',
        data: model
    })
});

// 获取用户信息 req.userInfo是auth中间键里鉴权后添加的用户信息
router.get('/info', async (req, res) => {
    let userInfo = req.userInfo
    let { _id } = userInfo.role
    let roles = await roleModel.findOne({
        _id
    }).populate('roles')
    let route = createRouter(roles.roles)
    let user = {
        _id: userInfo._id,
        username: userInfo.username,
        create_time: userInfo.create_time,
        role: userInfo.role,
        auths: route,
    }
    res.send({
        code: 200,
        data: user
    })
});

// 删除用户
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await adminUserModel.findByIdAndDelete(id)
    res.send({
        code: 200,
        msg: '删除成功！'
    })
});

module.exports = router;
