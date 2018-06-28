const Router = require("express").Router();
const mongoose = require("mongoose");
const querystring = require("querystring");
const db = mongoose.connect('mongodb://localhost:27017/dUserBase');//如果没有添加库名，默认链接该MongoDB中的test库
//日期函数
function getNowDate() {
    var date = new Date();
    var sign1 = "-";
    var sign2 = ":";
    var year = date.getFullYear() // 年
    var month = date.getMonth() + 1; // 月
    var day = date.getDate(); // 日
    var hour = date.getHours(); // 时
    var minutes = date.getMinutes(); // 分
    var seconds = date.getSeconds(); //秒
    var currentdate = year + sign1 + month + sign1 + day + "/" + hour + sign2 + minutes + sign2 + seconds;
    return currentdate;
}

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
    userName: {
        type: String
    },
    pwd: {
        type: String
    },
    money: {
        han: {
            type: Number
        },
        rmb: {
            type: Number
        }
    }
    ,

    moneyRecord: [{
//使用类型 recharge充值 pay消费/提现
        userType: {
            type: String
        },
        timer: {
            type: String
        },
        //人命比或者韩币 han/rmb
        cashType: {
            type: String
        },
        amount: {
            type: Number
        }
    }

    ]
    ,
    phoneNumber: {
        type: String
    },
    bankCard: {
        cardNumber: {
            type: Number
        },
        bank: {
            type: String
        },
        cardUserName: {
            type: String
        }


    },
    order: [
        {
            //bePaid 0   beSend 1 beReceive2 beEvaluation3  退货ReturnGood 4
            state: {
                type: Number
            },
            Detail: [

                {
                    classId: {
                        type: String
                    },
                    count: {
                        type: Number
                    }


                }

            ]

            ,
            totalMoney: {
                type: Number
            },
            orderAddressId: {
                type: Number
            }
        }
    ],
    //收藏
    collect: [
        {
            classId: {
                type: String
            },
            goodsCount: {
                type: Number
            }
        }
    ],
    //购物车
    shoppingCart: [
        {
            classId: {
                type: String
            },
            goodsCount: {
                type: Number
            }
        }
    ]
    ,
    //地址
    address: [
        {
            //收货地址序号
            addressId: {
                type: Number
            },
            //收货人姓名
            receiveName: {
                type: String
            },
            receivePhoneNumber: {
                type: String
            },
            receiveIdCard: {
                type: String
            },
            province: {
                type: String
            },
            city: {
                type: String
            },
            area: {
                type: String
            },
            DetailedAddress: {
                type: String
            },
            //默认
            default: {
                type: Boolean
            }
        }
    ]

}, {
    collections: 'user'
})

//创建模型
var Model = mongoose.model('user', schema);

