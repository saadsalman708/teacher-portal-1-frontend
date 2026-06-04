"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useParams(); // Retrieves the [token] from the URL

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/auth/reset-password/${params.token}`, { password });
      setMessage("Password reset successfully. Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid or expired token.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <form
        onSubmit={handleReset}
        className="flex flex-col gap-4 p-8 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-2 text-white">Set New Password</h2>
        {message && <p className="text-sm text-white">{message}</p>}
        <input
          type="password"
          placeholder="New Password"
          required
          className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 active:scale-[0.98] transition-all mt-2"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};