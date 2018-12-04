//@ts-ignore
const express = require('express')
const router = express.Router()

const User = require('../../models/Users')

// $route GET api/user/login
// @desc 返回的请求的 json 数据
// @access public 
router.get('/login', (req,res)=>{
    res.json({msg:'login works'})
})

// $route POST api/user/regin
// @desc 返回的请求的 json 数据
// @access public 
router.post('/regin', (req,res)=>{
    // console.log(req.body)

    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
        .then((user)=>{
            if(user){
                return res.status(400).json({email:'邮箱已被注册!'})
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.eamil,
                    avatar:req.body.avatar,
                    password: req.body.password
                })
                return res.status(200).json({msg:'注册成功'})
                
            }
        })
})

module.exports = router