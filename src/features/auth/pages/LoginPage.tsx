import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

type UserRole = "admin" | "doctor" | "patient" | "lab" | "nurse" | "hospital";

const roles = [
  { key: "doctor", label: "Doctor & Clinic", icon: "👨‍⚕️" },
  { key: "patient", label: "Patient", icon: "🧑‍🦽" },
  { key: "nurse", label: "Nurse", icon: "👩‍⚕️" },
  { key: "hospital", label: "Hospital", icon: "🏥" },
  { key: "lab", label: "Lab", icon: "🧪" },
  { key: "vendor", label: "Vendor", icon: "🧪" },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        mobile,
        password,
      });

      const userRole: UserRole = res.data.role;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", userRole);

      switch (userRole) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "patient":
          navigate("/patient/dashboard");
          break;
        case "lab":
          navigate("/lab/dashboard");
          break;
        case "nurse":
          navigate("/nurse/dashboard");
          break;
        case "hospital":
          navigate("/hospital/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-blue-50 via-white to-indigo-50 transition-all duration-300 ${showSignup ? "blur-[2px] brightness-75" : ""}`}
      >
        {/* ================= LEFT IMAGE ================= */}
        <div className="hidden lg:block relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/30 via-purple-500/50 to-blue-600/90 z-10" />
          <img
            src="/signin.jpg"
            alt="Medical AI"
            className="h-full w-full object-cover transform scale-110 animate-subtle-zoom"
          />

          {/* Floating Elements */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white px-8 max-w-lg space-y-6">
              <div className="animate-fade-in-down">
                <h1 className="text-5xl font-bold mb-4 drop-shadow-2xl">
                  Welcome Back
                </h1>
                <p className="text-xl text-white/90 leading-relaxed drop-shadow-lg">
                  Access your medical dashboard and continue providing
                  exceptional healthcare services
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="flex justify-center gap-4 mt-8 animate-fade-in-up">
                <div className="w-20 h-1 bg-white/60 rounded-full" />
                <div className="w-20 h-1 bg-white/40 rounded-full" />
                <div className="w-20 h-1 bg-white/20 rounded-full" />
              </div>
            </div>
          </div>

          {/* Animated Background Shapes */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse-slow z-20" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000 z-20" />
        </div>

        {/* ================= RIGHT LOGIN FORM ================= */}
        <div className="flex items-center justify-center px-6 py-0 relative">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-30 -z-10 animate-blob" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-30 -z-10 animate-blob animation-delay-2000" />

          <div className="w-full max-w-md">
            {/* Logo with Animation */}
            <div className="mb-8 flex justify-center animate-fade-in-down">
              <img
                src="/dacdiag-logo.png"
                alt="Dacdiag"
                className="h-12 hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Heading with Animation */}
            <div className="mb-8 animate-fade-in-down animation-delay-200">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Sign In Account
              </h2>
            </div>

            {/* Error Message with Animation */}
            {error && (
              <div className="mb-6 animate-shake">
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-3 shadow-sm">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Form with Staggered Animation */}
            <form
              onSubmit={handleLogin}
              className="space-y-5 animate-fade-in-up animation-delay-400"
            >
              {/* Mobile Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                  Mobile number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="eg. +91 8438298692"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm outline-none 
                             transition-all duration-300 
                             focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 
                             hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-indigo-600">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-gray-50 border-2 border-gray-200 text-sm outline-none 
                             transition-all duration-300 
                             focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 
                             hover:border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-white font-semibold 
                         shadow-lg shadow-indigo-500/50
                         transition-all duration-300 
                         hover:shadow-xl hover:shadow-indigo-500/60 hover:scale-[1.02] 
                         active:scale-[0.98]
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                         overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>

            {/* Footer with Animation */}
            <div className="mt-8 text-center animate-fade-in-up animation-delay-600">
              <p className="text-sm text-gray-600">
                I don't have an account?{" "}
                <span
                  onClick={() => setShowSignup(true)}
                  className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer 
                           transition-all duration-300 hover:underline inline-flex items-center gap-1 group"
                >
                  Sign up
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fade-in-down {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }

          @keyframes subtle-zoom {
            0%, 100% { transform: scale(1.1); }
            50% { transform: scale(1.15); }
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }

          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -20px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(20px, 20px) scale(1.05); }
          }

          .animate-fade-in-down {
            animation: fade-in-down 0.6s ease-out;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out;
          }

          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }

          .animate-subtle-zoom {
            animation: subtle-zoom 20s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          .animate-blob {
            animation: blob 7s ease-in-out infinite;
          }

          .animation-delay-200 {
            animation-delay: 0.2s;
          }

          .animation-delay-400 {
            animation-delay: 0.4s;
          }

          .animation-delay-600 {
            animation-delay: 0.6s;
          }

          .animation-delay-800 {
            animation-delay: 0.8s;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>

      {/* Signup Popup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-8 shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-3xl font-bold text-center mb-2">
              Get Started with Us
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Select your role to continue
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {roles.map((role) => (
                <button
                  key={role.key}
                  onClick={() => {
                    // ✅ Save role to localStorage BEFORE navigating
                    localStorage.setItem("role", role.key);
                    navigate(`/register/${role.key}`);
                  }}
                  className="border rounded-xl p-6 flex flex-col items-center gap-3
             hover:border-indigo-500 hover:shadow-lg
             transition-all duration-300"
                >
                  <div className="text-4xl">{role.icon}</div>
                  <span className="font-semibold text-gray-700">
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
