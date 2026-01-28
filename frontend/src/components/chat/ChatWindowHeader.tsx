type ChatWindowHeaderProps = {
  conversationName: string;
  handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ChatWindowHeader({
  conversationName,
  handleLogout,
}: ChatWindowHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold"> {conversationName}</h2>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
