import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react";
import PatientSidebar from "../components/PatientSidebar"; // import your sidebar

import { CalendarDays } from "lucide-react"; // used in hero/services cards

export default function PatientDashboard() {
  const patientName = "Mr. Siva"; // 🔁 Replace with API / auth state
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* ========== SIDEBAR ========== */}
      <PatientSidebar />

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1">
        {/* ===== TOP NAVBAR ===== */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <nav className="hidden md:flex gap-8 text-sm">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Your Dashboard</a>
            </nav>

            {/* <button
              onClick={() => navigate("/register")}
              className="bg-indigo-700 text-white px-5 py-2 rounded-full text-sm"
            >
              Register
            </button> */}
            {/* Doctor Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-indigo-700 text-white px-5 py-2 rounded-full"
              >
                <User size={18} />
                {patientName}
                <ChevronDown size={16} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow border">
                  <button
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 rounded-xl"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ===== HERO SECTION ===== */}
        <section className="max-w-7xl mx-auto px-6 mt-8">
          <div className="bg-gradient-to-r from-teal-500 to-blue-700 rounded-2xl p-10 text-white relative overflow-hidden">
            <h1 className="text-3xl font-bold max-w-2xl">
              India’s Only AI based Personalised Smart Health Test Report
            </h1>

            <p className="mt-3 text-sm max-w-xl">
              For better understanding and effective health improvement
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <span>✔ Actionable Health Insights</span>
              <span>✔ Historical Health Data</span>
              <span>✔ Detailed Analytics</span>
            </div>

            <button className="mt-6 bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold">
              View Sample Report
            </button>

            <img
              src="/report-mock.png"
              className="absolute right-8 bottom-0 w-60 hidden lg:block"
              alt="Report"
            />
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section className="max-w-7xl mx-auto px-6 mt-10">
          <h2 className="text-lg font-semibold mb-4">Service</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "My Booked Appointments",
                desc: "View all your current and past appointments",
              },
              {
                title: "Past Appointment",
                desc: "Get tested at home by reliable technicians",
              },
              {
                title: "View Booked Lab Test",
                desc: "See all your current booked lab tests",
              },
              {
                title: "View Past Lab Test",
                desc: "See your current booked lab tests",
              },
              {
                title: "My Prescriptions",
                desc: "View all your current and past prescriptions",
              },
              {
                title: "Order medicine",
                desc: "Upload test results or relevant documents",
                action: "Order Now",
              },
              {
                title: "View Hospital Appointments",
                desc: "See all your current booked hospital appointments",
              },
              {
                title: "View Home Nurse Appointments",
                desc: "See all your current booked Home Nurse appointments",
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow transition"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 text-indigo-700 p-3 rounded-lg">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{card.desc}</p>

                    <button className="mt-3 text-indigo-700 text-sm font-medium">
                      {card.action ?? "View →"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
