import express,{type Request, type Response,type NextFunction } from "express";
import { en } from "../../helper/constants/en.ts";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: en.WELCOME_MESSAGE,
  });
});
router.get("/greet", (req: Request, res: Response ) => {
  res.json({ Greet: "Hello.........." });
});


export default router;