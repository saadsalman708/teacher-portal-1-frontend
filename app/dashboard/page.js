"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios"; // Adjust this import path if your file is in lib/api.js

const DashboardPage = () => {
  const router = useRouter();
  
  // States
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form states for Student CRUD
  const [form, setForm] = useState({ name: '', age: '', grade: '' });
  const [editingId, setEditingId] = useState(null);

  // 1. Fetch Session & Students on mount
  const fetchData = async () => {
    try {
      const [meRes, studentsRes] = await Promise.all([
        api.get("/auth/me"),
        api.get("/students")
      ]);
      
      // Using .teacher based on your API structure
      setUser(meRes.data.teacher); 
      
      // Fallbacks in case your student array is nested differently
      setStudents(studentsRes.data.students || studentsRes.data.data || studentsRes.data || []);
      
      setLoading(false);
    } catch (error) {
      console.error("Session verification failed:", error.response?.data?.message);
      router.push("/login"); // Redirect to login on failure
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  // 2. Authentication Actions
  const logOut = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem('token'); // Clears local token if you are using them
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message);
    }
  };

  // 3. Student CRUD Actions
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/student/update/${editingId}`, form);
      } else {
        await api.post('/student/create', form);
      }
      // Reset form and refresh data
      setForm({ name: '', age: '', grade: '' });
      setEditingId(null);
      fetchData(); 
    } catch (error) {
      console.error("Operation failed:", error.response?.data?.message);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setForm({ name: student.name, age: student.age, grade: student.grade });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/student/delete/${id}`);
      fetchData(); // Refresh list after deletion
    } catch (error) {
      console.error("Delete failed:", error.response?.data?.message);
    }
  };

  // 4. Loading State UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl animate-pulse text-gray-400">Verifying secure session...</p>
      </div>
    );
  }

  // 5. Main Dashboard UI
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header / Account Diagnostics */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              Welcome back, Teacher {user?.name}! 👋
            </h1>
            <p className="text-gray-400 mt-2">
              Secure Authorization Confirmed. Logged in as <span className="text-gray-200 font-semibold">{user?.email}</span>.
            </p>
            <div className="mt-4 p-3 bg-gray-900 rounded-xl border border-gray-700 inline-block">
              <p className="text-xs text-green-400 font-mono mb-1">Status: Active & Approved</p>
              <p className="text-xs text-gray-500 font-mono">ID: {user?._id}</p>
            </div>
          </div>
          
          <button 
            onClick={logOut}
            className="mt-4 md:mt-0 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors duration-100 shadow-md"
          >
            Logout
          </button>
        </div>

        {/* CRUD Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form Panel */}
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
            <h2 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">
              {editingId ? 'Edit Student Record' : 'Add New Student'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Full Name</label>
                <input type="text" required className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-blue-500"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Age</label>
                <input type="number" required className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-blue-500"
                  value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Grade / Class</label>
                <input type="text" required className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-blue-500"
                  value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
              </div>
              
              <div className="flex gap-2 mt-2">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors font-medium">
                  {editingId ? 'Update Record' : 'Create Record'}
                </button>
                {editingId && (
                  <button type="button" 
                    onClick={() => { setEditingId(null); setForm({ name: '', age: '', grade: '' }); }} 
                    className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded transition-colors font-medium">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Directory Panel */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
            <h2 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">
              Student Directory
            </h2>
            
            <div className="bg-gray-900 rounded-xl border border-gray-700 min-h-[300px] overflow-hidden">
              {students.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-[300px] text-gray-500">
                  <p>No student records found in the database.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-700">
                  {students.map(student => (
                    <li key={student._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 hover:bg-gray-800/50 transition-colors">
                      <div className="mb-3 sm:mb-0">
                        <p className="font-semibold text-lg text-gray-200">{student.name}</p>
                        <div className="flex gap-4 mt-1 text-sm text-gray-400 font-mono">
                          <span>Age: {student.age}</span>
                          <span>Grade: {student.grade}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(student)} className="bg-gray-700 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm transition-colors">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(student._id)} className="bg-gray-700 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm transition-colors">
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;