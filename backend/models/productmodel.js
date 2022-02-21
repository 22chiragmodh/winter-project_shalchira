const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"please Enter product Name"],
        trim:true,
    },
    description:{
        type:String,
        required: [true,"please Enter product Description"]
    },
    price:{
        type:Number,
        required: [true,"please Enter product Price"],
        maxLength:[6,"price cannot exceed 6 characters"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[{
        //images cloudnary pe host karne ke lie public id or url chahiye image ki
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required: true,
        }
    }],
    category:{
            type:String,
            required: [true,"please Enter product Category"],
    },
    stock:{
        type:Number,
        required: [true,"please Enter product Stock"],
        maxLength:[3,"stock cannot exceed 3 characters"],
        default:1
    },
    numOfReview:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            name:{
                type:String,
                required: true
            },
            rating:{
                type:Number,
                required: true
            },
            comment:{
                type:String,
                required: true
            }
        }
    ],
    createDate:{
               type:Date,
               default:Date.now
    },
    user:{
          type:mongoose.Schema.ObjectId,
          ref:"User",
          required: true
    }
});


const Product=mongoose.model('Product',productSchema);
module.exports=Product;