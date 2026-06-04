"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      // If your API returns a token, store it:
      if (res.data.token) localStorage.setItem("token", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-8 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-2 text-white text-center">
          Teacher Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center bg-red-400/10 p-2 rounded-lg border border-red-400/20">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 active:scale-[0.98] transition-all mt-2"
        >
          Login
        </button>

        <div className="flex justify-between text-sm mt-2">
          <Link
            href="/signup"
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Create Account
          </Link>
          <Link
            href="/forgot-password"
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
