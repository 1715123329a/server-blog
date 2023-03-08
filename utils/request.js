const axios = require('axios')

let http = axios.create({
    baseURL: '',
    timeout: 100000,
});

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

//响应拦截器
http.interceptors.response.use(
    (res) => {
        return res
    },
    (err) => {
        return Promise.reject(err);
    }
);
module.exports = {
    http
}
