import { createContext, useContext } from "react";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
