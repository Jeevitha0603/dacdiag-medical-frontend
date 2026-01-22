import { Link } from "react-router-dom";
import { useState } from "react";

export default function DoctorSidebar() {
  const [isIndividualsOpen, setIsIndividualsOpen] = useState(false);
  const [isDropdownsOpen, setIsDropdownsOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isLabTestOpen, setIsLabTestOpen] = useState(false);

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
      <nav className="flex-1 px-6 py-4 space-y-5 overflow-y-auto">
        {/* Dashboard */}
        <div>
          <Link
            to="/admin/dashboard"
            className="flex items-center px-4 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>
        </div>

        {/* Individuals Section */}
        <div>
          <button
            onClick={() => setIsIndividualsOpen(!isIndividualsOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition duration-200"
          >
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Individuals
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isIndividualsOpen ? "rotate-180" : ""
              }`}
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
          </button>

          {isIndividualsOpen && (
            <ul className="space-y-1 mt-2 ml-4">
              <li>
                <Link
                  to="/admin/patients"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Patients
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/doctors"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Doctors / Clinic
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/nurses"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Nurse
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/hospitals"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Hospitals
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/labs"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  Lab
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/vendors"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Vendors
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Dropdowns Section */}
        <div>
          <button
            onClick={() => setIsDropdownsOpen(!isDropdownsOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition duration-200"
          >
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              Dropdowns
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownsOpen ? "rotate-180" : ""
              }`}
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
          </button>

          {isDropdownsOpen && (
            <ul className="space-y-1 mt-2 ml-4">
              <li>
                <Link
                  to="/admin/dropdowns/hospital-type"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Hospital Type
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dropdowns/facilities"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dropdowns/doctor-category"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Doctor Category
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dropdowns/specializations"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Specializations
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dropdowns/lab-type"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Lab Type
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dropdowns/lab-test-category"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Lab Test Category
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Prescription Section */}
        <div>
          <button
            onClick={() => setIsPrescriptionOpen(!isPrescriptionOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition duration-200"
          >
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Prescription
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isPrescriptionOpen ? "rotate-180" : ""
              }`}
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
          </button>

          {isPrescriptionOpen && (
            <ul className="space-y-1 mt-2 ml-4">
              <li>
                <Link
                  to="/admin/prescription/dosage"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Dosage
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/prescription/food"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Food
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/prescription/instructions"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Instructions
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Products Section */}
        <div>
          <button
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition duration-200"
          >
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Products
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isProductsOpen ? "rotate-180" : ""
              }`}
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
          </button>

          {isProductsOpen && (
            <ul className="space-y-1 mt-2 ml-4">
              <li>
                <Link
                  to="/admin/products/category"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products/subcategory"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Subcategory
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/products/products"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Products
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Lab Test Section */}
        <div>
          <button
            onClick={() => setIsLabTestOpen(!isLabTestOpen)}
            className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition duration-200"
          >
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Lab Test
            </span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isLabTestOpen ? "rotate-180" : ""
              }`}
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
          </button>

          {isProductsOpen && (
            <ul className="space-y-1 mt-2 ml-4">
              <li>
                <Link
                  to="/admin/labtest/category"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/labtest/subcategory"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Subcategory
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/labtest/products"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition duration-200"
                >
                  Lab Test
                </Link>
              </li>
            </ul>
          )}
        </div>

        <Link
          to="/admin/medicaltourism"
          className="flex items-center px-4 py-3 text-sm font-semibold text-black rounded-lg transition duration-200"
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Medical Tourism
        </Link>
      </nav>

      {/* Footer */}
      {/* <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">AD</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">admin@dacdiag.com</p>
          </div>
        </div>
      </div> */}
    </aside>
  );
}
