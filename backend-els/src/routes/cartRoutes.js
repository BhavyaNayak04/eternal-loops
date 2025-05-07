import { Router } from "express";
import { count } from "../controllers/cartController.js";

const router = Router();

router.get("/count/:userId", count);

export default router;
