import { Router } from "express";
import {
  count,
  getCartProducts,
  clearCart,
  addToCart,
  updateQuantity,
  removeFromCart,
} from "../controllers/cartController.js";

const router = Router();

router.get("/count/:userId", count);
router.get("/:userId", getCartProducts);
router.delete("/clear/:userId", clearCart);
router.post("/add/:userId", addToCart);
router.put("/update/:userId", updateQuantity);
router.delete("/remove/:userId/:productId", removeFromCart);

export default router;
