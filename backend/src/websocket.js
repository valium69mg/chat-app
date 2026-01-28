import { Server } from "socket.io";
import http from "http";
import fetch from "node-fetch";

export function initSocket(app) {
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const roomId = socket.handshake.query.roomId?.toString();
    if (roomId) {
      socket.join(roomId);
      socket.roomId = roomId;
    }

    socket.on("chatMessage", async (msg) => {
      console.log("Mensaje recibido:", msg);

      const { userId, content } = msg || {};
      if (!content) return;

      await fetch("http://localhost:8000/api/v1/conversations/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: socket.roomId,
          userId,
          content,
        }),
      });

      io.to(socket.roomId).emit("chatMessage", {
        conversationId: socket.roomId,
        userId,
        content,
        createdAt: new Date().toISOString(),
      });
    });
  });

  return server;
}
