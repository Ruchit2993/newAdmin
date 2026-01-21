import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../user/user.model.ts';
import { RegisterValidator, LoginValidator } from './auth.validation.ts';

export class AuthService {
    private readonly saltRounds = 10;
    private readonly jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    private readonly jwtExpiresIn = '1d';

    public async register(registerDto: RegisterValidator): Promise<{ id: number; email: string }> {
        const { email, password, confirmPassword } = registerDto;

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, this.saltRounds);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        return { id: user.id as number, email: user.email };
    }

    public async login(loginDto: LoginValidator): Promise<{ user: { id: number; email: string }; token: string }> {
        const { email, password } = loginDto;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            this.jwtSecret,
            { expiresIn: this.jwtExpiresIn }
        );

        return {
            user: { id: user.id as number, email: user.email },
            token,
        };
    }
}
