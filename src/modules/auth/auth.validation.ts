// import { Model } from 'sequelize';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ResponseBuilder } from '../../helper/response-builder/response-builder.ts';
import { CONSTANTS } from '../../helper/constants/constants.ts';
import { UserInterface } from '../../interfaces/index.ts';

export interface RegisterInterface extends UserInterface {
    confirmPassword: string;
}

export class RegisterValidator implements RegisterInterface {
    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Email') })
    @IsEmail({}, { message: CONSTANTS.VALIDATION.INVALID_EMAIL })
    email!: string;

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Password') })
    @IsString({ message: CONSTANTS.VALIDATION.INVALID_FIELD_VALUE('Password') })
    @MinLength(6, { message: CONSTANTS.VALIDATION.PASSWORD_MIN_LENGTH(6) })
    password!: string;

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Confirm Password') })
    @IsString({ message: CONSTANTS.VALIDATION.INVALID_FIELD_VALUE('Confirm Password') })
    confirmPassword!: string;

    constructor(data: RegisterInterface) {
        Object.assign(this, data);
    }
}

export class LoginValidator implements UserInterface {
    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Email') })
    @IsEmail({}, { message: CONSTANTS.VALIDATION.INVALID_EMAIL })
    email!: string;

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Password') })
    @IsString({ message: CONSTANTS.VALIDATION.INVALID_FIELD_VALUE('Password') })
    password!: string;

    constructor(data: UserInterface) {
        Object.assign(this, data);
    }
}

export const validateDto = (ValidatorClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json(ResponseBuilder.error('Request body is missing or empty'));
            }
            const validatorInstance = new ValidatorClass(req.body);
            const errors = await validate(validatorInstance);

            if (errors.length > 0) {
                const errorMessage = errors
                    .map((error) => Object.values(error.constraints || {}).join(', '))
                    .join('; ');
                return res.status(400).json(ResponseBuilder.error(errorMessage));
            }

            req.body = validatorInstance;
            next();
        } catch (error: any) {
            return res.status(500).json(ResponseBuilder.error('Internal server error during validation'));
        }
    };
};
