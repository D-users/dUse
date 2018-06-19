const Router = require("express").Router();
const mongoose = require("mongoose");
const db=mongoose.connect('mongodb://localhost:27017/dUserBase');//如果没有添加库名，默认链接该MongoDB中的test库

var connection = mongoose.connection;
//监听数据库连接成功
connection.once('open',function () {
    console.log("数据库连接成功");
})
connection.on('error',function (err) {
    console.error(new Error(err));
})


//设置集合的骨架
var schema = new mongoose.Schema({
    name:{
        type:String
    },
    pwd:{
        type:String
    }
},{
    collections:'seller'
})

//创建模型
var Model = mongoose.model('seller',schema);

Router.get('/',function (req, res) {
    console.log(req.path);
    Model.find({},{},function (err, docs) {
        if (err){
            console.error(err);
            return;
        }
        console.log(docs);
        res.send({
            status:1,
            msg:"goods ok",
            data:docs
        })
    })
})

module.exports = Router;


