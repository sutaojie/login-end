//@ts-ignore
var express = require('express');
//@ts-ignore
var mongoose = require('mongoose');
//@ts-ignore
var bodyParser = require('body-parser');
var passport = require("passport");
var app = express();
//连接 db
var db = require('./config/key').mongoURI;
//引入 users.js
var users = require('./routes/api/users');
//使用 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//passport 初始化
app.use(passport.initialize());
mongoose.connect(db)
    .then(function () { return console.log('success'); })["catch"](function (err) { return console.log(err); });
require('./passport')(passport);
// app.get('/', (req,res)=>{
//     res.send('Hello World!')
// })
// 使用 routes
app.use('/api/users', users);
//@ts-ignore
var prot = process.env.PORT || 5000;
app.listen(prot, function () {
    console.log("Server runing on port " + prot);
});
