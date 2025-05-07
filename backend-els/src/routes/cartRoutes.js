import { Router } from "express";
import { count, getCartProducts, clearCart, addToCart } from "../controllers/cartController.js";

const router = Router();

router.get("/count/:userId", count);
router.get("/", getCartProducts); // TODO
router.delete("/clear", clearCart); // TODO
router.post("/add/:userId", addToCart);
// router.delete("/remove/:productId", removeFromCart); // TODO (removeFromCart not defined uff)

export default router;
