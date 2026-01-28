import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import conversationRoutes from "./routes/conversation.route.js";
const app = express();
const API_BASE_PATH = "/api/v1";

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use("/", healthRoutes);
app.use(API_BASE_PATH, userRoutes);
app.use(API_BASE_PATH, authRoutes);
app.use(API_BASE_PATH, conversationRoutes);
export default app;
