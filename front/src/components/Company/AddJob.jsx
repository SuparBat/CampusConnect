import React, { useState, useEffect } from 'react';
import { Trash2, Eye, Plus, Briefcase, MapPin, Clock, DollarSign, Award } from 'lucide-react';
import axios from 'axios';

const API_BASE = "http://localhost:5000/api/company";

const AddJob = ({ companyId, onViewApplicants }) => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '', department: '', location: '', type: 'Full-time',
    salary: '', experience: 'Entry Level', description: '', requirements: '', skills: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchJobs = async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/${companyId}/jobs`);
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error fetching jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, [companyId]);

  const handleChange = (e) => setNewJob({ ...newJob, [e.target.name]: e.target.value });

  const handleAddJob = async () => {
    if (!companyId) return setError("Company ID is missing");
    setLoading(true); setError(''); setSuccess('');

    try {
      const payload = {
        ...newJob,
        requirements: newJob.requirements.split(',').map(r => r.trim()).filter(Boolean),
        skills: newJob.skills.split(',').map(s => s.trim()).filter(Boolean)
      };
      await axios.post(`${API_BASE}/${companyId}/jobs`, payload);
      setSuccess("Job added successfully!");
      setNewJob({
        title: '', department: '', location: '', type: 'Full-time',
        salary: '', experience: 'Entry Level', description: '', requirements: '', skills: ''
      });
      setShowForm(false);
      fetchJobs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding job');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    setLoading(true); setError('');
    try {
      await axios.delete(`${API_BASE}/jobs/${jobId}`);
      fetchJobs();
    } catch (err) {
      setError('Error deleting job');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Job Postings</h2>
            <p className="text-slate-600">Manage your company's job openings</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus size={20} />
            <span className="font-semibold">Post New Job</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        )}

        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Create New Job Posting</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title</label>
                <input
                  name="title"
                  placeholder="e.g. Senior Software Engineer"
                  value={newJob.title}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                <input
                  name="department"
                  placeholder="e.g. Engineering"
                  value={newJob.department}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                <input
                  name="location"
                  placeholder="e.g. San Francisco, CA"
                  value={newJob.location}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Employment Type</label>
                <select
                  name="type"
                  value={newJob.type}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Salary Range</label>
                <input
                  name="salary"
                  placeholder="e.g. $80,000 - $120,000"
                  value={newJob.salary}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Experience Level</label>
                <select
                  name="experience"
                  value={newJob.experience}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option>Entry Level</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Requirements</label>
                <input
                  name="requirements"
                  placeholder="Separate with commas, e.g. Bachelor's degree, 3+ years experience"
                  value={newJob.requirements}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Required Skills</label>
                <input
                  name="skills"
                  placeholder="Separate with commas, e.g. React, Node.js, TypeScript"
                  value={newJob.skills}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Job Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the role, responsibilities, and what makes your company great..."
                  value={newJob.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddJob}
                disabled={loading}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Add Job'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-8 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {loading && jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-slate-200 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        ) : jobs.length > 0 ? (
          jobs.map(job => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Briefcase size={16} className="text-slate-400" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} className="text-slate-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} className="text-slate-400" />
                          <span>{job.type}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-1.5">
                            <DollarSign size={16} className="text-slate-400" />
                            <span>{job.salary}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Award size={16} className="text-slate-400" />
                          <span>{job.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {job.description && (
                    <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                      {job.description}
                    </p>
                  )}

                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 5).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 5 && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                          +{job.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex lg:flex-col gap-3 lg:min-w-[140px]">
                  <button
                    onClick={() => onViewApplicants(job)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm flex-1 lg:flex-initial"
                  >
                    <Eye size={16} />
                    <span>View Applicants</span>
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job._id)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium text-sm flex-1 lg:flex-initial"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center border border-slate-200">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase size={32} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No jobs posted yet</h3>
              <p className="text-slate-600 mb-6">Start by creating your first job posting</p>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                <Plus size={20} />
                <span>Create Job Posting</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddJob;
