const { http } = require('../../utils/request')

const get_msg = (params) => {
    return http({
        url: `https://api.openai.com/v1/chat/completions`,
        Headers: {
            Authorization: 'Bearer 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'
        },
        params,
    });
}

module.exports = {
    get_msg
} 