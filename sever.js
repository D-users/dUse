const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:false}));
// var goodsRouter = require("./src/goods");
// app.use("/goods",goodsRouter);

  var GoodsListRouter = require("./sever/goodsList1");
   app.use("/goodsList",GoodsListRouter);
 var UserRouter = require("./sever/user");
 app.use("/user",UserRouter);

app.listen(8888);
