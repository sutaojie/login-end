//@ts-ignore
const express = require('express')
const router = express.Router()

const crypto = require("crypto");

const gravatar = require('gravatar')



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
    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
        .then((user)=>{
            console.log(user);
            
            if(user){
                return res.status(400).json({email:'邮箱已被注册!'})
            }else{
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })
                let md5 = crypto.createHash("md5");
                let newPas = md5.update(newUser.password).digest("hex");
                newUser.password = newPas                
                newUser.save()
                   .then(user => res.json(user)) 
                   .catch(err => res.json(err))
            }
        })
})

module.exports = router