////////////////////////////////////////////////////////////注册/////////
Router.post('/regist', function (req, res) {

    if (!req.body.userName || !req.body.pwd) {
        res.send({
            status: 0,
            msg: "用户名或密码未输入"
        })
        return;
    }

    Model.find({userName: req.body.userName}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }

        if (docs.length >= 1) {
            res.send({
                status: 0,
                msg: "用户已经存在"
            })
        } else {
            //注册初始化
            var Initialize = {
                userName: req.body.userName,
                pwd: req.body.pwd,
                money: {
                    han: 0,
                    rmb: 0
                },
                moneyRecord: [],
                phoneNumber: "",
                bankCard: {
                    cardNumber: -1,
                    bank: "",
                    cardUserName: ""
                }
                ,
                collect: [],
                shoppingCart: [],
                address: []
            }


            Model.create(Initialize, function (err, docs) {
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

})
////////////////////////////////////////////////////////////登录/////////
Router.post("/login", function (req, res) {
    if (!req.body.userName || !req.body.pwd) {
        res.send({
            status: 0,
            msg: "用户名或密码未输入"
        })
        return;
    }
    Model.find({userName: req.body.userName, pwd: req.body.pwd}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (docs.length >= 1) {
            var data = docs[0]
            delete data.userName,
                delete data.pwd,
                res.send({
                    status: 1,
                    msg: "登录成功",
                    data: data
                })
        } else {
            res.send({
                status: 0,
                msg: "用户名或者密码错误"
            })
        }
    })

})
////////////////////////////////////////////////////////////钱的查询和修改/////////
Router.post("/money/Record", function (req, res) {
    if (req.body.userId == "") {
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        var Record = {
            rmb: [],
            han: []
        }
        docs[0].moneyRecord.forEach(function (value, index) {
            if (value.cashType == "rmb") {
                Record.rmb.push(value)
            } else {
                Record.han.push(value)
            }
        })
        if (docs.length >= 1) {
            res.send({
                status: 1,
                msg: "查询成功",
                data: Record
            })
        } else {
            res.send({
                status: 0,
                msg: "用户名或者密码错误"
            })
        }
    })
})
Router.post("/money", function (req, res) {
    console.log(req.params)

    if (req.body.userId == "") {
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (docs.length >= 1) {
            res.send({
                status: 1,
                msg: "查询成功",
                data: {
                    rmb: docs[0].money.rmb
                }
            })
        } else {
            res.send({
                status: 0,
                msg: "用户名或者密码错误"
            })
        }
    })
})
Router.post("/moneyPay", function (req, res) {

    if (!req.body.userId) {
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err1, docs) {
        if (err1 || (docs[0].money.rmb - 0) < Math.abs(req.body.count - 0)) {
            res.send({
                status: 0,
                msg: "失败",

            })
            return;
        }
        var moneyRecordArr = docs[0].moneyRecord
        moneyRecordArr.push({
            //使用类型 recharge充值 pay消费/提现
            userType: "pay",
            timer: getNowDate(),
            //人命比或者韩币 han/rmb
            cashType: "rmb",
            amount: req.body.count

        })
        Model.update({_id: req.body.userId}, {
            "money.rmb": (docs[0].money.rmb - 0) - Math.abs(req.body.count - 0),
            moneyRecord: moneyRecordArr
        }, function (err2, msg) {
            if (err2) {
                res.send({
                    status: 0,
                    msg: "失败",
                })
                return;
            }

            res.send({
                status: 1,
                msg: "成功",
                data: msg
            })

        })

    })

})
Router.post("/moneyAdd", function (req, res) {

    if (!req.body.userId || !req.body.count) {
        return;
        res.send({
            status: 0,
            msg: "失败1",

        })
    }
    Model.find({_id: req.body.userId}, {}, function (err1, docs) {
        if (err1) {
            res.send({
                status: 0,
                msg: "失败2",

            })
            return;
        }

        var moneyRecordArr = docs[0].moneyRecord
        moneyRecordArr.push({
            //使用类型 recharge充值 pay消费/提现
            userType: "recharge",
            timer: getNowDate(),
            //人命比或者韩币 han/rmb
            cashType: "rmb",
            amount: req.body.count

        })
        console.log(moneyRecordArr)

        Model.update({_id: req.body.userId}, {
            "money.rmb": (docs[0].money.rmb - 0) + Math.abs(req.body.count - 0),
            moneyRecord: moneyRecordArr
        }, function (err2, msg) {
            if (err2) {
                res.send({
                    status: 0,
                    msg: "失败3",
                })
                return;
            }


            res.send({
                status: 1,
                msg: "成功",
                data: msg
            })

        })

    })

})
////////////////////////////////////////////////////////////韩豆的查询和修改/////////
Router.post("/han", function (req, res) {

    if (req.body.userId == "") {
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (docs.length >= 1) {
            res.send({
                status: 1,
                msg: "查询成功",
                data: {
                    han: docs[0].money.han
                }
            })
        } else {
            res.send({
                status: 0,
                msg: "用户名或者密码错误"
            })
        }
    })
})
Router.post("/hanPay", function (req, res) {
    if (req.body.userId == "") {
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err1, docs) {
        if (err1 || (docs[0].money.han - 0) < Math.abs(req.body.count - 0)) {
            res.send({
                status: 0,
                msg: "失败",

            })
            return;
        }
        var moneyRecordArr = docs[0].moneyRecord
        moneyRecordArr.push({
            //使用类型 recharge充值 pay消费/提现
            userType: "pay",
            timer: getNowDate(),
            //人命比或者韩币 han/rmb
            cashType: "han",
            amount: req.body.count

        })
        Model.update({_id: req.body.userId}, {
            "money.han": (docs[0].money.han - 0) - Math.abs(req.body.count - 0),
            moneyRecord: moneyRecordArr
        }, function (err2, msg) {
            if (err2) {
                res.send({
                    status: 0,
                    msg: "失败",
                })
                return;
            }

            res.send({
                status: 1,
                msg: "成功",
                data: msg
            })

        })

    })

})
Router.post("/hanAdd", function (req, res) {

    if (req.body.userId == "") {
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err1, docs) {
        if (err1) {
            res.send({
                status: 0,
                msg: "失败",

            })
            return;
        }
        var moneyRecordArr = docs[0].moneyRecord
        moneyRecordArr.push({
            //使用类型 recharge充值 pay消费/提现
            userType: "recharge",
            timer: getNowDate(),
            //人命比或者韩币 han/rmb
            cashType: "han",
            amount: req.body.count

        })

        Model.update({_id: req.body.userId}, {
            "money.han": (docs[0].money.han - 0) + Math.abs(req.body.count - 0),
            moneyRecord: moneyRecordArr
        }, function (err2, msg) {
            if (err2) {
                res.send({
                    status: 0,
                    msg: "失败",
                })
                return;
            }

            res.send({
                status: 1,
                msg: "成功",
                data: msg
            })

        })

    })

})
////////////////////////////////////////////////////////////电话号码查询/////////
Router.post("/phone", function (req, res) {

    if (req.body.userId == "") {
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (docs.length >= 1) {
            res.send({
                status: 1,
                msg: "查询成功",
                data: {
                    phoneNumber: parseInt(docs[0].phoneNumber)
                }
            })
        } else {
            res.send({
                status: 0,
                msg: "错误"
            })
        }
    })
})
Router.post("/phoneUpdate", function (req, res) {
    console.log(req.body.phoneNumber)

    if (req.body.userId == "") {
        return;
    }
    Model.update({_id: req.body.userId}, {phoneNumber: req.body.phoneNumber}, function (err2, msg) {
        if (err2) {
            res.send({
                status: 0,
                msg: "失败",
            })
            return;
        }

        res.send({
            status: 1,
            msg: "成功",
            data: msg
        })

    })


})
////////////////////////////////////////////////////////////银行卡/////////
Router.post("/bankCard", function (req, res) {

    if (req.body.userId == "") {
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (docs.length >= 1) {
            res.send({
                status: 1,
                msg: "查询成功",
                data: docs[0].bankCard

            })
        } else {
            res.send({
                status: 0,
                msg: "错误"
            })
        }
    })
})
Router.post("/bankCardUpdate", function (req, res) {


    if (req.body.userId == "" || !req.body.cardNumber || !req.body.bank || !req.body.cardUserName) {
        return;
    }
    var obj = {
        cardNumber: req.body.cardNumber,
        bank: req.body.bank,
        cardUserName: req.body.cardUserName
    }
    Model.update({_id: req.body.userId}, {"bankCard": obj}, function (err2, msg) {
        if (err2) {
            res.send({
                status: 0,
                msg: "失败",
            })
            return;
        }

        res.send({
            status: 1,
            msg: "成功",
            data: msg
        })

    })


})
////////////////////////////////////////////////////////////收藏/////////

