import React from "react";
import FormField from "../ui/FormField";

type LoginFieldsProps = {
  form: { email: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function LoginFields({ form, handleChange }: LoginFieldsProps) {
  return (
    <>
      <FormField
        id="email"
        name="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <FormField
        id="password"
        name="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />
    </>
  );
}
