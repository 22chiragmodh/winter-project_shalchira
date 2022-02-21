const User = require("../models/usermodel");
const ErrorHander = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");
const sendtoken = require("../utils/jwtToken");


//Register User

exports.registerUser = catchasyncerror(async(req,res,next)=>{
    const {name, email, password}=req.body;

    const user=await User.create({
        name,password,email,
        avatar:{
            public_id:"this is a sample id",
            url:"profilephpto"

    }
});

// const token=user.getJWTToken();

// res.status(201).json({
//     success: true,
//     token,
// });
sendtoken(user,201,res);

});

//login user

exports.loginUser= catchasyncerror(async(req,res,next)=>{
    const{email,password}=req.body;

    if(!email || !password){
        return next(new ErrorHander("please Enter emial & password",400));
    }

    const user=await User.findOne({email}).select("+password");
    
    if(!user){
        return next(new ErrorHander("Invalid email or password",401));
    }

    const ispasswordmatched=user.comparePassword(password);

    if(! ispasswordmatched){
        return next(new ErrorHander("Invalid email or password",401));
    
    }


// const token=user.getJWTToken();

// res.status(201).json({
//     success: true,
//     token,
// })
sendtoken(user,200,res);
});



//logout user 

exports.logoutuser = catchasyncerror (async (req, res,next) =>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })


    res.status(200).json({success:true,
    message:"Logged out"});

} );

//forgot password

exports.forgotpassword = catchasyncerror (async (req, res,next) =>{
    const{email}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return next(new ErrorHander("user not found",404));
    }

    const resettoken=user.resetPassword();

    await user.save({validateBefore: false}); //save user

    //craete email link for reset password

    const resetpasswordurl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resettoken}`;
    const message =`your password reset token is : \n\n ${resetpasswordurl}`;


    //for error run try catch block 

   try {
         await sendMail({
              
            email:user.email,
            subject:`Shalchira cloth shoping password Recovery`,
            message,
         });

         res.status(200).json({
             success: true,
             message:`email sent to ${user.email} successfully`,

         });


   }catch(error){
       user.resetPasswordToken=undefined;
       user.resetPasswordExpired=undefined;

       await user.save({validateBefore: false});

       return next(new ErrorHander(error.message,500));
   }
})
