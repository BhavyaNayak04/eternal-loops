import express from "express";
import {
  hasLikedProduct,
  getLikedProducts,
  getProductLikeCount,
  getTopLikedProducts,
} from "../controllers/likeController.js";

const router = express.Router();

router.get("/hasLiked/:userId/:productId", hasLikedProduct);
router.get("/user/:userId", getLikedProducts);
router.get("/count/:productId", getProductLikeCount);
router.get("/top", getTopLikedProducts);

export default router;