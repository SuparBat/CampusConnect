import React, { useState, useEffect } from 'react';
import { Building, Plus, Users, LogOut } from 'lucide-react';
import CompanyProfile from './CompanyProfile';
import AddJob from './AddJob';
import ViewApplicants from './ViewApplicants';
import axios from 'axios';

const CompanyDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [viewingApplicantsFor, setViewingApplicantsFor] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);

  const companyId = user._id; // Use the MongoDB _id directly

  useEffect(() => {
    const fetchProfile = async () => {
      if (!companyId) return;
      try {
        const { data } = await axios.get(`http://localhost:5000/api/company/${companyId}/profile`);
        setCompanyProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err.response || err);
      }
    };
    fetchProfile();
  }, [companyId]);

  const handleViewApplicants = (job) => {
    setViewingApplicantsFor(job);
    setActiveTab('applications');
  };

  const handleBackToJobs = () => {
    setViewingApplicantsFor(null);
    setActiveTab('jobs');
  };

  const tabs = [
    { id: 'profile', label: 'Company Profile', icon: Building },
    { id: 'jobs', label: 'Job Postings', icon: Plus },
    { id: 'applications', label: 'Applications', icon: Users }
  ];

  const renderContent = () => {
    if (!companyProfile) return <p>Loading company profile...</p>;

    if (viewingApplicantsFor) {
      return <ViewApplicants job={viewingApplicantsFor} onBack={handleBackToJobs} />;
    }

    switch (activeTab) {
      case 'profile':
        return <CompanyProfile companyId={companyProfile._id} />;
      case 'jobs':
        return <AddJob companyId={companyProfile._id} onViewApplicants={handleViewApplicants} />;
      case 'applications':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
            <p className="text-gray-600">Select a job from the 'Job Postings' tab to view its applications.</p>
          </div>
        );
      default:
        return <CompanyProfile companyId={companyProfile._id} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-700">Campus Connect</h1>
              <span className="ml-4 text-gray-600">Company Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button onClick={onLogout} className="flex items-center gap-1 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm">
            <nav className="space-y-1 p-4">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); if (viewingApplicantsFor) setViewingApplicantsFor(null); }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === tab.id && !viewingApplicantsFor ? 'bg-green-50 text-green-700 font-semibold border-r-4 border-green-500' : 'text-gray-600 hover:bg-green-50/50 hover:text-gray-900'}`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
