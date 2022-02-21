const express=require('express');
 
const app = express();
const bodyParser =require('body-parser');
const cookieParser =require('cookie-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
//route import
const ErrorMiddleware=require("./middleware/error");

const product=require("./routes/productRoute")
const user=require("./routes/userRoute")

app.use("/api/v1",product)
app.use("/api/v1",user)

//middleware --error
app.use(ErrorMiddleware);

module.exports=app;