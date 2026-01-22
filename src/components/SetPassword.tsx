import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔐 Validation
  const validateForm = () => {
    if (!password || !confirmPassword) {
      setError("Both fields are required");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setError("");
    return true;
  };

  // ✅ Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShowSuccess(true);

    setTimeout(() => {
      const role = localStorage.getItem("role");

      if (!role) {
        console.error("No role found in localStorage");
        navigate("/login");
        return;
      }

      const dashboardRoutes: Record<string, string> = {
        doctor: "/doctor/dashboard",
        patient: "/patient/dashboard",
        clinic: "/clinic/dashboard",
        lab: "/lab/dashboard",
        nurse: "/nurse/dashboard",
        hospital: "/hospital/dashboard",
      };

      const route = dashboardRoutes[role];
      navigate(route || "/login");
    }, 2500);
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Left Gradient */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-600 to-black" />

        {/* Right Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Set Password
            </h1>
            <p className="text-gray-500 mb-8">
              Password must be at least 8 characters.
            </p>

            {/* 🔹 FORM START */}
            <form onSubmit={handleSubmit}>
              {/* Password */}
              <div className="mb-5 relative">
                <label className="block mb-1 text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-11 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="mb-5 relative">
                <label className="block mb-1 text-gray-700">
                  Confirm Password
                </label>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-11 text-gray-400"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-700 text-white py-3 rounded-xl text-lg hover:bg-indigo-800 transition"
              >
                Create Password
              </button>
            </form>
            {/* 🔹 FORM END */}
          </div>
        </div>
      </div>

      {/* ✅ SUCCESS POPUP (NO BUTTON) */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md text-center animate-scaleIn">
            <img
              src="/dacdiag-logo.png"
              alt="DACDIAG Logo"
              className="mx-auto mb-4 w-40 h-40 object-contain"
            />
            <h2 className="text-2xl font-semibold mb-2">Woohoo! 🎉</h2>
            <p className="text-gray-600">
              Your account has been created successfully.
              <br />
              Redirecting to dashboard...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
