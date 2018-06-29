const Router = require("express").Router();
const mongoose = require("mongoose");
const db = mongoose.connect('mongodb://localhost:27017/dUserBase');//如果没有添加库名，默认链接该MongoDB中的test库
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
    id: {
        type: String
    },
    firstClass:{
        type: String
    },
    //商品分类
    classId: {
        type: String
    }
    ,
    //品牌
    brand: {
        type: String
    },
    title: {
        type: String
    },
    //顶部图片
    titleImg: [
        {
            url: {
                type: String
            }
        }
    ],
    //详细图片
    detailImg: [{
        url: {
            type: String
        }
    }],
    keyword: [{
        type: String
    }],

    //已售
    sold: {
        type: Number
    },
    //新上架 新品
    freshStoresId: {
        type: Boolean
    },
    //温馨提示
    tips: {

        type: String
    }
    ,
    //商品样式
    style: [
        {
            //具体的样式
            type: {
                type: String
            },
            //这种样式的数量
            count: {
                type: String
            },
            pirce: {
                type: String
            },
            hanPirce: {
                type: String
            },
            //专柜价
            countersPirce: {
                type: String
            }

        }
    ],
//用户评论
    comments: [{

        //评价的星星数量
        starCount: {
            type: String
        },
        //评价用户姓名
        name: {
            type: String
        },
        //评价内容
        con: {
            type: String
        },
        //评价的时间 "2018-06-15/15:24"
        timer: {
            type: String
        }
    }
    ]
}, {
    collections: 'goods'
})

//创建模型
var Model = mongoose.model('goods', schema);


Router.post('/', function (req, res) {
    if (!req.body.id || !req.body.keyword || !req.body.classId || !req.body.title || !req.body.brand || !req.body.sold || !req.body.tips) {
        res.send({
            status: 0,
            msg: "请输入完整信息1"
        })
        return
    }
    if (!req.body.id || !req.body.keyword || req.body.classId == "" || req.body.brand == '' || req.body.sold == '' || req.body.tips == "") {
        res.send({
            status: 0,
            msg: "请输入完整信息2"
        })
        return
    }
    var commentsArr = []

    req.body["comments[con]"].map((value, index) => {
        commentsArr.push({
            starCount: req.body["comments[starCount]"][index],
            name: req.body["comments[name]"][index],
            con: value,
            timer: req.body["comments[timer]"][index]

        })
    })
    var goodstyleArr = []

    req.body["goodstyle[type]"].map((value, index) => {
        var pirceStr = (req.body["goodstyle[pirce]"][index] - 0)
        goodstyleArr.push({
            type: value,
            count: req.body["goodstyle[count]"][index],
            pirce: pirceStr,
            hanPirce: pirceStr * 0.5,
            countersPirce: pirceStr * 2

        })
    })
    var titleImg = []

    req.body.titleImg.map((value) => {
        titleImg.push({
            url: value
        })
    })
    var detailImg = []

    req.body.detailImg.map((value) => {
        detailImg.push({
            url: value
        })
    })
    var arr = {
        id: req.body.classId,
        keyword: req.body.keyword,
        //商品分类
        classId: req.body.classId + "" + req.body.id,
        //品牌
        title: req.body.title,
        brand: req.body.brand,
        //顶部图片
        titleImg: titleImg,
        //详细图片
        detailImg: detailImg,
        //已售
        sold: req.body.sold,
        //新上架 新品
        freshStoresId: true,
        //温馨提示
        tips: req.body.tips,
        //商品样式
        style: goodstyleArr,
        //用户评论
        comments: commentsArr

    }
    Model.create(arr, function (err, docs) {
        if (err) {
            console.log(err)
        }

        Model.find({}, {}, function (err2, docs2) {


            res.send({
                status: 1,
                msg: "成功",
                data: docs2
            })
        })
    })

})
//关键字查询
Router.get('/find/:type', function (req, res) {

    var resultArr = []

    Model.find({keyword: {$regex: req.params.type}}, {_id: 0, keyword: 1}, function (err1, docs1) {
        if (err1) {
            res.send({
                status: 0,
                msg: "查询失败",
                data: err1
            })
            return
        }
        docs1.map((value, index) => {
            value.keyword.map((value1) => {
                if (value1.indexOf(req.params.type) != -1) {

                    resultArr.push({
                        keyword: value1,
                        type: "keyword"
                    })
                }

            })
        })

        Model.find({'brand': {$regex: req.params.type}}, {brand: 1, _id: 0}, function (err2, docs2) {
            docs2.map((value) => {
                resultArr.push({
                    keyword: value.brand,
                    type: "brand"
                })
            })
            res.send({
                status: 1,
                msg: "成功",
                data: resultArr
            })

        })


    })


})

