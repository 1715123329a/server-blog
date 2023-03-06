var express = require('express');
var router = express.Router();
const { WxUserModel } = require('../models/applet/userModel')

// 获取用户列表
router.get('/', async (req, res) => {
    const items = await WxUserModel.find()
    res.send({
        code: 200,
        data: items
    })
});



module.exports = router;
