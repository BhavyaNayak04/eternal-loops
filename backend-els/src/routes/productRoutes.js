import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct); // Add a new product
router.get("/all", getAllProducts); // Get all products
router.get("/get/:id", getProductById); // Get a product by ID
router.put("/update/:id", updateProduct); // Update a product
router.delete("/delete/:id", deleteProduct); // Delete a product

export default router;
