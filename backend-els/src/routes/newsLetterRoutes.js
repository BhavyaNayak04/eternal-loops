import { Router } from "express";
import { register, unsubsribe } from "../controllers/newsLetterController.js";

const router = Router();

router.post("/register", register);
router.delete("/unsubsribe", unsubsribe);

export default router;
