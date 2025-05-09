import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import newsLetterRoutes from "./routes/newsLetterRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import customOrderRoutes from "./routes/customOrderRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import verifyJWT from "./middleware/authenticate.js";

dotenv.config();

const app = express();
const port = 5000;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const publicRoutes = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh-token",
  "/user/logout",
  "/api/likes/top",
  "/api/newsLetter",
];

app.use((req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  verifyJWT(req, res, next);
});

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

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
