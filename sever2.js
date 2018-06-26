const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
var GetCartRouter = require("./sever/getCart");
app.use("/getCart",GetCartRouter);


app.listen(8889);
