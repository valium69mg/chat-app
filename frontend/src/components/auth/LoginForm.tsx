import React from "react";
import type { ReactNode } from "react";

type LoginFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: ReactNode; 
};

export default function LoginForm({ handleSubmit, children }: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
    </form>
  );
}
