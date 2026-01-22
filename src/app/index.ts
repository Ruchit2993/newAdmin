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
app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:4300'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));
app.use(express.json());

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