import express from "express";
import cors from "cors";
import type { Application, Request, Response } from "express";
import { en } from "../helper/constants/en.ts";
import dotenv from "dotenv";
import { sequelize, testConnection } from "../config/dataBaseConfing.ts";
import router from "./route/route.ts";

dotenv.config();
const app: Application = express();

// middleware
app.use((req, res, next) => {
    console.log('Incoming Request:', req.method, req.url);
    console.log('Origin:', req.headers.origin);
    next();
});
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/", router);

const PORT: number = Number(process.env.PORT) || 3300;

testConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Failed to start server:", err);
});

export default app; 