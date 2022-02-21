//create token and saving in cookie
const sendtoken=(user,statusCode,res)=>{
   
const token=user.getJWTToken();
//option for cokie
const options={
    httpOnly:true,
    expires:new Date(Date.now() +process.env.COOKIE_EXPIRATION *24 * 60 * 60 * 1000),
};

res.status(statusCode).cookie('token',token,options).json({ 
    success:true,
    user,
    token
});
};
module.exports = sendtoken;