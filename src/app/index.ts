import express from "express";
import type { Application, Request, Response } from "express";
import { en } from "../helper/constants/en.ts";
import dotenv from "dotenv";
import { sequelize, testConnection } from "../config/dataBaseConfing.ts";
import router from "./route/route.ts"

dotenv.config();
const app: Application = express();

// middleware
app.use(express.json());

app.use("/", router);

await testConnection();

const PORT: number = Number(process.env.PORT) || 3300;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app; 