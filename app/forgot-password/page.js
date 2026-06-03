"use client";
import { useState } from 'react';
import api from '@/lib/axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/forgot-password', { email });
      setMessage('Password reset link sent to your email.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error sending request.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleForgot} className="flex flex-col gap-4 p-6 border rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
        {message && <p className="text-sm">{message}</p>}
        <input type="email" placeholder="Enter your email" required className="p-2 border rounded text-black"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Send Reset Link</button>
      </form>
    </div>
  );
}