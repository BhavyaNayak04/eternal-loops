import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStock,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct); // Add a new product
router.get("/all", getAllProducts); // Get all products
router.get("/get/:productId/:userId", getProductById); // Get a product by ID
router.put("/update/:id", updateProduct); // Update a product
router.delete("/delete/:id", deleteProduct); // Delete a product
router.get("/stock/:id", getProductStock); // Get a product by ID

export default router;
