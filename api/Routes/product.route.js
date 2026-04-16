import express from "express";
import { protect } from "../Middeware/auth.middeware.js";
import { isAdmin } from "../Middeware/IsAdmin.middleware.js";
import { addProduct, deleteProduct, getAllproducts, getProductById, updateProduct } from "../Controller/product.controller.js";
import uplaod from "../Middeware/multer.js";
const productRouter = express.Router();
// add product 
productRouter.post("/add",protect, isAdmin,uplaod.array("images", 3), addProduct);
// get all products 
productRouter.get("/get",getAllproducts);
//get product details 
productRouter.get("/get/:id", getProductById);
// updaye product
productRouter.put("/update/:id", protect, isAdmin, uplaod.array("images", 3), updateProduct);
//delete product 
productRouter.delete("/delete/:id", protect,isAdmin, deleteProduct);
export default productRouter;