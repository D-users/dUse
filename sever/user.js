const Router = require("express").Router();
const mongoose = require("mongoose");
const querystring = require("querystring");
const db = mongoose.connect('mongodb://localhost:27017/dUserBase');//如果没有添加库名，默认链接该MongoDB中的test库

//链接到已经启动的mongodb
var connection = mongoose.connection;
//监听数据库连接成功
connection.once('open', function () {
    console.log("数据库连接成功");
})
connection.on('error', function (err) {
    console.error(new Error(err));
})

//设置集合的骨架
var schema = new mongoose.Schema({
    userId: {
        type: String
    },
    pwd: {
        type: String
    }
}, {
    collections: 'user'
})

//创建模型
var Model = mongoose.model('user', schema);
Router.post('/add', function (req, res) {
    // var body = req.body;
    console.log(req.body.userId);

    if (req.body.userId == "" || req.body.pwd == "") {
        res.send({
            status: 0,
            msg: "用户名或密码未输入"
        })
        return;
    }else{
        Model.find({userId:req.body.userId},{},function (err,docs) {
            if (err){
                console.log(err);
                return;
            }
            console.log(docs.length)
          if(docs.length>=1){
              res.send({
                  status: 0,
                  msg: "用户已经存在"
              })
          }else {
              Model.create({userId: req.body.userId, pwd: req.body.pwd}, function (err, docs) {
                  if (err) {
                      console.error(err);
                      return;
                  }
                  console.log(docs);
                  res.send({
                      status: 1,
                      msg: "注册成功"
                  })
               })
          }
        })
    }
})
Router.post("/login",function (req,res) {

    if (req.body.userId == "" || req.body.pwd == "") {
        res.send({
            status: 0,
            msg: "用户名或密码未输入"
        })
        return;
    }else {
        Model.find({userId:req.body.userId,pwd:req.body.pwd},{},function (err,docs) {
            if (err){
                console.log(err);
                return;
            }
            if(docs.length>=1) {
                res.send({
                    status: 1,
                    msg: "登录成功"
                })
            }else {
                res.send({
                    status: 0,
                    msg: "用户名或者密码错误"
                })
            }

        })
    }




})

module.exports = Router;


