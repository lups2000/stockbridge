import {type Request, type Response, Router} from 'express';
import asyncHandler from "express-async-handler"
import { registerUser as registerUserService, loginUser as loginUserService} from "../services/authServices";
import {createLoginResponseDto, createRegisterResponseDto} from "../dto/authDtos";



/**
 * This method creates a new user and returns a JWT as a cookie   *
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the registration DTO including the user, and the token.
 */
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { user, token, options } = await registerUserService(req.body);
    res.status(201).cookie('jwtToken', token, options).json(createRegisterResponseDto('User registered successfully', user, token));
});

/**
 * This method logs in a user and returns a JWT as a cookie   *
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the login DTO including the token.
 */
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const {token, options } = await loginUserService(req.body.email, req.body.password);
    res.status(200).cookie('jwtToken', token, options).json(createLoginResponseDto('User logged in successfully', token))
});

export const authRouter = Router();

authRouter.route('/register')
    .post(registerUser);

authRouter.route('/login')
    .post(loginUser);