Router.post("/collectChange", function (req, res) {

    if (!req.body.userId || !req.body.classId || !req.body.count) {
        res.send({
            status: 0,
            msg: "失败",
        })
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (docs[0].collect.length >= 1) {

            //收藏夹里有收藏
            var collectStr = docs[0].collect.map(function (value, index) {
                return {
                    classId: value.classId + "",
                    goodsCount: value.goodsCount - 0

                }
            })
            // console.log(collectStr)
            var has = false
            collectStr.forEach(function (value, index) {

                if ((value.classId + "") == (req.body.classId + "")) {

                    has = true
                    //有这个商品
                    if (((req.body.count - 0) + (value.goodsCount - 0) <= 0)) {

//删除这个商品
                        collectStr.splice(index, 1)

                        Model.update({_id: req.body.userId}, {collect: collectStr}, function (err2, msg) {
                            if (err2) {
                                res.send({
                                    status: 0,
                                    msg: "失败",
                                })
                                return;
                            }

                            res.send({
                                status: 1,
                                msg: "成功",
                                data: msg
                            })

                        })
                    } else {

                        collectStr[index].goodsCount = (req.body.count - 0) + (value.goodsCount - 0)
                        Model.update({_id: req.body.userId}, {collect: collectStr}, function (err2, msg) {
                            if (err2) {
                                res.send({
                                    status: 0,
                                    msg: "失败",
                                })
                                return;
                            }

                            res.send({
                                status: 1,
                                msg: "成功",
                                data: msg
                            })

                        })


                    }
                }
            })
            if (!has) {
                if (req.body.count - 0 <= 0) {
                    res.send({
                        status: 0,
                        msg: "数量错误",
                    })
                    return;
                }
                collectStr.push({
                    classId: (req.body.classId),
                    goodsCount: req.body.count
                })

                Model.update({_id: req.body.userId}, {collect: collectStr}, function (err2, msg) {
                    if (err2) {
                        res.send({
                            status: 0,
                            msg: "失败",
                        })
                        return;
                    }

                    res.send({
                        status: 1,
                        msg: "成功",
                        data: msg
                    })

                })


            }


        } else {
            //没有收藏
            if (req.body.count > 0) {
                Model.update({_id: req.body.userId}, {
                    $push: {
                        collect: {
                            classId: req.body.classId,
                            goodsCount: req.body.count
                        }
                    }
                }, function (err2, msg) {
                    if (err2) {
                        res.send({
                            status: 0,
                            msg: "失败",
                        })
                        return;
                    }

                    res.send({
                        status: 1,
                        msg: "成功",
                        data: msg
                    })

                })
            } else {
                return
            }


        }
    })


})
////////////////////////////////////////////////////////////购物车/////////

