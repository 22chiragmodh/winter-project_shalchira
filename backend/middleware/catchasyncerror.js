//in product name is required but admin can not write name when post req 
module.exports = fun=>(req, res,next) => {
    Promise.resolve(fun(req,res,next)).catch(next);

};