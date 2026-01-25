import express, { type Request, type Response, type NextFunction } from "express";
import { en } from "../../helper/constants/en.ts";
import authRoutes from "../../modules/auth/auth.routes.ts";
import categoriesRoutes from "../../modules/categories/categories.routes.ts";
import productsRoutes from "../../modules/products/products.routes.ts";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: en.WELCOME_MESSAGE,
  });
});
router.get("/greet", (req: Request, res: Response) => {
  res.json({ Greet: "Hello.........." });
});


export default router;