Router.post("/shoppingCartChange", function (req, res) {


    if (!req.body.userId || !req.body.classId || !req.body.count) {
        res.send({
            status: 0,
            msg: "失败",
        })
        return;
    }

    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (docs[0].shoppingCart.length >= 1) {

            //收藏夹里有收藏
            var collectStr = docs[0].shoppingCart.map(function (value, index) {
                return {
                    classId: value.classId + "",
                    goodsCount: value.goodsCount - 0

                }
            })
            // console.log(collectStr)
            var has = false
            collectStr.forEach(function (value, index) {


                if ((value.classId + "") == (req.body.classId + "")) {
                    console.log("555555")
                    has = true
                    //有这个商品
                    if (((req.body.count - 0) + (value.goodsCount - 0) <= 0)) {
                        console.log(req.body.count, value.goodsCount, "33333")
//删除这个商品
                        collectStr.splice(index, 1)
                        console.log(collectStr, "111111")
                        Model.update({_id: req.body.userId}, {shoppingCart: collectStr}, function (err2, msg) {
                            if (err2) {
                                res.send({
                                    status: 0,
                                    msg: "失败",
                                })
                                return;
                            }

                            res.send({
                                status: 1,
                                msg: "成功",
                                data: msg
                            })

                        })
                    } else {
                        console.log("222222")
                        collectStr[index].goodsCount = (req.body.count - 0) + (value.goodsCount - 0)
                        Model.update({_id: req.body.userId}, {shoppingCart: collectStr}, function (err2, msg) {
                            if (err2) {
                                res.send({
                                    status: 0,
                                    msg: "失败",
                                })
                                return;
                            }

                            res.send({
                                status: 1,
                                msg: "成功",
                                data: msg
                            })

                        })


                    }
                }
            })
            if (!has) {
                if (req.body.count - 0 <= 0) {
                    res.send({
                        status: 0,
                        msg: "数量错误",
                    })
                    return;
                }
                collectStr.push({
                    classId: (req.body.classId),
                    goodsCount: req.body.count
                })
                console.log(collectStr, "88888888")
                Model.update({_id: req.body.userId}, {shoppingCart: collectStr}, function (err2, msg) {
                    if (err2) {
                        res.send({
                            status: 0,
                            msg: "失败",
                        })
                        return;
                    }

                    res.send({
                        status: 1,
                        msg: "成功",
                        data: msg
                    })

                })


            }


        } else {

            //没有收藏
            if (req.body.count > 0) {
                console.log("12122232")
                Model.update({_id: req.body.userId}, {
                    $push: {
                        shoppingCart: {
                            classId: req.body.classId,
                            goodsCount: req.body.count
                        }
                    }
                }, function (err2, msg) {
                    if (err2) {
                        res.send({
                            status: 0,
                            msg: "失败",
                        })
                        return;
                    }

                    res.send({
                        status: 1,
                        msg: "成功",
                        data: msg
                    })

                })
            } else {
                res.send({
                    status: 0,
                    msg: "失败",
                })
                return
            }


        }
    })


})
////////////////////////////////////////////////////////////地址/////////

var addressStr = [];

