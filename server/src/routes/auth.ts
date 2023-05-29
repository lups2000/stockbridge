import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController";


export const authRouter = Router();

authRouter.route('/register')
    .post(registerUser);

authRouter.route('/login')
    .post(loginUser);

authRouter.route('/logout')
    .post(logoutUser);

export default authRouter;