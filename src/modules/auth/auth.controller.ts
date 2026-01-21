import { Request, Response } from 'express';
import { AuthService } from './auth.service.ts';
import { ResponseBuilder } from '../../helper/response-builder/response-builder.ts';
import { RegisterValidator, LoginValidator } from './auth.validation.ts';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public register = async (req: Request, res: Response) => {
        try {
            const registerDto: RegisterValidator = req.body;
            const result = await this.authService.register(registerDto);
            return res.status(201).json(ResponseBuilder.success('User registered successfully', result));
        } catch (error: any) {
            return res.status(400).json(ResponseBuilder.error(error.message));
        }
    };

    public login = async (req: Request, res: Response) => {
        try {
            const loginDto: LoginValidator = req.body;
            const result = await this.authService.login(loginDto);
            return res.status(200).json(ResponseBuilder.success('Login successful', result));
        } catch (error: any) {
            return res.status(401).json(ResponseBuilder.error(error.message));
        }
    };
}