Router.post("/address", function (req, res) {
    if (!req.body.userId) {
        res.send({
            status: 0,
            msg: "失败",
        })
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        addressStr = docs[0].address
        console.log(addressStr)
        if (docs.length >= 1) {
            res.send({
                status: 1,
                msg: "查询成功",
                data: {address: docs[0].address}

            })
        } else {
            res.send({
                status: 0,
                msg: "错误"
            })
        }
    })
})
Router.post("/addressChange", function (req, res) {
    console.log(req.body.userId, req.body.receiveName, req.body.receivePhoneNumber, req.body.receiveIdCard, req.body.province, req.body.city, req.body.area, req.body.DetailedAddress, req.body.addressId)
    if (!req.body.userId || !req.body.receiveName || !req.body.receivePhoneNumber || !req.body.receiveIdCard || !req.body.province || !req.body.city || !req.body.area) {
        res.send({
            status: 0,
            msg: "请输入完整信息",
        })
        return;
    }

    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        if (req.body.addressId) {

            var can = false
            docs[0].address.map(function (value, index) {
                if (value.addressId == req.body.addressId) {

                    can = true
                }
            })
            if (!can) {
                res.send({
                    status: 0,
                    msg: "失败",
                })
                return;
            }
        }
        var allNumber = 0
        var collectStr = docs[0].address.map(function (value, index) {
            allNumber = value.addressId + 1
            console.log(index)
            return {
                addressId: value.addressId,
                //收货人姓名
                receiveName: value.receiveName,
                receivePhoneNumber: value.receivePhoneNumber,
                receiveIdCard: value.receiveIdCard,
                province: value.province,
                city: value.city,
                area: value.area,
                DetailedAddress: value.DetailedAddress,
                //默认
                default: value.default

            }

        })
        console.log(collectStr, allNumber, "222222222")


        //添加
        if (req.body.addressId) {
            //定向修改
            var collectStr2 = collectStr.map(function (value, index) {
                if (value.addressId == req.body.addressId) {

                    return {

                        addressId: value.addressId,
                        //收货人姓名
                        receiveName: req.body.receiveName,
                        receivePhoneNumber: req.body.receivePhoneNumber,
                        receiveIdCard: req.body.receiveIdCard,
                        province: req.body.province,
                        city: req.body.city,
                        area: req.body.area,
                        DetailedAddress: req.body.DetailedAddress,
                        //默认
                        default: value.default

                    }
                } else {
                    return value
                }
            })

            Model.update({_id: req.body.userId}, {address: collectStr2}, function (err2, msg) {
                if (err2) {
                    res.send({
                        status: 0,
                        msg: "失败",
                    })
                    return;
                }

                res.send({
                    status: 1,
                    msg: "成功",
                    data: msg
                })

            })

        } else {


            Model.update({_id: req.body.userId}, {
                $push: {
                    address: {
                        addressId: allNumber,
                        //收货人姓名
                        receiveName: req.body.receiveName,
                        receivePhoneNumber: req.body.receivePhoneNumber,
                        receiveIdCard: req.body.receiveIdCard,
                        province: req.body.province,
                        city: req.body.city,
                        area: req.body.area,
                        DetailedAddress: req.body.DetailedAddress,
                        //默认
                        default: false

                    }
                }
            }, function (err2, msg) {
                if (err2) {
                    res.send({
                        status: 0,
                        msg: "失败",
                    })
                    return;
                }

                res.send({
                    status: 1,
                    msg: "成功",
                    data: msg
                })

            })


        }


    })


})
Router.post("/addressDefault", function (req, res) {
    if (!req.body.userId || !req.body.addressId) {
        res.send({
            status: 0,
            msg: "请输入完整信息",
        })
        return;
    }

    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }

        var collectStr = docs[0].address.map(function (value, index) {
            delete value._id
            if (value.addressId == req.body.addressId) {

                value.default = true
            } else {
                value.default = false
            }

            return value
        })


        Model.update({_id: req.body.userId}, {address: collectStr}, function (err2, msg) {
            if (err2) {
                res.send({
                    status: 0,
                    msg: "失败",
                })
                return;
            }

            res.send({
                status: 1,
                msg: "成功",
                data: msg
            })

        })

    })


})
Router.post("/addressRemove", function (req, res) {
    if (!req.body.userId || !req.body.addressId) {
        res.send({
            status: 0,
            msg: "请输入完整信息",
        })
        return;
    }

    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        var can = false
        docs[0].address.map(function (value, index) {
            if (value.addressId == (req.body.addressId - 0)) {

                can = true
            }
        })

        if (!can) {
            res.send({
                status: 0,
                msg: "失败",
            })
            return;
        }

        var collectStr = docs[0].address.map(function (value, index) {
            return {
                addressId: value.addressId,
                //收货人姓名
                receiveName: value.receiveName,
                receivePhoneNumber: value.receivePhoneNumber,
                receiveIdCard: value.receiveIdCard,
                province: value.province,
                city: value.city,
                area: value.area,
                DetailedAddress: value.DetailedAddress,
                //默认
                default: value.default

            }
        })

        //定向删除
        var removeId = 0
        var collectStr2 = collectStr.map(function (value, index) {
            if (value.addressId !== (req.body.addressId - 0)) {
                console.log(value.addressId, req.body.addressId)
                return value
            } else {
                removeId = index
            }
        })
        collectStr2.splice(removeId, 1)

        Model.update({_id: req.body.userId}, {address: collectStr2}, function (err2, msg) {
            if (err2) {
                res.send({
                    status: 0,
                    msg: "失败",
                })
                return;
            }

            res.send({
                status: 1,
                msg: "成功",
                data: msg
            })

        })

    })


})
//////////////////////////订单
Router.post("/address", function (req, res) {
    if (!req.body.userId) {
        res.send({
            status: 0,
            msg: "失败",
        })
        return;
    }
    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        addressStr = docs[0].address
        console.log(addressStr)
        if (docs.length >= 1) {
            res.send({
                status: 1,
                msg: "查询成功",
                data: {address: docs[0].address}

            })
        } else {
            res.send({
                status: 0,
                msg: "错误"
            })
        }
    })
})


