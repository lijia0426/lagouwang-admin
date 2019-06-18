const userModel = require('../models/users')
const bcrypt = require('bcrypt')
class UserController {
    constructor() {

    }
    _hashPassword(pwd) {
        return new Promise((resolve) => {
            bcrypt.hash(pwd, 10, (err, hash) => {
                resolve(hash)
            })
        })
    }
    _ComparePassword(pwd, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(pwd,hash,function(err,res){
                resolve(res)
            })
        })
    }
    async signup(req, res, next) {
        let user=await userModel.findOne(req.body.username)
        if(user){
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户名已经存在'
                })
            })
            return 
        }

        res.set('Content-Type', 'application/json; charset=utf-8');
        let password = req.body.password;
        let hash = await usercontroller._hashPassword(password)
        let result = await userModel.save({ ...req.body, password: hash });
        if (result) {
            res.render('succ', {
                data: JSON.stringify({
                    message: '用户注册成功'
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户注册失败'
                })
            })
        }
    }
    async signin(req, res, next) {
        res.set('Content-Type', 'application/json; charset=utf-8');
        let result = await userModel.findOne(req.body.username)
        if (result) {
            if (await usercontroller._ComparePassword(req.body.password,result['password'])) {
                //创建一个session，保存用户名
                req.session.username=result['username']
                //后端种cookie
                // res.cookie('name','tobi')
                res.render('succ', {
                    data: JSON.stringify({
                        username:result['username'],
                        message: '用户登录成功'
                    })
                })
            } else {
                res.render('fail', {
                    data: JSON.stringify({
                        message: '密码错误'
                    })
                })
            }
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户不存在'
                })
            })
        }
    }
    issignin(req,res,next){
        res.set('Content-Type','application/json;charset=utf-8')
        if(req.session.username){
            res.render('succ',{
                data:JSON.stringify({
                    username:req.session.username,
                    isSignin:true
                })
            })
        }else{
            res.render('succ',{
                data:JSON.stringify({
                    isSignin:false
                })
            })
        }
    }
    signout(req,res,next){
        res.set('Content-Type', 'application/json; charset=utf-8');
        req.session=null;
        res.render('succ',{
            data:JSON.stringify({
                isSignin:false
            })
        })
    }
}
const usercontroller = new UserController()
module.exports = usercontroller;