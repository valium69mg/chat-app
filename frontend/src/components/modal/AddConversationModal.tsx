import Modal from "./Modal";
import SearchBar from "./SearchBar";
import UserCard from "../chat/UserCard";
import { useState } from "react";

export default function AddConversationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { username: "Alice", subtitle: "Hey there!", profilePic: "" },
    { username: "Bob", subtitle: "Let's catch up soon", profilePic: "" },
    { username: "Charlie", subtitle: "Working on the project", profilePic: "" },
    { username: "Diana", subtitle: "Sent you an email", profilePic: "" },
    { username: "Eve", subtitle: "See you tomorrow", profilePic: "" },
  ];

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-96 w-100 bg-gray-900 text-white rounded-lg">
        <h1 className="p-2 text-gray-400"> Start a conversation </h1>
        <SearchBar onSearch={setSearchTerm} />

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredUsers.map((user, idx) => (
            <UserCard
              key={idx}
              username={user.username}
              subtitle={user.subtitle}
              profilePic={user.profilePic}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
}
