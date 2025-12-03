import React, { useState, useEffect } from "react";
import { Search, Filter, Trash2, Eye, Users, Building, Mail, MapPin, Calendar, MoreVertical, Edit, Ban } from "lucide-react";
import axios from "axios";

const UserCompanyList = ({ type }) => {
  const isStudents = type === "students";
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(isStudents ? "/api/admin/students" : "/api/admin/companies");
        setItems(res.data);
        setFilteredItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [type, isStudents]);

  const filterItems = (search, status) => {
    const filtered = items.filter(item => {
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || item.status === status;
      return matchesSearch && matchesStatus;
    });
    setFilteredItems(filtered);
  };

  const handleSearch = e => {
    const term = e.target.value;
    setSearchTerm(term);
    filterItems(term, statusFilter);
  };

  const handleStatusFilter = status => {
    setStatusFilter(status);
    filterItems(searchTerm, status);
  };

  const handleDelete = async id => {
    if (window.confirm(`Are you sure you want to delete this ${isStudents ? "student" : "company"}? This action cannot be undone.`)) {
      try {
        await axios.delete(isStudents ? `/api/admin/students/${id}` : `/api/admin/companies/${id}`);
        const updated = items.filter(item => item._id !== id);
        setItems(updated);
        filterItems(searchTerm, statusFilter);
        setActiveMenu(null);
      } catch (err) {
        console.error("Failed to delete:", err);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  const handleView = id => {
    console.log(`View details for ${id}`);
    setActiveMenu(null);
  };

  const handleEdit = id => {
    console.log(`Edit ${id}`);
    setActiveMenu(null);
  };

  const handleSuspend = async id => {
    if (window.confirm(`Are you sure you want to suspend this ${isStudents ? "student" : "company"}?`)) {
      console.log(`Suspend ${id}`);
      setActiveMenu(null);
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border border-green-200";
      case "inactive":
        return "bg-slate-100 text-slate-700 border border-slate-200";
      case "suspended":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  const toggleMenu = id => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    if (activeMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenu]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${isStudents ? "bg-blue-100" : "bg-green-100"}`}>
                  {isStudents ? (
                    <Users className="text-blue-600" size={24} />
                  ) : (
                    <Building className="text-green-600" size={24} />
                  )}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {isStudents ? "Student Management" : "Company Management"}
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    {filteredItems.length} {isStudents ? "students" : "companies"} found
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder={`Search by name or email...`}
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400
                           transition-all duration-200 bg-white"
                />
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-4 py-2">
                <Filter size={20} className="text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={e => handleStatusFilter(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-slate-700 font-medium cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-slate-600">Loading data...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  {isStudents ? (
                    <Users size={32} className="text-slate-400" />
                  ) : (
                    <Building size={32} className="text-slate-400" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No {isStudents ? "students" : "companies"} found
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search criteria or filters"
                    : `No ${isStudents ? "students" : "companies"} have registered yet`}
                </p>
              </div>
            ) : (
              <div className="flow-root">
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <div className="divide-y divide-slate-200">
                      {filteredItems.map(item => (
                        <div key={item._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-5 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                              {isStudents ? <Users size={20} className="text-slate-500" /> : <Building size={20} className="text-slate-500" />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
                              <p className="text-sm text-slate-500 truncate">{item.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 sm:gap-8 ml-14 sm:ml-0">
                            <div className="hidden md:block">
                              <p className="text-sm text-slate-900">{item.location || item.address || 'N/A'}</p>
                              <p className="text-xs text-slate-500">Location</p>
                            </div>

                            <div className="hidden lg:block">
                              <p className="text-sm text-slate-900">{new Date(item.createdAt).toLocaleDateString()}</p>
                              <p className="text-xs text-slate-500">Joined</p>
                            </div>

                            <div>
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status || "active")}`}>
                                {(item.status || "active")}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-14 sm:ml-0">
                            <button onClick={() => handleEdit(item._id)} className="text-slate-500 hover:text-blue-600 p-2 rounded-md hover:bg-slate-100 transition-colors">
                              <Edit size={16} />
                            </button>
                            <div className="relative">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMenu(item._id);
                                }}
                                className="p-2 hover:bg-slate-100 rounded-md transition-colors"
                              >
                                <MoreVertical size={16} className="text-slate-500" />
                              </button>
                              {activeMenu === item._id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg
                                              border border-slate-200 py-1 z-10">
                                  <button onClick={() => handleView(item._id)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                    <Eye size={14} /> View Details
                                  </button>
                                  <button onClick={() => handleSuspend(item._id)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                    <Ban size={14} /> Suspend Account
                                  </button>
                                  <div className="my-1 h-px bg-slate-100"></div>
                                  <button onClick={() => handleDelete(item._id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                    <Trash2 size={14} /> Delete Account
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCompanyList;
