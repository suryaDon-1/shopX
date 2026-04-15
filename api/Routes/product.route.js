import express from "express";
import { protect } from "../Middeware/auth.middeware.js";
import { isAdmin } from "../Middeware/IsAdmin.middleware.js";
import { addProduct } from "../Controller/product.controller.js";
const productRouter = express.Router();
// add product 
productRouter.post("/add",protect, isAdmin, addProduct)
export default productRouter;