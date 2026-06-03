"use client";

import { useState } from "react";
import {useRouter} from "next/navigation";
import InputField from "../components/InputField";
import login from "../lib/auth.service";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      console.log("Login Successful!");
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      console.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Teacher Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <InputField
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField // leaving it as it is, so currently i can test it
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
