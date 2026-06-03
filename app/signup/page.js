"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import Link from 'next/link';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', formData);
      if (res.data.token) localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <form onSubmit={handleSignup} className="flex flex-col gap-4 p-6 border rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2 text-black">Teacher Signup</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input type="text" placeholder="Full Name" required className="p-2 border rounded text-black"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" placeholder="Email" required className="p-2 border rounded text-black"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" required className="p-2 border rounded text-black"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Sign Up</button>
        <Link href="/login" className="text-blue-500 text-sm text-center mt-2">Already have an account? Login</Link>
      </form>
    </div>
  );
}