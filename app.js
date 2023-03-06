const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth')
const app = express();
const http = require('http');
const server = http.createServer(app);
const mongoose = require('./plugins/mongoose');
const createRoute = require('./router');

mongoose(app)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


createRoute(app)

// error 错误处理
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    msg: err.message
  });
});



server.listen('2022', () => {
  console.log('ok');
});
