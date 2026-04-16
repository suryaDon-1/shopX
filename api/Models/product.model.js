import mongoose, { disconnect } from "mongoose";
import Auth from "./auth.model.js";
const productSchema = new mongoose.Schema({
    title:{
        //name of the product
        type:String,
        required: true,
        trim:true,
    },
    description:{
        //description about the product
        type:String,
        required: true
    },
    price:{
        // actual price 
        type: Number,
        required:true,
    },
    discountprice:{
        //discount Price
        type: Number,
        required: true,
    },
    images:[
        // images are multiple so store in array
        {
            url:String,
            id:String,
            // sttring type besz we store url from the cloudrnary 
        }
    ],
    category:{
        type:String,
        requied: true
    },
    brand:{
        type:String,
        requied: true
    },
    stock:{
        // stock 
        type:String,
        required: [true, "stock is required"] // extra validation
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
    }
},{timestamps:true})
const Product = mongoose.model("Product", productSchema);
export default Product;