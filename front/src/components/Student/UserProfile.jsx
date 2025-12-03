import React, { useState } from "react";
import { CreditCard as Edit2, Save, X, User, Mail, Phone, MapPin, Calendar, Linkedin, Github, Briefcase, Award, Link as LinkIcon } from "lucide-react";

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    dateOfBirth: user?.dateOfBirth || "",
    bio:
      user?.bio ||
      "Passionate computer science student with a keen interest in web development and artificial intelligence.",
    skills: user?.skills || ["JavaScript", "React", "Python", "Java", "SQL"],
    linkedin: user?.linkedin || "",
    github: user?.github || "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setProfile({ ...profile, skills });
  };

  const handleSave = () => {
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfile({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      dateOfBirth: user?.dateOfBirth || "",
      bio: user?.bio || "",
      skills: user?.skills || [],
      linkedin: user?.linkedin || "",
      github: user?.github || "",
    });
  };

  const InfoField = ({
    icon,
    label,
    value,
    name,
    onChange,
    type = "text",
    isLink = false,
  }) => (
    <div className="group">
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
        <span className="text-slate-500">{icon}</span>
        <span>{label}</span>
      </label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   transition-all duration-200 bg-white text-slate-900"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      ) : (
        <>
          {isLink && value ? (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 break-all inline-flex items-center gap-1
                       hover:underline transition-colors"
            >
              <LinkIcon size={14} />
              {value}
            </a>
          ) : (
            <p className="text-slate-900 font-medium">{value || "Not provided"}</p>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 px-6 sm:px-8 py-8 sm:py-12">
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-lg
                                flex items-center justify-center border-4 border-white">
                    <User size={40} className="text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {profile.name || "Your Name"}
                    </h1>
                    <p className="text-blue-100 flex items-center gap-2">
                      <Mail size={16} />
                      {profile.email || "your.email@example.com"}
                    </p>
                  </div>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600
                             rounded-lg hover:bg-blue-50 transition-all duration-200
                             shadow-md hover:shadow-lg font-semibold active:scale-95"
                  >
                    <Edit2 size={18} />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white
                               rounded-lg hover:bg-green-700 transition-all duration-200
                               shadow-md hover:shadow-lg font-semibold active:scale-95"
                    >
                      <Save size={18} />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700
                               rounded-lg hover:bg-slate-100 transition-all duration-200
                               shadow-md hover:shadow-lg font-semibold active:scale-95"
                    >
                      <X size={18} />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Briefcase size={20} className="text-blue-600" />
                  Basic Information
                </h3>
                <div className="space-y-5">
                  <InfoField
                    icon={<User size={16} />}
                    label="Full Name"
                    value={profile.name}
                    name="name"
                    onChange={handleChange}
                  />
                  <InfoField
                    icon={<Phone size={16} />}
                    label="Phone"
                    value={profile.phone}
                    name="phone"
                    type="tel"
                    onChange={handleChange}
                  />
                  <InfoField
                    icon={<MapPin size={16} />}
                    label="Location"
                    value={profile.location}
                    name="location"
                    onChange={handleChange}
                  />
                  <InfoField
                    icon={<Calendar size={16} />}
                    label="Date of Birth"
                    value={
                      isEditing
                        ? profile.dateOfBirth
                        : profile.dateOfBirth
                        ? new Date(profile.dateOfBirth).toLocaleDateString()
                        : "Not provided"
                    }
                    name="dateOfBirth"
                    type="date"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <LinkIcon size={20} className="text-blue-600" />
                  Social Links
                </h3>
                <div className="space-y-5">
                  <InfoField
                    icon={<Linkedin size={16} />}
                    label="LinkedIn"
                    value={profile.linkedin}
                    name="linkedin"
                    type="url"
                    onChange={handleChange}
                    isLink={true}
                  />
                  <InfoField
                    icon={<Github size={16} />}
                    label="GitHub"
                    value={profile.github}
                    name="github"
                    type="url"
                    onChange={handleChange}
                    isLink={true}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <User size={20} className="text-blue-600" />
                  About Me
                </h3>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                             transition-all duration-200 bg-white text-slate-900 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-slate-700 leading-relaxed">
                    {profile.bio || "No bio provided yet."}
                  </p>
                )}
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Award size={20} className="text-blue-600" />
                  Skills & Expertise
                </h3>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      value={profile.skills.join(", ")}
                      onChange={handleSkillsChange}
                      placeholder="Enter skills separated by commas (e.g., JavaScript, React, Python)"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                               transition-all duration-200 bg-white text-slate-900"
                    />
                    <p className="text-sm text-slate-600 mt-2">
                      Separate skills with commas
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills && profile.skills.length > 0 ? (
                      profile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-600
                                   text-white rounded-lg text-sm font-semibold
                                   shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-slate-600">No skills added yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
