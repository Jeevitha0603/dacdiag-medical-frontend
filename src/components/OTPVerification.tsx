import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// ✅ Define the props type
interface OTPVerificationProps {
  phoneNumber: string;
}

export default function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    // TODO: verify OTP with backend
    console.log("Entered OTP:", enteredOtp);

    // ✅ After successful OTP verification
    navigate("/set-password");
  };

  // Get phone number from state
  const { phoneNumber } = (location.state as { phoneNumber: string }) || {
    phoneNumber: "",
  };

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // only numbers allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left gradient side */}
      <div className="w-1/2 bg-gradient-to-b from-purple-700 to-black"></div>

      {/* Right OTP form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h1 className="text-2xl font-bold mb-6">
          OTP to {phoneNumber || "your number"}
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Enter code
          <br />
          Check your phone! Your activation code is on its way via SMS.
        </p>

        {/* OTP inputs */}
        <div className="flex space-x-4 mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-16 h-16 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Didn't receive the code?{" "}
          <button className="text-purple-700 font-medium">Resend OTP</button>
        </p>

        <button
          onClick={handleVerify}
          className="bg-purple-700 text-white py-3 px-12 rounded-lg hover:bg-purple-800 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
