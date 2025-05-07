import e from "express";
import NewsLetter from "../models/NewsLetter.js";

export const register = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existingUser = await NewsLetter.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already subscribed!" });
    }
    const newUser = new NewsLetter({ email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error in newsletter registration:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const unsubsribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const existingUser = await NewsLetter.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found!" });
    }
    await existingUser.deleteOne();
    res.status(200).json({ message: "User unsubscribed successfully!" });
  } catch (err) {
    console.error("Error in newsletter unsubscription:", err);
    res.status(500).json({ message: "Server error" });
  }
};
