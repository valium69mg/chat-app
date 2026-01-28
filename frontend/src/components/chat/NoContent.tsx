import { FiInbox } from "react-icons/fi"; // Feather icon for empty state

export default function NoContent() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
      <div className="flex flex-col items-center bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-md">
        <FiInbox className="w-12 h-12 text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">No content</h2>
      </div>
    </div>
  );
}
