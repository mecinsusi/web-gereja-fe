"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { login } from "../../services/auth"; // <-- path pastikan sesuai

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token } = await login({ email, password });
      localStorage.setItem("access_token", token); // Simpan token ke localStorage
      router.push("/church"); // Arahkan user ke halaman utama setelah login
    } catch (err: any) {
      setError(err.message || "Login gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <h1 className="font-bold text-lg uppercase text-center">Login</h1>
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <div>
            <Label htmlFor="email1">Your email</Label>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password1">Your password</Label>
            <TextInput
              id="password1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" color="blue">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
