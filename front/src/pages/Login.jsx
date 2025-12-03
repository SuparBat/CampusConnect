import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Building, Shield, ArrowRight, Sparkles } from "lucide-react";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const roleConfig = {
    student: { 
      icon: <User size={20} />, 
      label: "Student", 
      color: "bg-emerald-500",
      gradient: "from-emerald-50 to-emerald-100"
    },
    company: { 
      icon: <Building size={20} />, 
      label: "Company", 
      color: "bg-blue-500",
      gradient: "from-blue-50 to-blue-100"
    },
    admin: { 
      icon: <Shield size={20} />, 
      label: "Admin", 
      color: "bg-purple-500",
      gradient: "from-purple-50 to-purple-100"
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users/login", {
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
        if (!data.user || !data.user.role) {
          alert("Login failed: user role is missing.");
          return;
        }

        onLogin(data.user);
        localStorage.setItem("campusConnectUser", JSON.stringify(data.user));
        navigate(`/${data.user.role}-dashboard`);
      } else {
        alert("❌ " + (data.message || "Login failed"));
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("❌ Failed to login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8">
          {/* Logo Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Campus Connect</h1>
            <p className="text-lg text-gray-600 font-medium">Your gateway to opportunities</p>
          </div>

          {/* Main Login Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 shadow-xl rounded-2xl transform rotate-1"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Choose your role and sign in to continue</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(roleConfig).map(([role, config]) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setFormData({ ...formData, role })}
                        className={`group relative overflow-hidden flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          formData.role === role
                            ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-lg"
                            : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className={`p-2 rounded-lg mb-2 transition-colors ${
                          formData.role === role ? config.color : "bg-gray-100 group-hover:bg-gray-200"
                        } ${formData.role === role ? "text-white" : "text-gray-600"}`}>
                          {config.icon}
                        </div>
                        <span className="text-sm font-medium">{config.label}</span>
                        {formData.role === role && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-xl"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField("")}
                      className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl transition-all duration-300 placeholder-gray-400
                        ${errors.email 
                          ? "border-red-400 bg-red-50 focus:border-red-500 focus:bg-white" 
                          : focusedField === "email"
                          ? "border-blue-500 bg-white shadow-lg shadow-blue-500/10"
                          : "border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:bg-white"
                        }
                      `}
                      placeholder="Enter your email address"
                    />
                    <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
                      focusedField === "email" ? "opacity-100 shadow-lg shadow-blue-500/20" : "opacity-0"
                    }`}></div>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      className={`w-full px-4 py-3 pr-12 bg-gray-50 border-2 rounded-xl transition-all duration-300 placeholder-gray-400
                        ${errors.password 
                          ? "border-red-400 bg-red-50 focus:border-red-500 focus:bg-white" 
                          : focusedField === "password"
                          ? "border-blue-500 bg-white shadow-lg shadow-blue-500/10"
                          : "border-gray-200 hover:border-gray-300 focus:border-blue-400 focus:bg-white"
                        }
                      `}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Footer Links */}
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <Link 
                        to="/register" 
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
                      >
                        Create Account
                      </Link>
                    </p>
                  </div>
                  <div className="text-center">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2025 Campus Connect. Connecting students with opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;