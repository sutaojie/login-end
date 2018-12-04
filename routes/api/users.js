//@ts-ignore
const express = require('express')
const router = express.Router()

const crypto = require("crypto");

const gravatar = require('gravatar')

const jwt = require('jsonwebtoken');

const key = require('../../config/key').secretOrKey

const User = require('../../models/Users')

// $route GET api/user/login
// @desc 返回 token jwt passport
// @access public 
router.post('/login', (req,res)=>{
    const email = req.body.email
    const password = req.body.password

    //查询数据库
    User.findOne({email})
        .then(user =>{
            if(!user){
                return res.status(404).json({email:"用户不存在"})
            }
            let md5 = crypto.createHash("md5");
            let Pas = md5.update(password).digest("hex");
            if(Pas === user.password){
                const rule = {id: user.id, name:user.name}
                // jwt.sign({'规则', '加密名字', '过期时间', '箭头函数');
                jwt.sign(rule, key, {expiresIn: 3600},(err, token)=>{
                    if(err) throw console.log(err);
                    res.json({
                        success:true,
                        token: token
                    })
                })
            }else{
                res.status(400).json({msg:'密码不正确'})
            }
            
            return res

        })
})

// $route POST api/user/regin
// @desc 返回的请求的 json 数据
// @access public 
router.post('/regin', (req,res)=>{
    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
        .then((user)=>{
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