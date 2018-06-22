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

///////

    //商品id 可以是类名加序号 101+0001
    id: {
        type: String
    },
    //商品分类
    classId: {
        type: Number
    }
    ,
    //品牌
    brand: {
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
    //价格
    pirce: {
        type: Number
    },
    //韩豆
    hanPirce: {
        type: Number
    },
    //专柜价
    countersPirce: {
        type: Number
    },
    //已售
    sold: {
        type: Number
    },
    //新上架 新品
    freshStoresId: true,
    //温馨提示
    tips: [
        {
            title: {
                type: String
            },
            content: {
                type: String
            },
            presentation: {
                type: String
            }
        }
        ],
    //商品样式
    style: [
        {
            //具体的样式
            type: {
                type: String
            },
            //这种样式的数量
            count: {
                type: Number
            }

        }
    ],
//用户评论
    comments: [{

        //评价的星星数量
        starCount: {
            type: Number
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


    /////////


}, {
    collections: 'goods'
})

//创建模型
var Model = mongoose.model('goods', schema);

Router.get('/', function (req, res) {
    console.log(req.path);
    Model.find({}, {}, function (err, docs) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(docs);
        res.send({
            status: 1,
            msg: "goods ok",
            data: docs
        })
    })
})

module.exports = Router;


