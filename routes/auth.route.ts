import { RegisterUser } from "../controllers/authController";
import { Router } from "express";
const router = Router();

router.post("/register", RegisterUser);

export default router;
