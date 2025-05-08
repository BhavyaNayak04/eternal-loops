import express from "express";
import {
  getAllCustomOrders,
  getCustomOrderById,
  addCustomOrder,
  updateCustomOrderStatus,
} from "../controllers/customOrderController.js";

const router = express.Router();


router.get("/all", getAllCustomOrders);
router.get("/:orderId", getCustomOrderById);
router.post("/add", addCustomOrder);
router.put("/:orderId/status", updateCustomOrderStatus);

export default router;