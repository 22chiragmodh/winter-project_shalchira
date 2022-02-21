const express = require('express');
const { getAllProducts , createProduct, updateProduct,deleteProduct,getProductdetail} = require('../controllers/productcontroller');
const { isauthenticated, autoriseRole } = require('../utils/authentication');
const router=express.Router();

//get read products route
router.route("/products").get(isauthenticated,getAllProducts,);
//post req create product route
router.route("/product/new").post(isauthenticated,autoriseRole("admin"),createProduct);
//put update product route & get product detail
router.route("/product/:id").put(isauthenticated,autoriseRole("admin"),updateProduct);
router.route("/product/:id").get(isauthenticated,getProductdetail);
//delete product route
router.route("/product/:id").delete(autoriseRole("admin"),deleteProduct);
module.exports =router;