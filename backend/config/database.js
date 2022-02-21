const mongoose = require("mongoose");

//connect mongodb in fun or fun ko export karenge or import server.js me 
const connectdatabase=()=>{
    mongoose.connect(process.env.DB_U,{useNewUrlParser: true, useUnifiedTopology: true }).then((data)=>{
        console.log(`mongodb connected to server: ${data.connection.host}`);
    });
}
module.exports =connectdatabase;