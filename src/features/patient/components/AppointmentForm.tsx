import React, { useState } from "react";
import PatientSidebar from "../components/PatientSidebar";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    mobileNumber: "",
    mailId: "",
    appointmentDate: "",
    symptoms: "",
    duration: "",
    allergies: "",
    notes: "",
    medicalReport: null,
    timeSlot: "",
    consent: false,
  });

  const navigate = useNavigate();

  const genders = ["Male", "Female", "Other"];
  const timeSlots = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "02:00 PM",
    "03:00 PM",
    "05:00 PM",
    "05:30 PM",
    "07:00 PM",
    "08:00 PM",
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    const name = target.name;
    let value: string | boolean | File | null = null;

    if (target instanceof HTMLInputElement) {
      if (target.type === "checkbox") {
        value = target.checked;
      } else if (target.type === "file") {
        value = target.files?.[0] || null; // single file
      } else {
        value = target.value;
      }
    } else if (target instanceof HTMLSelectElement) {
      value = target.value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeSlot = (slot: string) => {
    setFormData({ ...formData, timeSlot: slot });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // 🔹 API call can go here later
    console.log("Booking Data:", formData);

    // ✅ Redirect to booked appointment page
    navigate("/patient/booked-appointment");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <div className="w-1/5 bg-white shadow p-4">
        <h2 className="font-bold text-lg mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>Dashboard</li>
          <li>Appointment</li>
          <li>Lab Test</li>
          <li>Hospital</li>
          <li>Home Nurse</li>
          <li>My Cart</li>
          <li>My Orders</li>
        </ul>
      </div> */}
      <PatientSidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Appointment</h1>

        <div className="flex mb-6">
          {/* Doctor info */}
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Doctor"
              className="rounded-lg"
            />
            <div>
              <h2 className="font-bold">
                Dr. John Smith{" "}
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">
                  Cardiology
                </span>
              </h2>
              <p>MBBS, M.D. Cardiology</p>
              <p>License Number: ML566659898</p>
              <p className="text-blue-700 font-bold">₹1199 per consultation</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="mailId"
            placeholder="Mail Id"
            value={formData.mailId}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="symptoms"
            placeholder="Symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="allergies"
            placeholder="Allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <div className="col-span-2">
            <label className="block mb-2 font-medium">
              Medical Report (Multi)
            </label>
            <input
              type="file"
              name="medicalReport"
              onChange={handleChange}
              multiple
              className="p-2 border rounded"
            />
          </div>

          {/* Time slots */}
          <div className="col-span-2 flex flex-wrap gap-2 mt-2">
            {timeSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => handleTimeSlot(slot)}
                className={`px-4 py-2 border rounded ${
                  formData.timeSlot === slot ? "bg-blue-600 text-white" : ""
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          {/* Terms & Conditions */}
          <div className="col-span-2 mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
              <span>
                By using the Website, availing our services and/or providing
                your information, you give your express consent to the
                acceptance of the <b>Terms & Conditions</b> and the{" "}
                <b>Privacy Policy</b> of this website.
              </span>
            </label>
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
