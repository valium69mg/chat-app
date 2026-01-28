import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type FormFieldProps = {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormField({
  id,
  name,
  type,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{name}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        className="bg-gray-800 text-white border-gray-600"
      />
    </div>
  );
}
