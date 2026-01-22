import {
  LayoutDashboard,
  UserPlus,
  Users,
  ShoppingBag,
  Calendar,
  ShoppingCart,
  Package,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ScheduleList() {
  const doctorName = "Dr. Jeevi";
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Sample appointment data
  const appointments = [
    {
      id: 1,
      patientName: "Arun Kumar",
      initials: "AK",
      time: "Today, 2:30 PM",
      symptoms:
        "Infectious diseases and acute febrile illnesses, Dengue, Malaria, Typhoid, Diabetes, Hypertension, Thyroid issues, R...",
      color: "from-sky-400 to-cyan-500",
    },
    {
      id: 2,
      patientName: "Arun Kumar",
      initials: "AK",
      time: "Today, 2:30 PM",
      symptoms:
        "Infectious diseases and acute febrile illnesses, Dengue, Malaria, Typhoid, Diabetes, Hypertension, Thyroid issues, R...",
      color: "from-sky-400 to-cyan-500",
    },
    {
      id: 3,
      patientName: "Arun Kumar",
      initials: "AK",
      time: "Today, 2:30 PM",
      symptoms:
        "Infectious diseases and acute febrile illnesses, Dengue, Malaria, Typhoid, Diabetes, Hypertension, Thyroid issues, R...",
      color: "from-sky-400 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 bg-white border-r flex-col px-1 py-2">
        <img src="/dacdiag-logo.png" alt="DACDIAG" className="w-40 mb-8" />

        <nav className="space-y-3">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            onClick={() => navigate("/doctor-dashboard")}
          />
          <SidebarItem icon={UserPlus} label="New Request" />
          <SidebarItem icon={Users} label="Patient" />
          <SidebarItem icon={ShoppingBag} label="Shop" />
          <SidebarItem icon={Calendar} label="Schedule" active />
          <SidebarItem icon={ShoppingCart} label="Cart" />
          <SidebarItem icon={Package} label="My Orders" />
          <SidebarItem icon={User} label="Profile" />
        </nav>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1">
        {/* ================= TOP BAR ================= */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <nav className="hidden md:flex gap-8 text-gray-700">
            <a href="#" className="hover:text-indigo-700">
              Home
            </a>
            <a href="#" className="hover:text-indigo-700">
              About
            </a>
            <a href="#" className="hover:text-indigo-700">
              Contact
            </a>
            <a href="#" className="font-semibold text-indigo-700">
              Your Dashboard
            </a>
          </nav>

          {/* Doctor Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-indigo-700 text-white px-5 py-2 rounded-full hover:bg-indigo-800 transition"
            >
              <User size={18} />
              {doctorName}
              <ChevronDown size={16} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border z-10">
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                  }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-100 rounded-xl"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main className="p-6">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Schedule List
          </h1>

          {/* Schedule Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <ScheduleCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
        active
          ? "bg-indigo-50 text-indigo-700 font-semibold"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}

function ScheduleCard({ appointment }: { appointment: any }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/schedule/${appointment.id}`)}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100 cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${appointment.color} text-white flex items-center justify-center font-bold text-lg`}
        >
          {appointment.initials}
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            {appointment.patientName}
          </h3>
          <p className="text-sm text-gray-500">{appointment.time}</p>
        </div>
      </div>

      {/* Symptoms */}
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Symptoms:</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {appointment.symptoms}
        </p>
      </div>
    </div>
  );
}
