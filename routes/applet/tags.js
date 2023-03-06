var express = require('express');
var router = express.Router();
const { WxTagsModel } = require('../../models/applet/tagsModel')

/**
 * 小程序文章标签操作接口
 */

// 获取列表
router.get('/list', async (req, res) => {
    const items = await WxTagsModel.find()
    res.send({
        code: 200,
        data: items
    })
});

module.exports = router;
