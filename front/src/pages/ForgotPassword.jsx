import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: Reset Password
  const [role, setRole] = useState("student"); // Default role
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  // API URLs based on role
  const otpUrlMap = {
    student: "http://localhost:5000/api/users/forgot-password",
    company: "http://localhost:5000/api/company/forgot-password",
    admin: "http://localhost:5000/api/admin/forgot-password",
  };

  const resetUrlMap = {
    student: "http://localhost:5000/api/users/reset-password",
    company: "http://localhost:5000/api/company/reset-password",
    admin: "http://localhost:5000/api/admin/reset-password",
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(otpUrlMap[role], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { 
        alert("Server returned invalid response"); 
        setLoading(false); 
        return; 
      }

      setLoading(false);
      if (res.ok) {
        alert("✅ OTP sent to your email!");
        setStep(2);
      } else {
        alert("❌ " + (data.message || "Failed to send OTP"));
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("❌ Failed to send OTP");
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.otp) newErrors.otp = "OTP is required";
    if (!formData.newPassword) newErrors.newPassword = "New password is required";
    if (formData.newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters";
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(resetUrlMap[role], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }),
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch {
        alert("Server returned invalid response");
        setLoading(false);
        return;
      }

      setLoading(false);
      if (res.ok) {
        alert("🎉 Password reset successfully! Please log in with your new password.");
        navigate("/login", { state: { role } });
      } else {
        alert("❌ " + (data.message || "Failed to reset password"));
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("❌ Failed to reset password");
    }
  };

  // Render Step 1: Email & Role selection
  const renderStep1 = () => (
    <form className="space-y-6" onSubmit={handleRequestOtp}>
      <div className="flex justify-center gap-3 mb-4">
        {["student", "company", "admin"].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`px-4 py-2 rounded-xl font-medium ${
              role === r ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm ${
              errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="Enter your registered email"
          />
        </div>
        {errors.email && <p className="text-red-500 text-sm mt-1">⚠️ {errors.email}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Reset Code"}
      </button>
    </form>
  );

  // Render Step 2: OTP & new password
  const renderStep2 = () => (
    <form className="space-y-6" onSubmit={handleResetPassword}>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">OTP Code</label>
        <input
          name="otp"
          type="text"
          maxLength={6}
          value={formData.otp}
          onChange={handleChange}
          className={`w-full text-center tracking-widest text-lg font-mono pl-4 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${
            errors.otp ? "border-red-300 focus:border-red-500" : "border-gray-200 hover:border-gray-300"
          }`}
          placeholder="Enter 6-digit OTP"
        />
        {errors.otp && <p className="text-red-500 text-sm mt-1">⚠️ {errors.otp}</p>}
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">New Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            name="newPassword"
            type={showPassword ? "text" : "password"}
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${
              errors.newPassword ? "border-red-300 focus:border-red-500" : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.newPassword && <p className="text-red-500 text-sm mt-1">⚠️ {errors.newPassword}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${
              errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">⚠️ {errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center mb-8">
          {[1, 2].map((n) => (
            <React.Fragment key={n}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= n ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step > n ? <CheckCircle2 className="w-4 h-4" /> : n}
              </div>
              {n < 2 && <div className={`w-8 h-1 ${step > n ? "bg-blue-500" : "bg-gray-200"}`}></div>}
            </React.Fragment>
          ))}
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}

        <div className="text-center pt-6 border-t border-gray-200 mt-6">
          <Link to="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
