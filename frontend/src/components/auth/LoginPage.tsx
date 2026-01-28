"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@/Context/UserContext";
import { useNavigate } from "react-router-dom";
import FormHeader from "@/components/ui/FormHeader";
import { getErrorMessage } from "@/utils/Error";
import LoginForm from "./LoginForm";
import LoginFields from "./LoginFields";
import { Button } from "../ui/button";
import ErrorField from "../ui/ErrorField";
import RegisterLink from "./RegisterLink";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUser(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.status === 200) {
        const data = await res.json();
        setUser(data);
        navigate("/chat");
      } else {
        const err = await res.json().catch(() => ({}));
        setError(err.message || "Unexpected error occurred");
      }
    } catch (err) {
      setError("Error: " + getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <Card className="w-[400px] bg-gray-900 text-white border border-gray-700">
        <FormHeader title="Login" />
        <CardContent>
          <LoginForm handleSubmit={handleSubmit}>
            <LoginFields form={form} handleChange={handleChange} />
            <ErrorField error={error} />
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-gray-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <RegisterLink/>
          </LoginForm>
        </CardContent>
      </Card>
    </div>
  );
}
