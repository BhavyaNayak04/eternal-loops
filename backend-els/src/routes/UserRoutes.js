import express from "express";
import {
  getUserDetails,
  editUserProfile,
  logout,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId", getUserDetails);
router.put("/:userId", editUserProfile);
router.post("/logout", logout);

export default router;
