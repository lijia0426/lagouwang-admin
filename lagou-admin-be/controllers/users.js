const userModel=require('../models/users')
const bcrypt=require('bcrypt') 
class UserController{
    constructor(){
        
    }
    _hashPassword(pwd){
        return new Promise((resolve,reject)=>{
            bcrypt.hash(pwd,10,(err,hash)=>{
                resolve(hash)
            })
        })
    }
    _ComparePassword(){

    }
    async signup(req,res,next){
        res.set('Content-Type','application/json; charset=utf-8');
        let password=req.body.password;
        let hash=await usercontroller._hashPassword(password)
        let result=await userModel.save({...req.body,password:hash});
        if(result){
            res.render('succ',{
                data:JSON.stringify({
                    message:'数据插入成功'
                })
            }) 
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    message:'数据插入失败'
                })
            }) 
        }
    }
    async signin(req,res,next){
        res.set('Content-Type','application/json; charset=utf-8');
        let result=await userModel.findOne(req.body.username)
        if(result){
            res.render('succ',{
                data:JSON.stringify({
                    message:'用户登录成功'
                })
            }) 
        }else{
            res.render('fail',{
                data:JSON.stringify({
                    message:'用户登录失败'
                })
            }) 
        }
    }
}
const usercontroller=new UserController()
module.exports=usercontroller;