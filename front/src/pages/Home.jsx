import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, GraduationCap, LogOut } from 'lucide-react';

const Home = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Campus Connect</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to={`/${user.role}-dashboard`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bridge the Gap Between
            <span className="text-blue-600"> Students & Companies</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Campus Connect provides a seamless platform for interaction, job applications, 
            and profile management, connecting talented students with innovative companies.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">For Students</h3>
            <p className="text-gray-600">
              Create your profile, showcase your skills, track applications, and connect with top companies.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">For Companies</h3>
            <p className="text-gray-600">
              Post job opportunities, manage applications, and find the perfect candidates for your team.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Users className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Admin Control</h3>
            <p className="text-gray-600">
              Comprehensive platform management with oversight of all users and companies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
