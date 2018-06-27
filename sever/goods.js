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
            line:3,
            column:5,
            data: [[],[],[],[],[]]
        },
        classProduct: {
            msg1: "分类推荐",
            msg2: "分类推荐部分的内容",
            data: [
                {
                    "title": "彩妆护肤",
                    classId: 1,
                    "con": []
                },
                {
                    "title": "身体护理",
                    classId: 2,
                    "con": []
                },
                {
                    "title": "内衣配饰",
                    classId: 3,
                    "con": []
                },
                {
                    "title": "潮流服饰",
                    classId: 4,
                    "con": []
                },
                {
                    "title": "品牌鞋包",
                    classId: 5,
                    "con": []
                },
                {
                    "title": "家具家电",
                    classId: 6,
                    "con": []
                },
            ]
        }
    }

    Model.find({}, {}, {limit:15, sort: {sold: 1}}, function (err, docs) {
//console.log(docs)
docs.map((value,index)=>{
    var x=Math.floor(index/3)
    var y=index-3*x
    console.log(x,y,132321)
    dataOut.newProduct.data[x].push(value)



})


         var goodList = []
        dataOut.classProduct.data.map((value, index) => {

            Model.find({"id": {$regex: (value.classId * 10 + "")}}, {}, {limit: 6, sort: {sold: 1}}, function (err, docs) {
                value.con = docs


                if (value.classId == 6) {

                    res.send({
                        status: 1,
                        msg: "成功",
                        data: dataOut
                    })

                }
            })
        })
    })
})


module.exports = Router;


