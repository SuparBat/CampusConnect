import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Building, Shield, Mail, Lock, Sparkles, CheckCircle2 } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    otp: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRequestOtp = async () => {
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        alert("✅ OTP sent to your email!");
        setOtpSent(true);
      } else {
        alert("❌ " + (data.message || "Failed to send OTP"));
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("❌ Failed to send OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    // OTP required for all roles
    if (!formData.otp) newErrors.otp = "OTP is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        alert("Server returned invalid response");
        setLoading(false);
        return;
      }

      setLoading(false);

      if (res.ok) {
        alert("🎉 Account created successfully! Please login.");
        navigate("/login");
      } else {
        alert("❌ " + (data.message || "Registration failed"));
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("❌ Failed to register");
    }
  };

  const getRoleInfo = (role) => {
    const info = {
      student: { icon: User, label: "Student", color: "from-blue-500 to-indigo-600", description: "Access learning resources" },
      company: { icon: Building, label: "Company", color: "from-emerald-500 to-teal-600", description: "Find top talent" },
      admin: { icon: Shield, label: "Admin", color: "from-purple-500 to-violet-600", description: "Manage platform" }
    };
    return info[role];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 transition-all duration-500 hover:shadow-3xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                Join Campus Connect
              </h2>
              <p className="text-gray-600 text-lg">Create your account and start connecting with opportunities</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Choose your role</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["student", "company", "admin"].map((role) => {
                    const roleInfo = getRoleInfo(role);
                    const IconComponent = roleInfo.icon;
                    const isSelected = formData.role === role;
                    
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setFormData({ ...formData, role })}
                        className={`group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          isSelected
                            ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-md bg-white"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${roleInfo.color} flex items-center justify-center mb-2 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <span className={`font-semibold text-sm ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                          {roleInfo.label}
                        </span>
                        <span className="text-xs text-gray-500 text-center mt-1">
                          {roleInfo.description}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="absolute -top-2 -right-2 w-6 h-6 text-blue-500 bg-white rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {formData.role === "company" ? "Company Name" : "Full Name"}
                </label>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                      errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder={`Enter ${formData.role === "company" ? "company" : "your full"} name`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email + OTP */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                        errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={loading}
                    className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : otpSent ? "Resend OTP" : "Get OTP"}
                  </button>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* OTP Field */}
              {otpSent && (
                <div className="space-y-2 animate-fade-in">
                  <label className="block text-sm font-semibold text-gray-700">Verification Code</label>
                  <div className="relative">
                    <input
                      name="otp"
                      type="text"
                      value={formData.otp}
                      onChange={handleChange}
                      className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm text-center text-lg font-mono tracking-widest ${
                        errors.otp ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                    />
                  </div>
                  {errors.otp && (
                    <p className="text-red-500 text-sm flex items-center mt-1">
                      <span className="w-4 h-4 mr-1">⚠️</span>
                      {errors.otp}
                    </p>
                  )}
                  <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded-lg">
                    📧 We've sent a verification code to your email address
                  </p>
                </div>
              )}

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                      errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 hover:border-gray-300"
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <span className="w-4 h-4 mr-1">⚠️</span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Create Account</span>
                  </div>
                )}
              </button>

              {/* Sign In Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-200 hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;