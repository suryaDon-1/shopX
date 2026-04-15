import express from "express";
import { loginUser, registerUser } from "../Controller/auth.controller.js";
// Router functio use to crete routes 
const authRouter = express.Router();
// use post methord to send the data 
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser)
export default authRouter // export router to use in index.js to crate final api 