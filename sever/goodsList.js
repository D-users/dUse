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
   img: {
        type: String
    },
    classId: {
        type: Number
    },
    childern:[
        {
            className:{
                type: String
            } ,
            classId: {
                type: Number
            },



        }

    ]

}, {
    collections: 'goodslist'
})

//创建模型
var Model = mongoose.model('goodslist', schema);



 Router.get("/",function (req,res) {


    Model.find({},{},function (err,docs) {
        if (err){
            console.log(err);
            return;
        }

         // console.log(docs)
       res.send(docs)
    })
     var obj=[

     {

         "className" : "彩妆护肤",
         "classId" : 1,
         "img":"../../assets/img/ProductClassify/25.jpg",
         "childern" : [
         {
             "className" : "眼线",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 101
         },
         {
             "className" : " 眼影 ",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 102
         },
         {
             "className" : "眉笔",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 103
         },
         {
             "className" : " 唇膏 ",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 104
         },
         {
             "className" : "腮红",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 105
         },
         {
             "className" : "卸妆",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 106
         },
         {
             "className" : "洁面",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 107
         },
         {
             "className" : "爽肤水",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 108
         },
         {
             "className" : "乳液水",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 109
         },
         {
             "className" : "乳液面霜",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 110
         },
         {
             "className" : "精华",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 111
         },
         {
             "className" : "眼霜",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 112
         },
         {
             "className" : "防晒",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 113
         },
         {
             "className" : "面膜",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 114
         },
         {
             "className" : "套装",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 115
         }
     ]
     }

     ,
     {
         "className" : "身体护理",
         "img":"../../assets/img/ProductClassify/25.jpg",
         "classId" : 2,
         "childern" : [
         {
             "className" : "护发",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 201
         },
         {
             "className" : "沐浴",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 202
         },
         {
             "className" : "洗发",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 203
         },
         {
             "className" : "染发",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 204
         },
         {
             "className" : "牙膏/牙粉",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 205
         },
         {
             "className" : "造型",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 206
         },
         {
             "className" : "牙刷/牙线",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 207
         }
     ]
     }
,

     {

         "className" : "内衣配饰",
         "img":"../../assets/img/ProductClassify/25.jpg",
         "classId" : 3,
         "childern" : [
         {
             "className" : "文胸",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 301
         },
         {
             "className" : "内裤",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 302
         },
         {
             "className" : "保暖衣服",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 303
         },
         {
             "className" : "袜子",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 304
         },
         {
             "className" : "瘦腰",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 305
         },
         {
             "className" : "帽子",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 306
         },
         {
             "className" : "眼镜",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 307
         },
         {
             "className" : "围巾",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 308
         },
         {
             "className" : "雨伞",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 309
         },
         {
             "className" : "项链",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 310
         },
         {
             "className" : "饰品",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 311
         },
         {
             "className" : "皮带",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 312
         }
     ]
     }
,

     {

         "className" : "潮流服饰",
         "img":"../../assets/img/ProductClassify/25.jpg",
         "classId" : 4,
         "childern" : [
         {
             "className" : "连衣裙",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 401
         },
         {
             "className" : "针织衫",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 402
         },
         {
             "className" : "T恤",
             "img":"../../assets/img/ProductClassify/25.jpg",
             "classId" : 403
         },
         {
             "className" : "衬衫",
             "classId" : 404
         },
         {
             "className" : "长裤",
             "classId" : 405
         },
         {
             "className" : "睡衣",
             "classId" : 406
         }
     ]
     },
     {

         "className" : "家居家电",
         "img":"../../assets/img/ProductClassify/25.jpg",
         "classId" : 5,
         "childern" : [
         {
             "className" : "个人护理",
             "classId" : 501
         },
         {
             "className" : "小家电",
             "classId" : 502
         },
         {
             "className" : "连衣裙",
             "classId" : 503
         },
         {
             "className" : "厨具",
             "classId" : 504
         },
         {
             "className" : "厨房家电",
             "classId" : 504
         },
         {
             "className" : "家装",
             "classId" : 505
         },
         {
             "className" : "家纺",
             "classId" : 506
         },
         {
             "className" : "数码办公",
             "classId" : 507
         },
         {
             "className" : "日用品",
             "classId" : 508
         },
         {
             "className" : "餐具",
             "classId" : 509
         }
     ]
     }
,

     {
         "className" : "品牌鞋包",
         "img":"../../assets/img/ProductClassify/25.jpg",
         "classId" : 6,
         "childern" : [
         {
             "className" : "单肩包",
             "classId" : 601
         },
         {
             "className" : "手提包",
             "classId" : 602
         },
         {
             "className" : "双肩包",
             "classId" : 603
         },
         {
             "className" : "公交报",
             "classId" : 604
         },
         {
             "className" : "手拿包",
             "classId" : 605
         },
         {
             "className" : "钱包",
             "classId" : 606
         },
         {
             "className" : "雪地靴",
             "classId" : 607
         },
         {
             "className" : "拖鞋 ",
             "classId" : 608
         }
     ]
     }
     ,
     {
         "className" : "食品酒水",
         "img":"../../assets/img/ProductClassify/25.jpg",
         "classId" : 7,
         "childern" : [
         {
             "className" : "奶粉",
             "classId" : 701
         },
         {
             "className" : "饼干蛋糕",
             "classId" : 702
         },
         {
             "className" : "糖果巧克力",
             "classId" : 703
         },
         {
             "className" : "休闲食品",
             "classId" : 704
         },
         {
             "className" : "冲调饮料",
             "classId" : 705
         },
         {
             "className" : "粮油香精",
             "classId" : 706
         },
         {
             "className" : "洗护用品",
             "classId" : 707
         },
         {
             "className" : "玩具乐器",
             "classId" : 708
         },
         {
             "className" : "尿裤",
             "classId" : 709
         }
     ]
     }
,

     {
         "className" : "运动户外",
         "img":"../../assets/img/ProductClassify/25.jpg",
         "classId" : 8,
         "childern" : [
         {
             "className" : "跑步机",
             "classId" : 801
         },
         {
             "className" : "动感单车",
             "classId" : 802
         },
         {
             "className" : "仰卧板",
             "classId" : 803
         },
         {
             "className" : "瑜伽垫",
             "classId" : 804
         },
         {
             "className" : "自行车",
             "classId" : 805
         },
         {
             "className" : "帐篷垫子",
             "classId" : 806
         },
         {
             "className" : "睡袋吊床",
             "classId" : 807
         },
         {
             "className" : "户外用品",
             "classId" : 808
         },
         {
             "className" : "其他工具",
             "classId" : 809
         }
     ]
     }

     ]


     // obj.map(function (value, index, array) {
     //
     //     Model.create(value, function (err, docs) {
     //         if (err) {
     //             console.error(err);
     //             return;
     //         }
     //         console.log(docs);
     //
     //     })
     //
     // })





 })




 module.exports = Router;


