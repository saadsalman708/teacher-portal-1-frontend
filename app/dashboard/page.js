"use client";

import { useState , useEffect } from "react";
import { useRouter }  from "next/navigation";
import api from "../../lib/api";

const DashboardPage = () => {
  const router = useRouter();
  const [user , setUser] = useState(null);
  const [loading , setLoading] = useState(true);

  useEffect(()=> {
    const verifySession = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.teacher);
        setLoading(false);
      } catch (error) {
        console.error("Session verification failed:" , error.response?.data?.message);
          router.push("/");
      }
    };
    verifySession();
  } , [router]);
if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl animate-pulse text-gray-400">Verifying secure session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-blue-400">
          Welcome back, Teacher {user?.name}! 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Secure Authorization Confirmed. You are logged in as <span className="text-gray-200 font-semibold">{user?.email}</span>.
        </p>
        
        <div className="mt-6 p-4 bg-gray-900 rounded-xl border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Account Diagnostics</h3>
          <p className="text-xs text-green-400 mt-1 font-mono">Status: Active & Approved</p>
          <p className="text-xs text-gray-500 font-mono">ID: {user?._id}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;