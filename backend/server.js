const app=require('./app');

//uncauth error 
process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log("shutting down server due to uncaugthexpetion error");
    process.exit(1);
})
const dotenv = require("dotenv");
dotenv.config({path:"backend/config/config.env"});


const connectdatabase= require("./config/database");
connectdatabase(); //call fun

 const server =app.listen(process.env.PORT,()=>{
     console.log(`server is working on http://localhost:${process.env.PORT}`)
 })

 //unhandle promise rejections

 process.on("unhandledRejection",(err)=>{
     console.log(`Error:${err.message}`);
     console.log("shutting down server due to unhandledRejection error");
     server.close(()=>{
         process.exit(1);
     });
 });