Router.post("/addressRemove", function (req, res) {
    if (!req.body.userId || !req.body.addressId) {
        res.send({
            status: 0,
            msg: "请输入完整信息",
        })
        return;
    }

    Model.find({_id: req.body.userId}, {}, function (err, docs) {
        if (err) {
            console.log(err);
            return;
        }
        var can = false
        docs[0].address.map(function (value, index) {
            if (value.addressId == (req.body.addressId - 0)) {

                can = true
            }
        })

        if (!can) {
            res.send({
                status: 0,
                msg: "失败",
            })
            return;
        }

        var collectStr = docs[0].address.map(function (value, index) {
            return {
                addressId: value.addressId,
                //收货人姓名
                receiveName: value.receiveName,
                receivePhoneNumber: value.receivePhoneNumber,
                receiveIdCard: value.receiveIdCard,
                province: value.province,
                city: value.city,
                area: value.area,
                DetailedAddress: value.DetailedAddress,
                //默认
                default: value.default

            }
        })

        //定向删除
        var removeId = 0
        var collectStr2 = collectStr.map(function (value, index) {
            if (value.addressId !== (req.body.addressId - 0)) {
                console.log(value.addressId, req.body.addressId)
                return value
            } else {
                removeId = index
            }
        })
        collectStr2.splice(removeId, 1)
        Model.update({_id: req.body.userId}, {address: collectStr2}, function (err2, msg) {
            if (err2) {
                res.send({
                    status: 0,
                    msg: "失败",
                })
                return;
            }

            res.send({
                status: 1,
                msg: "成功",
                data: msg
            })

        })

    })


})

Router.post("/orderChange", function (req, res) {
//[{classId: 3011, count: 5}, {classId: 8011, count: 6}]


       if(req.body.orderId||!req.body.state||!req.body.Detail||!req.body.totalMoney||!req.body.orderAddressId){
           res.send({
               status: 0,
               msg: "失败",
           })
           return;
       }




    var Detail =req.body.Detail
    console.log(3)
    if (req.body.orderId) {
        console.log(1)
        //修改

        Model.update({"order._id":req.body.orderId},{$set:{
            "order.$.state":req.body.state,
                "order.$.Detail":Detail
                ,"order.$.totalMoney":req.body.totalMoney
                ,"order.$.orderAddressId":req.body.orderAddressId
        }},function (err,docs) {
            if (err) {
                console.log(err)
            }
            res.send({
                status: 1,
                msg: "查询成功",
                data: docs

            })
        })


    } else {
        console.log(2)
        //添加

        Model.update({"_id": req.body.userId}, {
            $push: {
                order: {
                    state: req.body.state,
                    Detail: Detail,
                    totalMoney: req.body.totalMoney,
                    orderAddressId: req.body.orderAddressId
                }
            }
        }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            res.send({
                status: 1,
                msg: "查询成功",
                data: docs

            })

        })

    }
})
Router.post("/orderRemove", function (req, res) {

        Model.update({"_id":req.body.userId},{$pull:{"order":{"_id":req.body.orderId}}},function (err,docs) {
            if (err) {
                console.log(err)
            }
            res.send({
                status: 1,
                msg: "查询成功",
                data: docs

            })
        })


})



module.exports = Router;


