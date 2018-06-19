const express = require("express");
const app = express();


const bodyParser = require("body-parser");


app.use(bodyParser.json());
// var goodsRouter = require("./src/goods");
// app.use("/goods",goodsRouter);

var UserRouter = require("./sever/user");
app.use("/user",UserRouter);

app.listen(8888);
