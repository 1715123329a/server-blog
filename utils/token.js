const jwt = require('jsonwebtoken')
const { secretKey, expiresIn } = require('../config')
function generateToken({ ...data }, scope) {
    const token = jwt.sign(
        {
            ...data
        },
        secretKey,
        { expiresIn }
    )
    return token
}

function analysisToken(token) {
    if (token) {
        const tokenData = jwt.verify(token, secretKey, function (err, data) {
            //正确就是null
            if (err === null) {
                // console.log('tokendata：', data);
                return data
            }
            else {
                return false
            }
        })
        return tokenData
    } else {
        return false
    }
}

module.exports = { generateToken, analysisToken }