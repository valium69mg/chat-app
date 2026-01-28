import React from "react";
import type { ReactNode } from "react";

type RegisterFormProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export default function RegisterForm({
  handleSubmit,
  children,
}: RegisterFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
    </form>
  );
}
