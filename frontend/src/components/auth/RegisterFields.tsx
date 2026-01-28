import React from "react";
import FormField from "../ui/FormField";

type RegisterFieldsProps = {
  form: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RegisterFields({
  form,
  handleChange,
}: RegisterFieldsProps) {
  return (
    <>
      <FormField
        id="username"
        name="Username"
        type="text"
        value={form.username}
        onChange={handleChange}
      />
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
      <FormField
        id="first_name"
        name="First Name"
        type="text"
        value={form.first_name}
        onChange={handleChange}
      />
      <FormField
        id="last_name"
        name="Last Name"
        type="text"
        value={form.last_name}
        onChange={handleChange}
      />
    </>
  );
}
