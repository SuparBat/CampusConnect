import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import StudentDashboard from './components/Student/StudentDashboard';
import CompanyDashboard from './components/Company/CompanyDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import Home from './pages/Home';
import JobSearch from './components/Student/JobSearch';
import JobsApplied from './components/Student/JobsApplied';
import UserCompanyList from './components/Admin/UserCompanyList';


function App() {
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // ✅ Load saved applied jobs from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('campusConnectUser');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.role) setUser(parsedUser);
      }

      const savedApplied = localStorage.getItem('appliedJobs');
      if (savedApplied) {
        setAppliedJobs(JSON.parse(savedApplied));
      }
    } catch (err) {
      console.warn('Failed to parse saved data:', err);
      localStorage.removeItem('campusConnectUser');
      localStorage.removeItem('appliedJobs');
    }
  }, []);

  // ✅ Persist appliedJobs to localStorage
  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('campusConnectUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('campusConnectUser');
    setAppliedJobs([]); // clear applied jobs on logout
    localStorage.removeItem('appliedJobs');
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to={`/${user.role}-dashboard`} replace />;
    }
    return children;
  };

  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: { style: { background: '#dcfce7', color: '#14532d' } },
          error: { style: { background: '#fee2e2', color: '#991b1b' } },
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home user={user} onLogout={handleLogout} />} />
          <Route
            path="/login"
            element={
              user ? <Navigate to={`/${user.role}-dashboard`} replace /> :
                <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to={`/${user.role}-dashboard`} replace /> :
                <Register onLogin={handleLogin} />
            }
          />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <CompanyDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* ✅ Student Job Routes */}
          <Route
            path="/jobs"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <JobSearch appliedJobs={appliedJobs} setAppliedJobs={setAppliedJobs} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs-applied"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <JobsApplied appliedJobs={appliedJobs} />
              </ProtectedRoute>
            }
 />
             <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserCompanyList type="students" />
              </ProtectedRoute>
            }
         
 />
          <Route
            path="/admin/companies"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserCompanyList type="companies" />
              </ProtectedRoute>
            }
          />



        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
