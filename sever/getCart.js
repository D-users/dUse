const Router = require("express").Router();
const mongoose = require("mongoose");

require("./user");
require("./goods");

//用户表
var Model = mongoose.model("user")
//商品表
var Goods = mongoose.model('goods')

Router.post("/cart", (req, res) => {
    if (!req.body.userId) {
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

            var docs3 = []
            docs2.map((value1, index1) => {
                var count = 0
                docs1.shoppingCart.map((value2, index2) => {
                    if (value1.classId == value2.classId) {
//console.log(value1)
// console.log(value1,value2,"32132132")
                        docs3.push(Object.assign({}, value1._doc, {goodsCount: value2.goodsCount}))
                        // {goodsCount:value2.goodsCount}
                    }
                })
            })


            res.send({
                status: 1,
                msg: "成功",
                data: docs3
            })
        })


    })


})

Router.post("/collect", function (req, res) {
    if (!req.body.userId) {
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
            if (err1) {
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

Router.post("/order", (req, res) => {

    if (!req.body.userId) {
        res.send({
            status: 0,
            msg: "请输入userId",
            data: 0
        })
        return
    }
    Model.findOne({_id: req.body.userId}, {'order': 1}, (err, docs) => {
        if (err) {
            console.log(err)
            res.send({
                status: 0,
                msg: "失败",
                data: err
            })
        }
        //  console.log(docs)
        var a = []
        docs.order.map((value, index) => {
            value.Detail.map((value2, index2) => {
                a.push(value2.classId)
            })
        })

        Goods.find({classId: {$in: a}}, {}, function (err2, docs2) {
            //console.log(docs2)
            var order = []
            docs.order.map((value3, index3) => {
                var Detail = []
                value3.Detail.map((value4, index4) => {
                    docs2.map((value5, index5) => {
                        if (value4.classId == value5.classId) {


                            Detail.push(Object.assign({}, value5._doc, {count: value4.count}))

                        }
                    })
                })

                delete value3[Detail]
                //     console.log(value3)
                order.push(Object.assign({
                    _id: value3._id,
                    state: value3.state,
                    totalMoney: value3.totalMoney
                }, {Detail: Detail}))

            })
            //console.log(order)
            res.send({
                status: 1,
                msg: "成功",
                data: order
            })
        })
    })

})


module.exports = Router