//根据关键字查询商品


Router.get('/find3/:type', function (req, res) {

    console.log(req.params.type)

    Model.find({firstClass:{$regex:req.params.type} }, {},{limit:12,sort:{"sold":1}}, function (err, docs) {
        res.send({
            status: 1,
            msg: "成功",
            data: docs
        })
    })


})

Router.get('/find2/:type', function (req, res) {

    console.log(req.params.type)

    Model.find({id: req.params.type + ""}, {}, function (err, docs) {
        res.send({
            status: 1,
            msg: "成功",
            data: docs
        })
    })


})


Router.post('/find/:type', function (req, res) {

    if (req.params.type == "classId") {
        Model.find({classId: req.body.key}, {}, function (err, docs) {
            res.send({
                status: 1,
                msg: "成功",
                data: docs
            })
        })
    }
    if (req.params.type == "id") {
        Model.find({id: req.body.key}, {}, function (err, docs) {
            res.send({
                status: 1,
                msg: "成功",
                data: docs
            })
        })
    }

    if (req.params.type == "keyword") {
        Model.find({keyword: {$regex: req.body.key}}, {}, function (err, docs) {
            res.send({
                status: 1,
                msg: "成功",
                data: docs
            })
        })
    }
    if (req.params.type == "brand") {
        a = {"brand": {$regex: req.body.key}}

        Model.find({brand: {$regex: req.body.key}}, {}, function (err, docs) {
            res.send({
                status: 1,
                msg: "成功",
                data: docs
            })
        })


    }
//     if(req.params.type=="x"){
//         a={$or:[
//                     {"keyword":{$regex:req.params.type}},
//                     {'brand':{$regex:req.params.type}},
//                     {'title':{$regex:req.params.type}}
//                 ]}
//     }
//     console.log(a)
    console.log(req.body.key)
    if (req.params.type == "x") {


        Model.find({
            $or: [
                {"keyword": {$regex: req.body.key}},
                {'brand': {$regex: req.body.key}},
                {'title': {$regex: req.body.key}}
            ]
        }, {}, function (err, docs) {
            if (err) {
                return;
            }
            res.send({
                status: 1,
                msg: "成功",
                data: docs
            })

        })
    }
    // Model.find({$or:[
    //         {"keyword":{$regex:req.params.type}},
    //         {'brand':{$regex:req.params.type}},
    //         {'title':{$regex:req.params.type}}
    //     ]}, {}, function (err, docs) {
    //     if (err) {
    //         return;
    //     }
    //     res.send({
    //         status: 1,
    //         msg: "成功",
    //         data: docs
    //     })
    //
    // })
})

