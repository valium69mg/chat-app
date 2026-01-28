import express from "express";
import {
  handleCreateConversation,
  handleListConversationsByUser,
  handleDeleteConversation,
  handleSendMessage,
  handleGetMessages,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/conversations", handleCreateConversation);
router.get("/conversations/user/:userId", handleListConversationsByUser);
router.delete("/conversations/:conversationId", handleDeleteConversation);
router.get("/conversations/messages/:conversationId", handleGetMessages);
router.post("/conversations/messages", handleSendMessage);

export default router;
