import type ChatMessage from "@/interfaces/ChatMessage";

type ChatMessagesProps = {
  messages: ChatMessage[];
};

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 bg-gray-900 border border-gray-700 rounded p-4 overflow-y-scroll mb-4">
      {messages.length === 0 ? (
        <p className="text-gray-400 text-center">No messages yet...</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id ?? `${msg.userId}-${msg.content}`} className="mb-2">
            <strong className="text-green-400">{msg.userId}:</strong>{" "}
            <span>{msg.content}</span>
          </div>
        ))
      )}
    </div>
  );
}
