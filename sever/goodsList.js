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
    className: {
        type: String
    },
    classId: {
        type: String
    },
    parentsId: {
        type: String
    }
}, {
    collections: 'goodslist'
})

//创建模型
var Model = mongoose.model('goodslist', schema);



Router.get("/",function (req,res) {
    console.log("1411")

    Model.find({},{_id:0},function (err,docs) {
        if (err){
            console.log(err);
            return;
        }
        console.log(docs)
      res.send(docs)

    })
    // Model.create({className:"123", classId:"1234",parentsId:"12345"}, function (err, docs) {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log(docs);
    //     res.send({
    //         status: 1,
    //         msg: "注册成功"
    //     })
    // })



})




module.exports = Router;


