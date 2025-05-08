import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import newsLetterRoutes from "./routes/newsLetterRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import customOrderRoutes from "./routes/customOrderRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();
const port = 5000;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/newsletter", newsLetterRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/custom-orders", customOrderRoutes);
app.use("/api/user", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
