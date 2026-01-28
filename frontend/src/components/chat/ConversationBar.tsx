import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Button } from "../ui/button";
import type { Dispatch, SetStateAction } from "react";
import { useUser } from "@/Context/UserContext";
import NoContent from "./NoContent";

interface ConversationUser {
  userId: number;
  username: string;
}

interface Conversation {
  conversationId: number;
  users: ConversationUser[];
}

type ConversationsResponse = Conversation[];

export interface ConversationBarProps {
  onAddConversation: Dispatch<SetStateAction<boolean>>;
  onSelectConversation: Dispatch<SetStateAction<number | null>>;
}

export default function ConversationBar({
  onAddConversation,
  onSelectConversation,
}: ConversationBarProps) {
  const { user } = useUser();
  const [conversations, setConversations] = useState<ConversationsResponse>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8000/api/v1/conversations/user/${user.id}`,
        );
        if (!res.ok) throw new Error("Network error");
        const data: ConversationsResponse = await res.json();
        setConversations(data);
      } catch (err) {
        console.error("Failed to fetch conversations", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user]);

  return (
    <div className="w-1/4 bg-gray-900 border-r border-gray-700 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Conversations</h2>
        <Button
          type="button"
          className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
          onClick={() => onAddConversation(true)}
        >
          + New Conversation
        </Button>
      </div>

      {loading && <p className="text-gray-400">Loading conversations...</p>}

      {!loading && (error || conversations.length === 0) ? (
        <NoContent />
      ) : (
        <ul className="space-y-2 overflow-y-auto flex-1">
          {conversations.map((conv) => {
            const otherUser = conv.users.find((u) => u.userId !== user?.id);
            return (
              <li key={conv.conversationId}>
                <UserCard
                  username={otherUser?.username ?? "Unknown"}
                  subtitle="no messages yet..."
                  onClick={() => onSelectConversation(conv.conversationId)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
