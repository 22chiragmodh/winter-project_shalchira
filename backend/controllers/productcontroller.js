const Product = require("../models/productmodel");
const ErrorHander = require("../utils/errorhandler");
const catchasyncerror = require("../middleware/catchasyncerror");
const apifuture=require("../utils/apifuture_pagination");


//create product--Admin route

exports.createProduct =catchasyncerror(async(req,res,next) => {
    req.body.user=req.user.id;

    const product =await Product.create(req.body)
    res.status(201).json({ 
        success: true,
        product,
    })
})

//GET All Product
exports.getAllProducts=catchasyncerror(async(req,res) =>{
    //ek page pe kitne product hone chahiye--paginations
  const resultpages=4;
  const productcount=await Product.countDocuments();

    //apiproduct future
    const Apifuture=new apifuture(Product.find(),req.query).search().filter().pagination(resultpages);
    const products=await Apifuture.query;
    res.status(200).json({
        success: true,
        products,
        productcount
    });
});

//get single product detail

exports.getProductdetail=catchasyncerror(async(req,res,next) =>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("product not found",404)); //next callback fun
    } 

    res.status(200).json({
        success: true,
          product
        })
});


//update Product

exports.updateProduct= catchasyncerror(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found",404)); //next callback fun
    } 
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
        
    });
        res.status(200).json({
            success: true,
              product
            })
});

//delete product
exports.deleteProduct=catchasyncerror(async(req,res,next) =>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHander("product not found",404)); //next callback fun
    } 
    await product.remove();

    res.status(200).json({success: true, message:"product deleted successfully"})
});

