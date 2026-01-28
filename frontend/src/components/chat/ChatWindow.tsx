import type { ReactNode } from "react";

type ChatWindowProps = { children: ReactNode };

export default function ChatWindow({ children }: ChatWindowProps) {
  return <div className="flex-1 flex flex-col p-6">{children}</div>;
}
