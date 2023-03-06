var express = require('express');
var router = express.Router();
const { WxArticleModel } = require('../../models/applet/articleModel')
const { WxCommentModel } = require('../../models/applet/commentModel')

const appletAuth = require('../../middleware/appletAuth')

// WxArticleModel.remove({}, function (err) { // 筛选条件为空即是表示所有
//     console.log("success");
// });

/**
 * 小程序文章操作接口
 */

// 获取文章列表
router.get('/list', async (req, res) => {
    const { page, pageSize } = req.query
    const items = await WxArticleModel.find().populate('comments').populate('user').populate('tag').sort([['_id', -1]]).skip((page - 1) * pageSize).limit(pageSize)
    res.send({
        code: 200,
        data: items
    })
});

// 添加评论
router.post('/comment/add', appletAuth(), async (req, res) => {
    const model = await WxCommentModel.create({
        user: req.userInfo._id,
        ...req.body,
        create_time: new Date().valueOf()
    })
    res.send({
        code: 200,
        msg: '发表成功！',
        data: model
    })
});

// 获取评论列表
router.get('/comment', async (req, res) => {
    const { id } = req.query
    const items = await WxCommentModel.find({ article_id: id }).populate('user').sort([['_id', -1]])
    res.send({
        code: 200,
        data: items
    })
});

// 获取列表总数
router.get('/list/count', async (req, res) => {
    const count = await WxArticleModel.count()
    res.send({
        code: 200,
        data: count
    })
});

// 获取文章信息
router.get('/', async (req, res) => {
    const { id } = req.query
    const items = await WxArticleModel.findById(id).populate('user').populate('tag')
    res.send({
        code: 200,
        data: items
    })
});

// 获取我的文章
router.get('/myArticle', appletAuth(), async (req, res) => {
    let userInfo = req.userInfo
    const { page, pageSize } = req.query
    const items = await WxArticleModel.find({ user: userInfo._id }).populate('comments').populate('user').populate('tag').sort([['_id', -1]]).skip((page - 1) * pageSize).limit(pageSize)
    res.send({
        code: 200,
        data: items
    })
});

// 获取我的文章总数
router.get('/myArticle/count', appletAuth(), async (req, res) => {
    let userInfo = req.userInfo
    const items = await WxArticleModel.count({ user: userInfo._id })
    res.send({
        code: 200,
        data: items
    })
});

// 删除
router.delete('/', appletAuth(), async (req, res) => {
    const { id } = req.query
    const article = await WxArticleModel.findById(id).populate('user')
    if (String(req.userInfo._id) === String(article.user._id)) {
        await WxArticleModel.findByIdAndDelete(id)
        res.send({
            code: 200,
            msg: '删除成功！'
        })
    } else {
        res.send({
            code: 401,
            msg: '删除失败'
        })
    }
});


// 添加
router.post('/add', appletAuth(), async (req, res) => {
    const model = await WxArticleModel.create({
        user: req.userInfo._id,
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
