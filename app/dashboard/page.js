"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const DashboardPage = () => {
  const router = useRouter();
  
  // Base States
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [form, setForm] = useState({ name: '', email: '', marks: '' });
  const [editingId, setEditingId] = useState(null);

  // Backend Pagination & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("_id");
  const [sortOrder, setSortOrder] = useState("desc");
  const limit = 5; // How many items per page you request from backend

  // 1. Fetch Data with Query Parameters
  const fetchData = async () => {
    try {
      // Build the query string for backend pagination and search
      // const queryParams = `?page=${currentPage}&limit=${limit}&search=${searchTerm}`;
      const queryParams = `?page=${currentPage}&limit=${limit}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      
      const [meRes, studentsRes] = await Promise.all([
        api.get("/auth/me"),
        api.get(`/students${queryParams}`)
      ]);
      
      setUser(meRes.data.teacher); 
      
      // Update these paths based on how your backend sends the paginated response
      setStudents(studentsRes.data.students || studentsRes.data.data || []);
      setTotalPages(studentsRes.data.totalPages || 1);
      
      setLoading(false);
    } catch (error) {
      console.error("Auth failed:", error);
      router.push("/login"); 
    }
  };

  // Re-fetch data whenever page or search changes
  useEffect(() => {
    // Reset to loading state if you want a spinner during page changes
    fetchData();
  }, [router, currentPage, searchTerm, sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      // If clicking the same field, toggle direction
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      // If clicking a new field, default to ascending
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset to page 1 when changing sorting
  };

  // Reset to page 1 when typing a new search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const logOut = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem('token');
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, marks: Number(form.marks) };

      if (editingId) {
        await api.put(`/student/update/${editingId}`, payload);
      } else {
        await api.post('/student/create', payload);
        setCurrentPage(1); // Go to first page to see the new student
      }
      
      setForm({ name: '', email: '', marks: '' });
      setEditingId(null);
      fetchData(); 
    } catch (error) {
      console.error("Operation failed:", error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setForm({ name: student.name, email: student.email, marks: student.marks });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/student/delete/${id}`);
      // If we delete the last item on the page, go back one page
      if (students.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchData(); 
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // UI: Loading State
  if (loading && students.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl animate-pulse text-gray-400">Verifying secure session...</p>
      </div>
    );
  }

  // UI: Main Dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Welcome back, Teacher {user?.name}! 👋</h1>
            <p className="text-gray-400 mt-2">Logged in as <span className="text-gray-200 font-semibold">{user?.email}</span>.</p>
          </div>
          <button onClick={logOut} className="mt-4 md:mt-0 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors shadow-md">
            Logout
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form Panel */}
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 h-fit">
            <h2 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">
              {editingId ? 'Edit Student Record' : 'Add New Student'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 uppercase mb-1 block">Full Name</label>
                <input type="text" required className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-blue-500"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase mb-1 block">Email Address</label>
                <input type="email" required className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-blue-500"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase mb-1 block">Marks (0-100)</label>
                <input type="number" min="0" max="100" required className="w-full p-2 bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-blue-500"
                  value={form.marks} onChange={(e) => setForm({ ...form, marks: e.target.value })} />
              </div>
              
              <div className="flex gap-2 mt-2">
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium">
                  {editingId ? 'Update Record' : 'Create Record'}
                </button>
                {editingId && (
                  <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', email: '', marks: '' }); }} className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded font-medium">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Directory Panel */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 border-b border-gray-700 pb-4">
              <h2 className="text-xl font-bold text-gray-200">Student Directory</h2>
              
              <div className="w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Search database..." 
                  className="w-full p-2 text-sm bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <select 
            value={`${sortBy}-${sortOrder}`} 
            onChange={(e) => {
              const [field, order] = e.target.value.split("-");
              setSortBy(field);
              setSortOrder(order);
              setCurrentPage(1);
            }}
            className="p-2 text-sm bg-gray-900 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="_id-desc">Newest First</option>
            <option value="name-asc">Name (A-Z) ↑</option>
            <option value="name-desc">Name (Z-A) ↓</option>
            <option value="marks-desc">Highest Marks ↑</option>
            <option value="marks-asc">Lowest Marks ↓</option>
            <option value="grade-asc">Grade (A-F) ↑</option>
            <option value="grade-desc">Grade (F-A) ↓</option>
          </select>
            </div>
            
            <div className="bg-gray-900 rounded-xl border border-gray-700 flex-1 overflow-hidden flex flex-col">
              {students.length === 0 ? (
                <div className="flex-1 flex items-center justify-center p-8 text-gray-500">
                  <p>No student records match your criteria.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-700 flex-1">
                  {students.map(student => (
                    <li key={student._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 hover:bg-gray-800/50 transition-colors">
                      <div className="mb-3 sm:mb-0">
                        <p className="font-semibold text-lg text-gray-200">{student.name}</p>
                        <p className="text-sm text-blue-400">{student.email}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="bg-gray-800 border border-gray-600 px-2 py-1 rounded text-gray-300 font-mono">
                            Marks: {student.marks}
                          </span>
                          <span className={`px-2 py-1 rounded font-bold ${
                            student.grade === 'A' ? 'bg-green-500/20 text-green-400' :
                            student.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                            student.grade === 'C' ? 'bg-yellow-500/20 text-yellow-400' :
                            student.grade === 'D' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            Grade: {student.grade || 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3 sm:mt-0">
                        <button onClick={() => handleEdit(student)} className="bg-gray-700 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm transition-colors">Edit</button>
                        <button onClick={() => handleDelete(student._id)} className="bg-gray-700 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm transition-colors">Delete</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {/* Server-Side Pagination Controls */}
              {totalPages > 1 && (
                <div className="bg-gray-800/50 border-t border-gray-700 p-4 flex justify-between items-center text-sm">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                    className="px-4 py-2 rounded bg-gray-700 text-gray-200 disabled:opacity-50 hover:bg-gray-600">Previous</button>
                  <span className="text-gray-400">Page <span className="font-semibold text-gray-200">{currentPage}</span> of {totalPages}</span>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded bg-gray-700 text-gray-200 disabled:opacity-50 hover:bg-gray-600">Next</button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;