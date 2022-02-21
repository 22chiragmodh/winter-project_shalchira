const mongoose = require('mongoose');
//email validtation
const validator = require('validator');
//convert password to hashnumber
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter Your Name"],
        maxLength:[25,"Name cannot exceed 25 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"please Enter Valid Email "]
     },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"password should be at least 8 characters"],
        select:false      //user ki information find kare to password nhi dikhna chhiye
     },
     avatar:{
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required: true,
        }
     },
     role:{
         type:String,
         default:"user"
     },
     resetPasswordToken:String,
     resetPasswordExpired:Date,
});

//convert user password to hash number before schema save
userschema.pre("save",async function(next) {
    //check user are update profile as well as password or not 
    if(!this.isModified("password")) {
         next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

//JWT token for already registered users direct login
userschema.methods.getJWTToken=function(){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

//compare password
userschema.methods.comparePassword=async function(enterpassword){
        return await bcrypt.compare(enterpassword,this.password);
}

//reset password
userschema.methods.resetPassword=async function(){
    const resettoken=crypto.randomBytes(18).toString("hex");
    //hashing and add resetpassword to userschema
    this.resetPasswordToken=crypto.createHash("sha256").update(resettoken).digest("hex"); ////sha256 is algo for create hash
    this.resetPasswordExpired=Date.now()+10*60*1000;  //expire time
    return resettoken;
    //resettoken ko mail ke throgh bhejenge
}

const User=mongoose.model('User',userschema);
module.exports = User;
