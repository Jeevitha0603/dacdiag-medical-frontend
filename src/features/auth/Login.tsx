import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const login = () => {
    // DEMO role-based routing
    if (email.includes("admin")) navigate("/admin/dashboard");
    else if (email.includes("doctor")) navigate("/doctor/dashboard");
    else navigate("/patient/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Dacdiag</h2>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <Input 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button label="Login" onClick={login} />

          {/* Demo Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700 font-medium mb-2">Demo Login:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Use email with "admin" for Admin Dashboard</li>
              <li>• Use email with "doctor" for Doctor Dashboard</li>
              <li>• Any other email for Patient Dashboard</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}