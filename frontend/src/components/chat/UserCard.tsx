import React from "react";

interface UserCardProps {
  profilePic?: string;
  username: string;
  subtitle: string;
  onClick?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({
  profilePic,
  username,
  subtitle,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 cursor-pointer border border-gray-700"
    >
      <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
        {profilePic ? (
          <img
            src={profilePic}
            alt={username}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            {username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="ml-3 flex flex-col">
        <span className="font-semibold text-sm">{username}</span>
        <span className="text-xs text-gray-400 truncate">{subtitle}</span>
      </div>
    </div>
  );
};

export default UserCard;
