const catchasyncerror = require("../middleware/catchasyncerror");
const User = require("../models/usermodel");
const jwt = require('jsonwebtoken');
const Errorhander = require("./errorhandler");

//isauthenticated SE PATA CHALEGA USER LOGIN HAI KI NHI
//jo user login matlab authenticate hoga vhi getproduct dekh skta ha
exports.isauthenticated = catchasyncerror(async(req,res,next)=>{
    const {token}=req.cookies;
  if(!token){
      return next(new Errorhander("please login to access this resource",401));
  }

  const decodedata=jwt.verify(token,process.env.JWT_SECRET)
       req.user=await User.findById(decodedata.id)
        next();
});

exports.autoriseRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhander(
                `Role:${req.user.role} is not allowed this resource`,403
            ));
        }
        next();
    };
};
