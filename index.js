import express from "express";
import errorMiddleware from "./api/Middeware/error.middeware.js";
import authRouter from "./api/Routes/auth.routes.js";
import cookieParser from "cookie-parser";
//import express from express to use to use express to create api send req,res 
const app = express();

// import some require middewares
app.use(express.json()); // this Middeware the res/data come from frontend put that into req.body avilable all over the app 
app.use(cookieParser());// this put cookie into req.cookies

//routes
app.use("/api/auth", authRouter)
//custom middeware 
app.use(errorMiddleware) // handels the errors show them 
//create an app just for test 
app.get("/", (req,res)=>{
    res.send("I am running")
})

// export the app to server for listen 
export default app;