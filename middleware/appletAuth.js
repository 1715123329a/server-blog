const { WxUserModel } = require('../models/applet/userModel')
const createError = require('http-errors');
const { analysisToken } = require('../utils/token')


module.exports = () => {
    return async (req, res, next) => {
        const token = String(req.headers.authorization).split(' ').pop()
        if (!token) return next(createError(401, 'token不存在！'))
        const tokenData = analysisToken(token)
        if (!tokenData) return next(createError(401, '无效token'))
        const item = await WxUserModel.findOne({ openid: tokenData.openid })
        if (!item) return next(createError(401, '无效token，用户不存在！'))
        req.userInfo = item
        await next()
    }
}