
import React, { useState, useEffect } from 'react';
import { Users, Building, LogOut, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, companies: 0 });
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/admin/dashboard');
        const { studentsCount, companiesCount, students, companies } = response.data;
        setStats({ users: studentsCount, companies: companiesCount });
        setStudents(students);
        setCompanies(companies);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Manage Users',
      icon: <Users size={28} className="text-blue-600" />,
      iconBg: 'bg-blue-100',
      count: stats.users,
      path: '/admin/users',
    },
    {
      title: 'Manage Companies',
      icon: <Building size={28} className="text-green-600" />,
      iconBg: 'bg-green-100',
      count: stats.companies,
      path: '/admin/companies',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            {user?.name && <p className="text-slate-600 mt-1">Welcome back, {user.name}!</p>}
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-white text-slate-700 px-4 py-2 rounded-lg
                     border border-slate-300 hover:bg-slate-50 transition-colors mt-4 sm:mt-0
                     font-medium text-sm"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-slate-200 animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-slate-200"></div>
                    <div className="h-5 w-5 rounded bg-slate-200"></div>
                  </div>
                  <div className="h-8 w-1/2 rounded bg-slate-200 mb-2"></div>
                  <div className="h-6 w-1/3 rounded bg-slate-200"></div>
                </div>
              ))
            : cards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl shadow-sm p-6 group
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
                         border border-slate-200"
                onClick={() => navigate(card.path)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${card.iconBg}`}>{card.icon}</div>
                  <ArrowRight size={20} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">{card.title}</h2>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{card.count}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Students</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {students.map((student) => (
                    <tr key={student._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{student.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Companies</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {companies.map((company) => (
                    <tr key={company._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{company.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{company.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
