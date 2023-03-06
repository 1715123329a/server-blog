const express = require('express');
const router = express.Router();
const { generateToken, analysisToken } = require('../utils/token')
const { adminUserModel } = require('../models/adminUserModel')

const createError = require('http-errors');


router.post('/', async (req, res, next) => {
    const { username, userpwd } = req.body
    const user = await adminUserModel.findOne({
        username
    })
    if (user) {
        if (userpwd === user.userpwd) {
            const token = generateToken({
                userId: user._id
            })
            res.send({
                code: 200,
                data: {
                    token
                }
            })
        } else {
            next(createError(401, '密码错误'))
        }
    } else {
        next(createError(402, '用户不存在'))
    }
});


module.exports = router;
