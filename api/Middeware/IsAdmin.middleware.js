import asyncHandler from "../Utils/asyncHandler.js";

export const isAdmin = asyncHandler(async(req,res,next)=>{
   const role =  req.user.role ;
   //step 1 => check if user is login
   if(!role){
    const error = new Error("Plese login First");
    error.statusCode = 401;
    throw error;
   }
   //step 2 => chcek for the role 
   if(role !== "admin"){
    const error = new Error("UnAuthorized user can't have access");
    error.statusCode = 403;
    throw error;
   }
   next();
})