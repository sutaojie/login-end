//@ts-ignore
const express = require('express')
//@ts-ignore
const mongoose = require('mongoose')
//@ts-ignore
const bodyParser = require('body-parser')
const passport = require("passport")
const app = express()

//连接 db
const db = require('./config/key').mongoURI

//引入 users.js
const users = require('./routes/api/users')

//使用 body-parser 中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//passport 初始化
app.use(passport.initialize())

mongoose.connect(db)
    .then(()=> console.log('success'))
    .catch(err => console.log(err))


require('./passport')(passport)

// app.get('/', (req,res)=>{
//     res.send('Hello World!')
// })


// 使用 routes
app.use('/api/users', users)
//@ts-ignore
const prot = process.env.PORT ||5000

app.listen(prot, ()=>{
    console.log(`Server runing on port ${prot}`)
})
