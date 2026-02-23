import express from 'express'
import { login, logout, register } from '../controller/authController.js';



const authRouter = express.Router();

authRouter.post("/login",login)
authRouter.post("/register",register)
authRouter.post("/logout",logout)



export default authRouter