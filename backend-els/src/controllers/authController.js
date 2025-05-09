import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import RefreshToken from "../models/RefreshToken.js";

export const register = async (req, res) => {
  const { name, email, contactNumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      contactNumber,
      password: hashedPassword,
    });

    await newUser.save();
    const newCart = await Cart.create({
      userId: newUser._id,
      items: [],
      totalPrice: 0,
    });

    await newCart.save();

    res.status(201).json({
      message: "User registered successfully!",
      userId: newUser._id,
      role: newUser.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const rf = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const existingRefreshToken = await RefreshToken.findOne({
      userId: user._id,
    });

    if (existingRefreshToken) {
      await RefreshToken.findByIdAndUpdate(existingRefreshToken._id, {
        token: rf,
      });
    } else {
      const newRefreshToken = new RefreshToken({ userId: user._id, token: rf });
      await newRefreshToken.save();
    }

    res.setHeader("Authorization", "Bearer " + token);
    res.cookie("refreshToken", rf, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      userId: user._id,
      role: user.role,
      message: "Login Successful!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token missing" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.setHeader("Authorization", "Bearer " + newAccessToken);
    console.log("New access token generated:", newAccessToken);
    res.status(200).json({ message: "Access token refreshed successfully" });
  } catch (err) {
    console.error("Refresh token died :(");
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }
};
