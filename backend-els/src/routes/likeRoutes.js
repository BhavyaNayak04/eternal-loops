import express from "express";
import {
  hasLikedProduct,
  getLikedProducts,
  getProductLikeCount,
  getTopLikedProducts,
  toggleLike,
} from "../controllers/likeController.js";

const router = express.Router();

router.get("/hasLiked/:userId/:productId", hasLikedProduct);
router.get("/user/:userId", getLikedProducts);
router.get("/count/:productId", getProductLikeCount);
router.get("/top", getTopLikedProducts);
router.post("/toggleLike", toggleLike);

export default router;
