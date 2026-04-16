import * as productServices from "../Services/product.service.js";
import { uploadCloudnary } from "../Utils/cloudinaryUpload.js";
import asyncHandler from "../Utils/asyncHandler.js";
import cloudinary from "../config/cloudinary.js";
// add prdouct
export const addProduct = asyncHandler(async (req, res, next) => {
    // extraction of image in controler db logics in services 
  const id = req.user.id;
  const img = req.files; // for mutiple images files 
  //check for image
  if (!img) {
    const error = new Error("no image data get from req.file");
    error.statusCode = 400;
    throw error;
  }
  // upload all images 
 const imageData = await Promise.all(
  // use map to upload multiple images one by one 
  img.map(file => uploadCloudnary(file))
);
  const product = await productServices.addProductsServices(req.body, id, imageData);
  //send response
  res.status(201).json({
    success: true,
    message: "Product enterd success",
    data: product,
  });
});
//getAll products
export const getAllproducts = asyncHandler(async (req, res, next) => {
  // send query data like category ,price for filtering
  const prdoucts = await productServices.getAllproductsService(req.query);
  //send response
  res.status(200).json({
    success: true,
    message: "data Fetched Success",
    data: prdoucts,
  });
});
// getProductById
export const getProductById = asyncHandler(async (req, res, next) => {
  const productDetail = await productServices.getProductbyIdService(
    req.params.id,
  );
  res.status(200).json({
    success: true,
    message: "Product Details Fetched",
    data: productDetail,
  });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const update = await productServices.updateProductService(
    req.body,
    req.params.id,
  );
  res.status(204).json({
    success: true,
    message: "Product Updated Success",
    data: update,
  });
});
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const del = await productServices.deleteProductService(req.params.id);
  if(del.images && del.images.length > 0){
    await Promise.all(
      del.images.map((img)=>{
        return cloudinary.uploader.destroy(img.id)
      })
    )
  }
  res.status(204).json({
    success: true,
    message: "deleted success",
    data: del,
  });
});
