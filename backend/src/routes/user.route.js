import express from "express";
import {
  handleGetUsers,
  handleCreateUsers,
  handleGetUserById,
  handleUpdateUser,
  handleReplaceUser,
  handleDeleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", handleGetUsers);
router.post("/users", handleCreateUsers);
router.get("/users/:id", handleGetUserById);
router.patch("/users/:id", handleUpdateUser);
router.put("/users/:id", handleReplaceUser);
router.delete("/users/:id", handleDeleteUser);

export default router;
