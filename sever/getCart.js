const Router = require("express").Router();
const mongoose = require("mongoose");

require("./user");
require("./goods");

//用户表
var Model = mongoose.model("user")
//商品表
var Goods = mongoose.model('goods')

Router.post("/cart", (req, res) => {
    if(!req.body.userId){
        return
    }
    var data = []
    Model.findOne({_id: req.body.userId}, {_id: 0, shoppingCart: 1}, (err1, docs1) => {
        docs1.shoppingCart.map((value) => {
            data.push(value.classId)
        })
        //  console.log(data)
        Goods.find({classId: {$in: data}}, {}, (err1, docs2) => {
            //  console.log(docs2,111111)

            var docs3=[]
            docs2.map((value1, index1) => {
                var count = 0
                docs1.shoppingCart.map((value2, index2) => {
                    if (value1.classId == value2.classId) {
//console.log(value1)
// console.log(value1,value2,"32132132")
                    docs3[index2] =   Object.assign({},value1._doc,{goodsCount:value2.goodsCount})
                       // {goodsCount:value2.goodsCount}
                    }
                })
            })
            var docs4=[...docs3]
            docs4.map((value,index)=>{
                if(!value){
                    docs4.splice(index,1)
                }
            })

            res.send({
                status: 1,
                msg: "成功",
                data: docs4
            })
        })


    })


})

Router.post("/collect", function (req, res) {
        if(!req.body.userId){
            res.send({
                status: 0,
                msg: "失败",
                data: 0
            })
            return
        }
        var data = []
        Model.findOne({_id: req.body.userId}, {_id: 0, collect: 1}, (err1, docs1) => {
            docs1.collect.map((value) => {
                data.push(value.classId)
            })

            Goods.find({classId: {$in: data}}, {}, (err1, docs2) => {
              if(err1){
                  res.send({
                      status: 0,
                      msg: "失败",
                      data: err1
                  })
                  return
              }


                docs2.map((value1, index1) => {

                    docs1.collect.map((value2, index2) => {
                        if (value1.classId == value2.classId) {
data.push(value1)
                        }
                    })
                })
                res.send({
                    status: 1,
                    msg: "成功",
                    data: data
                })
            })
        })
    })

// Router.post("/order",(req,res)=>{
//
// Model.findOne({_id: req.body.userId},{'order':1},(err,docs)=>{
//     console.log(docs)
// })
//
// })




module.exports = Router