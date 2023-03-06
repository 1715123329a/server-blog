
// 登陆鉴权中间键
const auth = require('../middleware/auth')
const appletAuth = require('../middleware/appletAuth')

/**
 * 后台管理相关接口
 */
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/adminUser');
let loginRouter = require('../routes/login');
let authRouter = require('../routes/auth');
let roleRouter = require('../routes/role');
let tagsRouter = require('../routes/tags');
let articleRouter = require('../routes/article');
let appletUserRouter = require('../routes/appletUser');
let appletArticleRouter = require('../routes/appletArticle');




/**
 * 微信小程序相关接口
 */
let wx_loginRouter = require('../routes/applet/login');
let wx_userRouter = require('../routes/applet/user');
let wx_articleRouter = require('../routes/applet/article');
let wx_tagRouter = require('../routes/applet/tags');




module.exports = (app) => {
    /**
     * 后台管理相关接口
     */
    app.use('/', indexRouter);
    app.use('/api/admin/user', auth(), usersRouter);
    app.use('/api/admin/auth', auth(), authRouter);
    app.use('/api/admin/role', auth(), roleRouter);
    app.use('/api/admin/tag', auth(), tagsRouter);
    app.use('/api/admin/article', auth(), articleRouter);
    app.use('/api/admin/appletUser', auth(), appletUserRouter)
    app.use('/api/admin/appletArticle', auth(), appletArticleRouter)
    app.use('/api/login', loginRouter)


    /**
     * 微信小程序相关接口
     */
    app.use('/api/applet/login', wx_loginRouter)
    app.use('/api/applet/user', appletAuth(), wx_userRouter)
    app.use('/api/applet/article', wx_articleRouter)
    app.use('/api/applet/tag', wx_tagRouter)



}