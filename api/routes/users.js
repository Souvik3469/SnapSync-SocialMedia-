import express from "express";
import { getAllUsers, getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

// Get all users route
router.get("/", getAllUsers);

// Get a specific user by ID
router.get("/find/:userId", getUser);

// Update a user
router.put("/", updateUser);

export default router;
