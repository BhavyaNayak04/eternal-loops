import express from "express";
import {
  getAllCustomOrders,
  getCustomOrderById,
  addCustomOrder,
  updateCustomOrderStatus,
  getCustomOrdersByUserId,
  updatePrice,
  deleteCustomOrder,
} from "../controllers/customOrderController.js";

const router = express.Router();

router.get("/all", getAllCustomOrders);
router.get("/:orderId", getCustomOrderById);
router.post("/add", addCustomOrder);
router.put("/:orderId/status", updateCustomOrderStatus);
router.get("/user/:userId", getCustomOrdersByUserId);
router.put("/price/:orderId", updatePrice);
router.delete("/revoke/:orderId", deleteCustomOrder);
export default router;
