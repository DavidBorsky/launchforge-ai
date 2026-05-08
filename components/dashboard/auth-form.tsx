"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const registered = mode === "login" && searchParams.get("registered") === "1";
  const emailHint = searchParams.get("email");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || "")
    };

    if (mode === "signup") {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Unable to create account.");
        setLoading(false);
        return;
      }

      router.push(
        `/login?registered=1&email=${encodeURIComponent(payload.email)}`
      );
      router.refresh();
      return;
    }

    const result = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="text-3xl font-semibold text-slate-950">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        {mode === "login"
          ? "Log in to keep building and launching your projects."
          : "Start with a free account and generate your first startup launch kit."}
      </p>
      {registered ? (
        <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Account created successfully. Log in{emailHint ? ` with ${emailHint}` : ""} to continue.
        </p>
      ) : null}
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {mode === "signup" ? <Input name="name" placeholder="Your name" required /> : null}
        <Input name="email" type="email" placeholder="you@example.com" required />
        <Input
          name="password"
          type="password"
          placeholder={mode === "login" ? "Enter your password" : "Create a password"}
          required
        />
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <Button type="submit" className="w-full">
          {loading ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
        </Button>
      </form>
    </Card>
  );
}
