import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ResponseBuilder } from '../../helper/response-builder/response-builder.ts';
import { CONSTANTS } from '../../helper/constants/constants.ts';

export class CreateProductValidator {
    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Name') })
    @IsString({ message: CONSTANTS.VALIDATION.INVALID_FIELD_VALUE('Name') })
    name!: string;

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Price') })
    price!: number | string;

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Category ID') })
    category_id!: number | string;

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Image') })
    @IsString({ message: CONSTANTS.VALIDATION.INVALID_FIELD_VALUE('Image') })
    image!: string;

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Status') })
    @IsIn(['0', '1', 0, 1], { message: CONSTANTS.VALIDATION.INVALID_FIELD_VALUE('Status') })
    status!: string | number;

    constructor(data: any) {
        Object.assign(this, data);
    }
}

export class UpdateProductValidator {
    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Name') })
    @IsString({ message: CONSTANTS.VALIDATION.INVALID_FIELD_VALUE('Name') })
    name!: string;

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Price') })
    price!: number | string;

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Category ID') })
    category_id!: number | string;

    @IsString({ message: CONSTANTS.VALIDATION.INVALID_FIELD_VALUE('Image') })
    image?: string; // Optional on update

    @IsNotEmpty({ message: CONSTANTS.VALIDATION.FIELD_REQUIRED('Status') })
    @IsIn(['0', '1', 0, 1], { message: CONSTANTS.VALIDATION.INVALID_FIELD_VALUE('Status') })
    status!: string | number;

    constructor(data: any) {
        Object.assign(this, data);
    }
}

export const validateDto = (ValidatorClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Inject image from req.file into req.body for validation
            if (req.file) {
                req.body.image = req.file.path.replace(/\\/g, '/');
            }

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
