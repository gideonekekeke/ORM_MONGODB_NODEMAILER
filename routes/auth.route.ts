import {
	LoginUser,
	RegisterUser,
	VerifyUser,
} from "../controllers/authController";
import { Router } from "express";
import { LoginHandler, RegisterHandler } from "../utils/ZodSchema";
import { validate } from "../utils/validate";
const router = Router();

router.post("/register", validate(RegisterHandler), RegisterUser);
router.get("/verify/:tokenID", VerifyUser);
router.post("/login", validate(LoginHandler), LoginUser);

export default router;
