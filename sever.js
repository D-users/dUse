const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:false}));
  var goodsRouter = require("./sever/goods");
  app.use("/goods",goodsRouter);

  var GoodsListRouter = require("./sever/goodsList");
   app.use("/goodsList",GoodsListRouter);
 var UserRouter = require("./sever/user");
 app.use("/user",UserRouter);
var GetCartRouter = require("./sever/getCart");
app.use("/get",GetCartRouter);


app.listen(8888);
