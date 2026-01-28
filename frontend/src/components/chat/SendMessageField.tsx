type SendMessageFieldProps = {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function SendMessageField({
  input,
  setInput,
  sendMessage,
}: SendMessageFieldProps) {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
      >
        Send
      </button>
    </div>
  );
}
