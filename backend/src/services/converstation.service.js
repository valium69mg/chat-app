import { getConnection, pool } from "../config/db.js";
import { HttpError } from "../utils/http.utils.js";
import { HttpUtils } from "../utils/http.utils.js";

async function createConversation(userId1, userId2) {
  const client = await getConnection();
  try {
    const createConversationQuery =
      "INSERT INTO conversations DEFAULT VALUES RETURNING id;";
    const createConversationRes = await client.query(createConversationQuery);
    const conversationId = createConversationRes.rows[0].id;
    const createConversationUsersQuery =
      "INSERT INTO conversation_users (user_id, conversation_id) VALUES ($1, $2), ($3, $4)";
    await client.query(createConversationUsersQuery, [
      userId1,
      conversationId,
      userId2,
      conversationId,
    ]);
    return { users: [userId1, userId2], conversationId: conversationId };
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function listConversationsByUser(userId) {
  const client = await getConnection();
  try {
    const query = `
      SELECT c.id AS "conversationId", u.id AS "userId", u.username AS username
      FROM conversations c
      JOIN conversation_users cu ON c.id = cu.conversation_id
      JOIN users u ON cu.user_id = u.id
      WHERE c.id IN (
        SELECT conversation_id FROM conversation_users WHERE user_id = $1
      )
    `;
    const res = await client.query(query, [userId]);

    if (res.rowCount === 0) {
      return [];
    }

    const conversationsMap = {};
    res.rows.forEach((row) => {
      if (!conversationsMap[row.conversationId]) {
        conversationsMap[row.conversationId] = {
          conversationId: row.conversationId,
          users: [],
        };
      }
      conversationsMap[row.conversationId].users.push({
        userId: row.userId,
        username: row.username,
      });
    });

    return Object.values(conversationsMap);
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function deleteConversationById(conversationId) {
  const client = await getConnection();
  try {
    const deleteMessagesQuery =
      "DELETE FROM messages WHERE conversation_id = $1";
    await client.query(deleteMessagesQuery, [conversationId]);

    const deleteLinksQuery = `
      DELETE FROM conversation_users
      WHERE conversation_id = $1
    `;
    await client.query(deleteLinksQuery, [conversationId]);

    const deleteConversationQuery = `
      DELETE FROM conversations
      WHERE id = $1
    `;
    const res = await client.query(deleteConversationQuery, [conversationId]);

    if (res.rowCount === 0) {
      return { success: false, message: "Conversation not found" };
    }

    return { success: true, message: "Conversation deleted successfully" };
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function sendMessage(conversationId, content, userId) {
  const client = await getConnection();
  try {
    const query =
      "INSERT INTO messages (body, conversation_id, user_id) VALUES ($1, $2, $3) RETURNING id;";
    const res = await client.query(query, [content, conversationId, userId]);
    return { id: res.rows[0].id };
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

async function getMessages(conversationId) {
  const client = await getConnection();
  try {
    const query =
      "SELECT id, body, conversation_id, user_id, created_at FROM messages WHERE conversation_id = $1";
    const res = await client.query(query, [conversationId]);
    if (res.rowCount === 0) {
      return [];
    }
    return res.rows.map((element) => {
      return {
        id: element.id,
        conversationId: element.conversation_id,
        userId: element.user_id,
        createdAt: element.created_at,
        content: element.body,
      };
    });
  } catch (error) {
    throw new HttpError(
      error.message,
      error.status ? error.status : HttpUtils.INTERNAL_SERVER_ERROR_CODE,
    );
  } finally {
    client.release();
  }
}

export {
  createConversation,
  listConversationsByUser,
  deleteConversationById,
  sendMessage,
  getMessages,
};
