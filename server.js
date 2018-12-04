//@ts-ignore
var express = require('express');
//@ts-ignore
var mongoose = require('mongoose');
var app = express();
var db = require('./config/key').mongoURI;
mongoose.connect(db)
    .then(function () { return console.log('success'); })["catch"](function (err) { return console.log(err); });
app.get('/', function (req, res) {
    res.send('Hello World!');
});
//@ts-ignore
var prot = process.env.PORT || 5000;
app.listen(prot, function () {
    console.log("Server runing on port " + prot);
});
