import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  TestTube,
  Hospital,
  User,
  ShoppingCart,
  Package,
} from "lucide-react";

export default function PatientSidebar() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-indigo-50 text-indigo-700 font-semibold"
      : "text-gray-700 hover:bg-gray-100";

  return (
    <aside className="w-64 bg-white h-screen border-r border-gray-200 shadow-sm flex flex-col">
      {/* Logo/Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <img
          src="/dacdiag-logo.png"
          alt="DACDIAG Logo"
          className="h-12 w-auto mb-2"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-4 space-y-2 text-sm">
        <Link
          to="/patient/dashboard"
          className={`flex items-center px-4 py-3 rounded-lg transition ${isActive(
            "/patient/dashboard"
          )}`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </Link>

        <Link
          to="/patient/appointment"
          className={`flex items-center px-4 py-3 rounded-lg transition ${isActive(
            "/patient/appointment"
          )}`}
        >
          <CalendarDays className="w-5 h-5 mr-3" />
          Appointment
        </Link>

        <Link
          to="/patient/lab-test"
          className={`flex items-center px-4 py-3 rounded-lg transition ${isActive(
            "/patient/lab-test"
          )}`}
        >
          <TestTube className="w-5 h-5 mr-3" />
          Lab Test
        </Link>

        <Link
          to="/patient/hospital"
          className={`flex items-center px-4 py-3 rounded-lg transition ${isActive(
            "/patient/hospital"
          )}`}
        >
          <Hospital className="w-5 h-5 mr-3" />
          Hospital
        </Link>

        <Link
          to="/patient/home-nurse"
          className={`flex items-center px-4 py-3 rounded-lg transition ${isActive(
            "/patient/home-nurse"
          )}`}
        >
          <User className="w-5 h-5 mr-3" />
          Home Nurse
        </Link>

        <Link
          to="/patient/cart"
          className={`flex items-center px-4 py-3 rounded-lg transition ${isActive(
            "/patient/cart"
          )}`}
        >
          <ShoppingCart className="w-5 h-5 mr-3" />
          My Cart
        </Link>

        <Link
          to="/patient/orders"
          className={`flex items-center px-4 py-3 rounded-lg transition ${isActive(
            "/patient/orders"
          )}`}
        >
          <Package className="w-5 h-5 mr-3" />
          My Orders
        </Link>
      </nav>
    </aside>
  );
}
