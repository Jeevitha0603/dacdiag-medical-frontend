import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorClinicSignup() {
  interface FormData {
    type: "doctor" | "clinic";
    fullName: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    alternateNumber: string;
    mailId: string;
    address: string;
    city: string;
    state: string;
    pincode: string;

    clinicName?: string;
    clinicRegistrationNumber?: string;
    ownerName?: string;
  }

  interface FormErrors {
    [key: string]: string;
  }

  interface OTPVerificationProps {
    phoneNumber: string;
  }

  const [formData, setFormData] = useState<FormData>({
    type: "doctor",
    fullName: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    alternateNumber: "",
    mailId: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted:", formData);
      navigate("/verify-otp", { state: { phoneNumber: formData.phoneNumber } });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // const validateForm = (): boolean => {
  //   const newErrors: FormErrors = {};

  //   // Common fields
  //   if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
  //   if (!formData.gender) newErrors.gender = "Gender is required";
  //   if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
  //   if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
  //   if (!formData.mailId.trim()) newErrors.mailId = "Email is required";
  //   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mailId))
  //     newErrors.mailId = "Invalid email";
  //   if (!formData.address.trim()) newErrors.address = "Address is required";
  //   if (!formData.city.trim()) newErrors.city = "City is required";
  //   if (!formData.state) newErrors.state = "State is required";
  //   if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

  //   // Doctor-specific fields
  //   if (formData.type === "doctor") {
  //     if (!formData.doctorRegistrationNumber?.trim())
  //       newErrors.doctorRegistrationNumber = "Doctor registration number is required";
  //   }

  //   // Clinic-specific fields
  //   if (formData.type === "clinic") {
  //     if (!formData.clinicName?.trim()) newErrors.clinicName = "Clinic name is required";
  //     if (!formData.clinicRegistrationNumber?.trim())
  //       newErrors.clinicRegistrationNumber = "Clinic registration number is required";
  //     if (!formData.ownerName?.trim())
  //       newErrors.ownerName = "Owner/Administrator name is required";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Common fields for both types
    const commonFields = [
      "phoneNumber",
      "mailId",
      "address",
      "city",
      "state",
      "pincode",
    ] as const;

    commonFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    // Email format check
    if (
      formData.mailId?.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mailId)
    ) {
      newErrors.mailId = "Invalid email";
    }

    // Type-specific validations
    if (formData.type === "doctor") {
      if (!formData.fullName?.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
    }

    if (formData.type === "clinic") {
      if (!formData.clinicName?.trim())
        newErrors.clinicName = "Clinic name is required";
      if (!formData.clinicRegistrationNumber?.trim())
        newErrors.clinicRegistrationNumber =
          "Clinic registration number is required";
      if (!formData.ownerName?.trim())
        newErrors.ownerName = "Owner/Administrator name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Purple Gradient with Animations */}
      <div className="hidden lg:block bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />

        {/* Animated Decorative Elements */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2s" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-300/10 rounded-full blur-2xl animate-float" />

        {/* Content with fade-in animation */}
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-white text-center space-y-6 animate-fade-in">
            <div className="mb-8 animate-bounce-slow">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 animate-slide-in-left">
              Welcome to DACDIAG
            </h1>
            <p className="text-xl text-white/90 animate-slide-in-right">
              Join our healthcare network and provide exceptional medical
              services
            </p>
            <div className="flex justify-center gap-3 pt-4 animate-fade-in-up">
              <div className="w-16 h-1 bg-white/60 rounded-full" />
              <div className="w-16 h-1 bg-white/40 rounded-full" />
              <div className="w-16 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form with Smooth Animations */}
      <div className="bg-gradient-to-br from-gray-50 to-white overflow-y-auto">
        <div className="max-w-2xl mx-auto p-6 sm:p-8 lg:p-12">
          {/* Header with slide-in animation */}
          <div className="mb-8 animate-fade-in-down">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 text-center mt-0">
              Doctor/Clinic Sign Up
            </h2>
            <p className="text-gray-600">
              Add your personal details to help us create a secure and
              personalized experience.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Type Selection with hover effect */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Type <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center cursor-pointer group/radio hover:scale-105 transition-transform">
                  <input
                    type="radio"
                    name="type"
                    value="doctor"
                    checked={formData.type === "doctor"}
                    onChange={handleChange}
                    className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 font-medium group-hover/radio:text-purple-600 transition-colors">
                    Doctor
                  </span>
                </label>
                <label className="flex items-center cursor-pointer group/radio hover:scale-105 transition-transform">
                  <input
                    type="radio"
                    name="type"
                    value="clinic"
                    checked={formData.type === "clinic"}
                    onChange={handleChange}
                    className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 font-medium group-hover/radio:text-purple-600 transition-colors">
                    Clinic
                  </span>
                </label>
              </div>
            </div>
            {/* Doctor-specific Fields */}
            {formData.type === "doctor" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.fullName
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.gender
                            ? "border-red-500 animate-shake"
                            : "border-gray-200"
                        } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 appearance-none bg-white hover:border-gray-300`}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                {/* Date of Birth and Phone Number Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.dateOfBirth
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.phoneNumber
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                      placeholder="Enter phone number"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Alternate Number and Mail ID Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Alternate Number
                    </label>
                    <input
                      type="tel"
                      name="alternateNumber"
                      value={formData.alternateNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter alternate number"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Mail ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="mailId"
                      value={formData.mailId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.mailId
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                      placeholder="Enter email address"
                    />
                    {errors.mailId && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.mailId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.address
                        ? "border-red-500 animate-shake"
                        : "border-gray-200"
                    } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 resize-none hover:border-gray-300`}
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City and State Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.city
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      State <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.state ? "border-red-500" : "border-gray-200"
                        } focus:border-purple-500 focus:outline-none transition-all duration-300 appearance-none bg-white hover:border-gray-300`}
                      >
                        <option value="">Select State / UT</option>

                        {/* States */}
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>

                        {/* Union Territories */}
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                      </select>

                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.pincode
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                      placeholder="Enter pincode"
                      maxLength={6}
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {formData.type === "clinic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Clinic Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="clinicName"
                      value={formData.clinicName || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                      placeholder="Enter clinic name"
                    />
                  </div>

                  {/* Clinic Registration Number */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Clinic Registration Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="clinicRegistrationNumber"
                      value={formData.clinicRegistrationNumber || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                      placeholder="Enter clinic registration number"
                    />
                  </div>

                  {/* Owner/Administrator Name */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Owner/Administrator Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none"
                      placeholder="Enter owner/admin name"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.phoneNumber
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                      placeholder="Enter phone number"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Alternate Number and Mail ID Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Alternate Number
                    </label>
                    <input
                      type="tel"
                      name="alternateNumber"
                      value={formData.alternateNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300"
                      placeholder="Enter alternate number"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Mail ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="mailId"
                      value={formData.mailId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.mailId
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                      placeholder="Enter email address"
                    />
                    {errors.mailId && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.mailId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.address
                        ? "border-red-500 animate-shake"
                        : "border-gray-200"
                    } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 resize-none hover:border-gray-300`}
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City and State Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.city
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      State <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.state ? "border-red-500" : "border-gray-200"
                        } focus:border-purple-500 focus:outline-none transition-all duration-300 appearance-none bg-white hover:border-gray-300`}
                      >
                        <option value="">Select State / UT</option>

                        {/* States */}
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>

                        {/* Union Territories */}
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                      </select>

                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.pincode
                          ? "border-red-500 animate-shake"
                          : "border-gray-200"
                      } focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all duration-300 hover:border-gray-300`}
                      placeholder="Enter pincode"
                      maxLength={6}
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1 animate-fade-in">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Next Button with Hover Effect */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg
                       hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 
                       shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                       transform relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Next
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
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Already have account */}
            <p className="text-center text-gray-600 text-sm animate-fade-in-up">
              Already have an account?{" "}
              <span className="text-purple-600 font-semibold hover:text-purple-700 cursor-pointer hover:underline transition-all">
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
      <style>{`
  /* Fade In */
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in { animation: fade-in 0.8s ease forwards; }

  /* Fade In Down */
  @keyframes fade-in-down {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-down { animation: fade-in-down 0.8s ease forwards; }

  /* Fade In Up */
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up { animation: fade-in-up 0.8s ease forwards; }

  /* Slide In Left */
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-slide-in-left { animation: slide-in-left 0.8s ease forwards; }

  /* Slide In Right */
  @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-slide-in-right { animation: slide-in-right 0.8s ease forwards; }

  /* Shake */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  .animate-shake { animation: shake 0.3s ease; }

  /* Pulse Slow */
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.05); }
  }
  .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

  /* Bounce Slow */
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }

  /* Float (for decorative circles) */
  @keyframes float {
    0%, 100% { transform: translate(-50%, -50%) translateY(0); }
    50% { transform: translate(-50%, -50%) translateY(-20px); }
  }
  .animate-float { animation: float 4s ease-in-out infinite; }

  /* Animation Delay Utility */
  .animation-delay-2s { animation-delay: 2s; }
`}</style>
    </div>
  );
}
