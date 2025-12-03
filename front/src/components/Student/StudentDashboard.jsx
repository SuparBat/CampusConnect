import React, { useState } from 'react';
import { User, BookOpen, Award, FileText, Briefcase, LogOut, Search } from 'lucide-react';
import UserProfile from './UserProfile';
import Education from './Education';
import Certificates from './Certificates';
import Resume from './Resume';
import JobsApplied from './JobsApplied';
import JobSearch from './JobSearch';

const StudentDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  // Lift state for jobs to be shared between JobSearch and JobsApplied
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [skippedJobs, setSkippedJobs] = useState([]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'job-search', label: 'Job Search', icon: Search },
    { id: 'education', label: 'Education', icon: BookOpen },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'jobs', label: 'Jobs Applied', icon: Briefcase }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile user={user} />;
      case 'job-search':
        return <JobSearch appliedJobs={appliedJobs} setAppliedJobs={setAppliedJobs} skippedJobs={skippedJobs} setSkippedJobs={setSkippedJobs} />;
      case 'education':
        return <Education />;
      case 'certificates':
        return <Certificates />;
      case 'resume':
        return <Resume user={user} />;
      case 'jobs':
        return <JobsApplied appliedJobs={appliedJobs} skippedJobs={skippedJobs} onBrowseJobs={() => setActiveTab('job-search')} />;
      default:
        return <UserProfile user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-mint-green-50/50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-mint-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-mint-green-700">Campus Connect</h1>
              <span className="ml-4 text-gray-300">|</span>
              <span className="ml-4 text-gray-600">Student Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm">
              <nav className="space-y-1 p-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-mint-green-50 text-mint-green-700 border-r-4 border-mint-green-500 font-semibold'
                          : 'text-gray-600 hover:bg-mint-green-50/50 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={20} className={activeTab === tab.id ? 'text-mint-green-600' : ''} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
