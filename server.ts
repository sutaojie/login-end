//@ts-ignore
const express = require('express')
//@ts-ignore
const mongoose = require('mongoose')
const app = express()

const db = require('./config/key').mongoURI


mongoose.connect(db)
    .then(()=> console.log('success'))
    .catch(err => console.log(err))

app.get('/', (req,res)=>{
    res.send('Hello World!')
})
//@ts-ignore
const prot = process.env.PORT ||5000

app.listen(prot, ()=>{
    console.log(`Server runing on port ${prot}`)
})
