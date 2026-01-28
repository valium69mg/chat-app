import { HttpUtils } from "../utils/http.utils.js";
import {
  createConversation,
  listConversationsByUser,
  deleteConversationById,
  getMessages,
  sendMessage,
} from "../services/converstation.service.js";

async function handleCreateConversation(req, res) {
  try {
    const { userId1, userId2 } = req.body;
    const conversation = await createConversation(userId1, userId2);
    return HttpUtils.success(res, HttpUtils.OK_CODE, conversation);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

async function handleListConversationsByUser(req, res) {
  try {
    const { userId } = req.params;
    const conversations = await listConversationsByUser(userId);
    return HttpUtils.success(res, HttpUtils.OK_CODE, conversations);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

async function handleDeleteConversation(req, res) {
  try {
    const { conversationId } = req.params;
    const result = await deleteConversationById(conversationId);
    return HttpUtils.success(res, HttpUtils.OK_CODE, result);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

async function handleSendMessage(req, res) {
  try {
    const { conversationId, content, userId } = req.body;
    const result = await sendMessage(conversationId, content, userId);
    return HttpUtils.success(res, HttpUtils.OK_CODE, result);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

async function handleGetMessages(req, res) {
  try {
    const { conversationId } = req.params;
    const result = await getMessages(conversationId);
    return HttpUtils.success(res, HttpUtils.OK_CODE, result);
  } catch (error) {
    return HttpUtils.error(res, error);
  }
}

export {
  handleCreateConversation,
  handleListConversationsByUser,
  handleDeleteConversation,
  handleSendMessage,
  handleGetMessages,
};