Router.get("/index", function (req, res) {
    var dataOut = {
        newProduct: {
            msg1: "新品推荐",
            msg2: "轮播图的内容 3*5",
            line: 3,
            column: 5,
            data: [[], [], [], [], []]
        },
        classProduct: {
            msg1: "分类推荐",
            msg2: "分类推荐部分的内容",
            data: [
                {
                    "title": "彩妆护肤",
                    "titleSlog":"让爱不衰老",
                    "titleImg":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530246470177&di=4aff97d1141ff6f070ce639da3cfd4d2&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01119e57c513c90000012e7ea5aef4.jpg%402o.jpg",
                    classId: 1,
                    "con": []
                },
                {
                    "title": "身体护理",
                    "titleSlog":"精致生活",
                    "titleImg":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530246587473&di=d3691e6a67aad49e97ebce425b91982a&imgtype=0&src=http%3A%2F%2Fimages.xiustatic.com%2Fcms%2Fnoregular%2F2015%2F12%2F18%2F71e97813-55bb-475b-9812-51a012c726ff.jpg",
                    classId: 2,
                    "con": []
                },
                {
                    "title": "内衣配饰",
                    "titleSlog":"贴身呵护",
                    classId: 3,
                    "titleImg":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530246657959&di=26b35b12f51e0fe8ac6cd0f8bbb6c9f6&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F010c2155e169eb32f875a132d9453b.jpg",
                    "con": []
                },
                {
                    "title": "潮流服饰",
                    "titleSlog":"追赶潮流",
                    classId: 4,
                    "titleImg":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530246736221&di=a1badc036e854d004f265fb5c713861e&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01523e5588ecd4000000b18fbfa543.jpg",
                    "con": []
                },
                {
                    "title": "品牌鞋包",
                    "titleSlog":"大牌鞋包等着你",
                    classId: 5,
                    "titleImg":"https://img.alicdn.com/tps/TB1g4o.PXXXXXa4XXXXXXXXXXXX-1002-380.jpg",
                    "con": []
                },
                {
                    "title": "家具家电",
                    "titleSlog":"爱家爱生活",
                    classId: 6,
                    "titleImg":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530247035977&di=128b738bf2fdcdca085bc091c3d1a4b3&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F01%2F12%2F66%2Fs_1024_5512636dec9be.jpg",
                    "con": []
                },
            ]
        }
    }

    Model.find({}, {}, {limit: 15, sort: {brand: 1}}, function (err, docs) {
//console.log(docs)
        docs.map((value, index) => {
            var x = Math.floor(index / 3)
            var y = index - 3 * x
         //   console.log(x, y, 132321)
            dataOut.newProduct.data[x].push(value)


        })


         Model.find({"id": {$regex: ( 10 + "")}}, {}, {
             limit: 6,
             sort: {sold: 1}
         }, function (err, docs1) {

             dataOut.classProduct.data[0].con=docs1
             Model.find({"id": {$regex: ( 20 + "")}}, {}, {
                 limit: 6,
                 sort: {sold: 1}
             }, function (err, docs2) {

                 dataOut.classProduct.data[1].con=docs2
                 Model.find({"id": {$regex: ( 30 + "")}}, {}, {
                     limit: 6,
                     sort: {sold: 1}
                 }, function (err, docs3) {

                     dataOut.classProduct.data[2].con=docs3
/////////////
                     Model.find({"id": {$regex: ( 40 + "")}}, {}, {
                         limit: 6,
                         sort: {sold: 1}
                     }, function (err, docs4) {

                         dataOut.classProduct.data[3].con=docs4
////////
                         Model.find({"id": {$regex: ( 5 + "")}}, {}, {
                             limit: 6,
                             sort: {sold: 1}
                         }, function (err, docs5) {

                             dataOut.classProduct.data[4].con=docs5
////////
                             Model.find({"id": {$regex: ( 60 + "")}}, {}, {
                                 limit: 6,
                                 sort: {sold: 1}
                             }, function (err, docs6) {

                                 dataOut.classProduct.data[5].con=docs6

                                 res.send({
                                     status: 1,
                                     msg: "成功",
                                     data: dataOut
                                 })

////////
//////

                             })
//////

                         })
//////

                     })
////////

                 })

             })

         })















/////////////////////
//         dataOut.classProduct.data.map((value, index) => {
//             Model.find({"id": {$regex: (value.classId * 10 + "")}}, {}, {
//                 limit: 6,
//                 sort: {sold: 1}
//             }, function (err, docs) {
//                 value.con = docs
//
//
//                 if (value.classId == 6) {
//
//                     res.send({
//                         status: 1,
//                         msg: "成功",
//                         data: dataOut
//                     })
//
//                 }
//             })
//
//
//         })

////////////////////
    })
})


Router.post("/addcy",function (req,res) {
    console.log(1213213)
    console.log(req.body)
    res.send({
        data:req.body
    })
})


module.exports = Router;


