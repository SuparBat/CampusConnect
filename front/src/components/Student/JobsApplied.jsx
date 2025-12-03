import React, { useState } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Trash2
} from 'lucide-react';

const JobsApplied = ({ appliedJobs = [], skippedJobs = [], onBrowseJobs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('applied');
  const [sortBy, setSortBy] = useState('recent');
  const [expandedJob, setExpandedJob] = useState(null);

  const statusConfig = {
    pending: {
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      label: 'Pending'
    },
    reviewing: {
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      label: 'Under Review'
    },
    accepted: {
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      label: 'Accepted'
    },
    rejected: {
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      label: 'Rejected'
    }
  };

  const allJobs = filterType === 'applied' ? appliedJobs : skippedJobs;

  const filteredJobs = allJobs
    .filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.company?.name || job.department).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || job.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        const dateA = new Date(a.appliedDate || a.skippedDate);
        const dateB = new Date(b.appliedDate || b.skippedDate);
        return dateB - dateA;
      } else if (sortBy === 'oldest') {
        const dateA = new Date(a.appliedDate || a.skippedDate);
        const dateB = new Date(b.appliedDate || b.skippedDate);
        return dateA - dateB;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const statusCounts = {
    all: appliedJobs.length,
    pending: appliedJobs.filter(j => j.status === 'pending').length,
    reviewing: appliedJobs.filter(j => j.status === 'reviewing').length,
    accepted: appliedJobs.filter(j => j.status === 'accepted').length,
    rejected: appliedJobs.filter(j => j.status === 'rejected').length,
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <button
              onClick={onBrowseJobs}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Job Search</span>
            </button>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">My Job Activity</h1>
            <p className="text-slate-600">Track your applications and skipped jobs</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex gap-3">
              {filterType === 'applied' && (
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-8 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="title">By Title</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => setFilterType('applied')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                filterType === 'applied'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Applied Jobs
              <span className="ml-2 text-sm">({appliedJobs.length})</span>
            </button>
            <button
              onClick={() => {
                setFilterType('skipped');
                setFilterStatus('all');
              }}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                filterType === 'skipped'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Skipped Jobs
              <span className="ml-2 text-sm">({skippedJobs.length})</span>
            </button>
          </div>

          {filterType === 'applied' && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
              {Object.entries(statusCounts).map(([status, count]) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {status === 'all' ? 'All' : statusConfig[status]?.label || status}
                  <span className="ml-2 text-sm">({count})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                {filterType === 'applied' ? (
                  <Briefcase size={40} className="text-slate-400" />
                ) : (
                  <Trash2 size={40} className="text-slate-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {allJobs.length === 0
                  ? filterType === 'applied'
                    ? 'No Applications Yet'
                    : 'No Skipped Jobs'
                  : 'No Results Found'}
              </h3>
              <p className="text-slate-600 mb-6 max-w-md">
                {allJobs.length === 0
                  ? filterType === 'applied'
                    ? "Start swiping right on jobs to see your applications here."
                    : "Jobs you skip will appear here for future reference."
                  : "Try adjusting your search or filter criteria."}
              </p>
              <button
                onClick={onBrowseJobs}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Browse Jobs
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const StatusIcon = statusConfig[job.status]?.icon || AlertCircle;
              const isExpanded = expandedJob === job._id;
              const isSkipped = filterType === 'skipped';

              return (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-600 mb-3">
                              <Building2 size={18} className="text-slate-400" />
                              <span className="font-semibold">{job.company?.name || job.department}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                            <MapPin size={18} className="text-blue-600 flex-shrink-0" />
                            <span className="text-sm font-medium">{job.location}</span>
                          </div>

                          {job.type && (
                            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                              <Clock size={18} className="text-blue-600 flex-shrink-0" />
                              <span className="text-sm font-medium">{job.type}</span>
                            </div>
                          )}

                          {job.salary && (
                            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                              <DollarSign size={18} className="text-green-600 flex-shrink-0" />
                              <span className="text-sm font-medium">{job.salary}</span>
                            </div>
                          )}

                          {job.experience && (
                            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                              <Award size={18} className="text-blue-600 flex-shrink-0" />
                              <span className="text-sm font-medium">{job.experience}</span>
                            </div>
                          )}

                          {job.department && (
                            <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                              <Briefcase size={18} className="text-blue-600 flex-shrink-0" />
                              <span className="text-sm font-medium">{job.department}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-slate-700 bg-slate-50 rounded-lg p-3">
                            <Calendar size={18} className="text-slate-400 flex-shrink-0" />
                            <span className="text-sm font-medium">
                              {formatDate(job.appliedDate || job.skippedDate)}
                            </span>
                          </div>
                        </div>

                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.slice(0, 6).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-200"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 6 && (
                              <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                                +{job.skills.length - 6} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex lg:flex-col gap-3 lg:min-w-[160px]">
                        {!isSkipped && (
                          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 ${statusConfig[job.status]?.bgColor} ${statusConfig[job.status]?.borderColor} flex-1 lg:flex-initial`}>
                            <StatusIcon size={20} className={statusConfig[job.status]?.color} />
                            <span className={`font-semibold text-sm ${statusConfig[job.status]?.color}`}>
                              {statusConfig[job.status]?.label || job.status}
                            </span>
                          </div>
                        )}
                        {isSkipped && (
                          <div className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 bg-red-50 border-red-200 flex-1 lg:flex-initial">
                            <XCircle size={20} className="text-red-600" />
                            <span className="font-semibold text-sm text-red-600">Skipped</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {(job.description || (job.requirements && job.requirements.length > 0)) && (
                      <button
                        onClick={() => setExpandedJob(isExpanded ? null : job._id)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Show Details'}</span>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    )}

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                        {job.description && (
                          <div>
                            <h4 className="font-bold text-slate-900 mb-2">Job Description</h4>
                            <p className="text-slate-700 text-sm leading-relaxed">{job.description}</p>
                          </div>
                        )}

                        {job.requirements && job.requirements.length > 0 && (
                          <div>
                            <h4 className="font-bold text-slate-900 mb-2">Requirements</h4>
                            <ul className="space-y-2">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                                  <span className="text-blue-600 mt-0.5">•</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredJobs.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredJobs.length}</span> of{' '}
              <span className="font-semibold text-slate-900">{allJobs.length}</span>{' '}
              {filterType === 'applied' ? 'applications' : 'skipped jobs'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsApplied;
