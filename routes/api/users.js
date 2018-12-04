//@ts-ignore
const express = require('express')
const router = express.Router()

// $route GET api/user/login
// @desc 返回的请求的 json 数据
// @access public 
router.get('/login', (req,res)=>{
    res.json({msg:'login works'})
})

module.exports = router