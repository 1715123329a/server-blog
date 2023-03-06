const { http } = require('../../utils/request')

const wx_login = (params) => {
    return http({
        url: `https://api.weixin.qq.com/sns/jscode2session`,
        params,
    });
}
// 小程序登陆
module.exports = {
    wx_login
} 