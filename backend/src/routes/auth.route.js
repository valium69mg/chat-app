import express from "express";
import { handleLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/login", handleLogin);

export default router;
