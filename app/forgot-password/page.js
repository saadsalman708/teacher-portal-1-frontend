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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900">
      <form onSubmit={handleForgot} 
              className="flex flex-col gap-4 p-8 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-sm"
>
        <h2 className="text-2xl font-bold mb-2 text-white text-center">Forgot Password</h2>
        {message && <p className="text-sm text-white">{message}</p>}
        <input type="email" placeholder="Enter your email" required 
        className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" 
        className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 active:scale-[0.98] transition-all mt-2"
>Send Reset Link</button>
      </form>
    </div>
  );
}