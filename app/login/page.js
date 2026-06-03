"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      // If your API returns a token, store it:
      if (res.data.token) localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-6 border rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2 text-black">Teacher Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input type="email" placeholder="Email" required className="p-2 border rounded text-black"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="p-2 border rounded text-black"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
        <div className="flex justify-between text-sm mt-2">
          <Link href="/signup" className="text-blue-500">Create Account</Link>
          <Link href="/forgot-password" className="text-blue-500">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}