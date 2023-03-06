const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const { generateToken } = require('../../utils/token')
const { wx_appid, wx_secret } = require('../../config')
const { wx_login } = require('../../api/applet/login')
const { WxUserModel } = require('../../models/applet/userModel')


router.post('/', async (req, res, next) => {
    const { code } = req.body
    const params = {
        appid: wx_appid,
        secret: wx_secret,
        js_code: code,
        grant_type: 'authorization_code',
    }
    wx_login(params).then(async loginRes => {
        const { session_key, openid } = loginRes.data
        const token = generateToken({
            session_key,
            openid
        })
        let user = await WxUserModel.findOne({
            openid
        })
        if (!user) {
            await WxUserModel.create({
                openid,
                nick_name: '匿名用户' + parseInt(Math.random() * 100000),
                gender: 2,
                city: '',
                avatar_url: 'https://picx.zhimg.com/80/v2-5f12399c3654cf582d50d2695edab8a2_720w.webp?source=1940ef5c',
                create_time: new Date().valueOf()
            })
        }
        res.send({
            code: 200,
            msg: '登陆成功',
            data: token
        })
    }).catch(err => {
        next(createError(400, '登陆错误'))
    })
});


module.exports = router;
