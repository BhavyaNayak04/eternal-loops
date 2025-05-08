import express from "express";
import {
  getUserDetails,
  editUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:userId", getUserDetails);
router.put("/:userId", editUserProfile);

export default router;
