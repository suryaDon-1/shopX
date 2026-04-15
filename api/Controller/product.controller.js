import * as productServices from '../Services/product.service.js'
import asyncHandler from '../Utils/asyncHandler.js'
export const addProduct = asyncHandler(async(req,res,next)=>{
    const product = await productServices.addProductsServices(req.body);
    //send response
    res.status(200).json({
        success:true,
        message: "Product enterd success",
        data: product
    }) 
})