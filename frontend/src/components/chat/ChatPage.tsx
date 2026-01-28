import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/Context/UserContext";
import { useNavigate } from "react-router-dom";
import ConversationBar from "./ConversationBar";
import type ChatMessage from "@/interfaces/ChatMessage";
import ChatWindow from "./ChatWindow";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatMessages from "./ChatMessages";
import SendMessageField from "./SendMessageField";
import AddConversationModal from "../modal/AddConversationModal";
import NoContent from "./NoContent";

const ChatRoom = () => {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<
    number | null
  >(null);

  useEffect(() => {
    if (activeConversationId === null) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/conversations/messages/${activeConversationId}`,
        );
        const data: ChatMessage[] = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };
    fetchMessages();

    const socket = io("http://localhost:8000", {
      query: { roomId: activeConversationId.toString() },
    });

    socketRef.current = socket;

    socket.on("chatMessage", (msg: ChatMessage) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [activeConversationId]);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const sendMessage = () => {
    if (socketRef.current && input.trim() && activeConversationId && user?.id) {
      const msg = {
        conversationId: activeConversationId,
        userId: user.id,
        content: input,
      };
      socketRef.current.emit("chatMessage", msg);
      setInput("");
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <ConversationBar
        onAddConversation={setIsModalOpen}
        onSelectConversation={setActiveConversationId}
      />

      {activeConversationId === null ? (
        <NoContent />
      ) : (
        <ChatWindow>
          <ChatWindowHeader
            conversationName={`Conversation ${activeConversationId}`}
            handleLogout={handleLogout}
          />
          <ChatMessages messages={messages} />
          <SendMessageField
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
          />
        </ChatWindow>
      )}

      <AddConversationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ChatRoom;
