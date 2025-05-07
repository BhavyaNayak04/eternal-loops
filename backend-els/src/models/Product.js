import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  tag: { type: String, required: true },
  inStock: { type: Boolean, default: true },
  quantity: { type: Number, default: 1 },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
