"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import FormHeader from "../ui/FormHeader";
import RegisterForm from "./RegisterForm";
import RegisterFields from "./RegisterFields";
import { Button } from "../ui/button";
import ErrorField from "../ui/ErrorField";
import LoginLink from "./LoginLink";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("http://localhost:8000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 201) {
        const data = await res.json();
        setSuccess(`User ${data.username} registered successfully!`);
        navigate("/login");
      } else {
        const err = await res.json().catch(() => ({}));
        setError(err.message || "Unexpected error occurred");
      }
    } catch (err) {
      setError("Network error" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <Card className="w-[400px] bg-gray-900 text-white border border-gray-700">
        <FormHeader title="Register" />
        <CardContent>
          <RegisterForm handleSubmit={handleSubmit}>
            <RegisterFields form={form} handleChange={handleChange} />
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
              disabled={loading}
            >
              Register
            </Button>
            <ErrorField error={error} />
            <LoginLink/>
          </RegisterForm>
        </CardContent>
      </Card>
    </div>
  );
}
