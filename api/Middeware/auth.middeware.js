import jwt from 'jsonwebtoken';
import asyncHandler from '../Utils/asyncHandler.js';

 export const protect = asyncHandler(async(req,res,next)=>{
    const token = req.cookies.token; // get token from req.cookies.token => .token is the name given to the function
    if(!token){
        // if token not found then throw 404 user not login error 
        const error = new Error("Token Not Found...Please Login");
        error.statusCode = 401;
        throw error;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //this verifies the token
    if(!decoded){
        //if not match then semd invalid token 
        const error = new Error("Not a valid Token Unauthorized");
        error.statusCode = 401;
        throw error
    }
    req.user = decoded;
    next();
 })