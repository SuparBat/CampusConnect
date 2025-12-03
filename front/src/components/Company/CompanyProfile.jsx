import React, { useState, useEffect } from 'react';
import { CreditCard as Edit2, Save, X, Building2, Mail, Phone, Globe, MapPin, Calendar, Briefcase, Heart, Gift, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE = "http://localhost:5000/api/company";

const CompanyProfile = ({ companyId }) => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!companyId) {
        setError("No company linked to this user");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_BASE}/${companyId}/profile`);
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [companyId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleArrayChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean);
    setProfile({ ...profile, [field]: items });
    setSuccess(false);
  };

  const handleSave = async () => {
    if (!companyId) return;

    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      await axios.put(`${API_BASE}/${companyId}/profile`, profile);
      setIsEditing(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Profile</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12">
        <div className="text-center text-gray-600">
          <p>Profile not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
          <p className="text-green-800 font-medium">Profile updated successfully!</p>
        </div>
      )}

      {error && profile && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Building2 size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Company Profile</h2>
                <p className="text-green-100 text-sm mt-1">Manage your company information and branding</p>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium flex items-center gap-2 shadow-sm"
              >
                <Edit2 size={18} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2.5 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} />
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X size={18} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-green-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={profile.name || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter company name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" />
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={profile.email || ''}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" />
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={profile.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g., +1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Globe size={16} className="text-gray-400" />
                    Website
                  </label>
                  <input
                    name="website"
                    type="url"
                    value={profile.website || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://www.example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    value={profile.location || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g., San Francisco, CA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    Founded Year
                  </label>
                  <input
                    name="foundingYear"
                    type="text"
                    value={profile.foundingYear || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g., 2020"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Briefcase size={16} className="text-gray-400" />
                    Industry
                  </label>
                  <input
                    name="industry"
                    type="text"
                    value={profile.industry || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="e.g., Technology, Healthcare, Finance"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-600"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    name="description"
                    value={profile.description || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="Tell candidates about your company, mission, and what makes you unique..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-600 resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be displayed on your company page</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Heart size={20} className="text-green-600" />
                Company Culture
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Core Values
                  </label>
                  <input
                    type="text"
                    value={(profile.values || []).join(', ')}
                    onChange={(e) => handleArrayChange('values', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Innovation, Integrity, Collaboration"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple values with commas</p>
                  {profile.values && profile.values.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profile.values.map((value, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Gift size={16} className="text-gray-400" />
                    Employee Benefits
                  </label>
                  <input
                    type="text"
                    value={(profile.benefits || []).join(', ')}
                    onChange={(e) => handleArrayChange('benefits', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Health Insurance, Remote Work, 401k Matching"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-50 disabled:text-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple benefits with commas</p>
                  {profile.benefits && profile.benefits.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profile.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;