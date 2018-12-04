//@ts-ignore
const express = require('express')
//@ts-ignore
const mongoose = require('mongoose')
const app = express()

//连接 db
const db = require('./config/key').mongoURI

//引入 users.js
const users = require('./routes/api/users')


mongoose.connect(db)
    .then(()=> console.log('success'))
    .catch(err => console.log(err))

app.get('/', (req,res)=>{
    res.send('Hello World!')
})


// 使用 routes
app.use('/api/users', users)
//@ts-ignore
const prot = process.env.PORT ||5000

app.listen(prot, ()=>{
    console.log(`Server runing on port ${prot}`)
})
