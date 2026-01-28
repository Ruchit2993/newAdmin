import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { ResponseBuilder } from '../response-builder/response-builder.ts';

const uploadDir = 'uploads/';

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'));
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

export const handleMultipartData = (fieldName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const uploadMiddleware = upload.single(fieldName);
        uploadMiddleware(req, res, (err: any) => {
            if (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(400).json(ResponseBuilder.error(`Multer Error: ${err.message}`));
                } else if (err) {
                    return res.status(400).json(ResponseBuilder.error(err.message));
                }
            }
            next();
        });
    };
};
