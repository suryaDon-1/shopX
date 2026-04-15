import asyncHandler from "../Utils/asyncHandler.js";
import * as authServices from '../Services/auth.service.js' // import all services at once from the authservices 
import { genToken } from "../Utils/genToken.js";

// controller for register the user 
 export const registerUser = asyncHandler(async(req,res,next)=>{ // wrap the register user in asynchandler so its error go dirtly to error middewrae 
    const register = await authServices.registerUserservice(req.body); 
    //send respone only logic is in services to make controller look clear
    res.status(201).json({
        success: true,
        message: "user Registerd Successfully !",
        data: register
    })
})

export const loginUser = asyncHandler(async(req,res,next)=>{
      //extract id from req.user if user is logged in 
  const id = req.user.id
    const login = await authServices.loginUserservice(req.body,id); //send the login credentials to the loginservics get from user 
    //if evet=ything goes well then user will be logged in 
    // and => final step genrate the token
   const token = await genToken(login);
  // save token in cookies
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict", // only valid for that site 
        secure: false, // true in production
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.status(200).json({
        message: "Login Succesful!",
        data: login,
        token
    })
})