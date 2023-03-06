var express = require('express');
var router = express.Router();
const { WxUserModel } = require('../../models/applet/userModel')

// WxUserModel.remove({}, function (err) { // 筛选条件为空即是表示所有
//     console.log("success");
// });
/**
 * 小程序用户操作接口
 */

// 获取用户列表
router.get('/list', async (req, res) => {
    const items = await WxUserModel.find()
    res.send({
        code: 200,
        data: items
    })
});

// 获取用户详情
router.get('/detail', async (req, res) => {
    const { id } = req.query
    const items = await WxUserModel.findById(id)
    res.send({
        code: 200,
        data: items
    })
});

// 获取用户信息 req.userInfo是auth中间键里鉴权后添加的用户信息
router.get('/', async (req, res) => {
    let userInfo = req.userInfo
    res.send({
        code: 200,
        data: userInfo
    })
});


// 删除用户
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await WxUserModel.findByIdAndDelete(id)
    res.send({
        code: 200,
        msg: '删除成功！'
    })
});






module.exports = router;
