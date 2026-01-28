import express from "express";
import { handleHealth } from "../controllers/health.controller.js";

const router = express.Router();

router.get("/health", handleHealth);

export default router;