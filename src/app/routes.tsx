import { Routes, Route, Navigate } from "react-router-dom";

/* ========= AUTH ========= */
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import LoginPage from "../features/auth/pages/LoginPage";
import OTPVerification from "../components/OTPVerification";
import SetPassword from "../components/SetPassword";

/* ========= LAYOUTS ========= */
import AdminLayout from "../components/layout/AdminLayout";
import AuthLayout from "../components/layout/AuthLayout";

/* ========= ADMIN ========= */
import AdminDashboard from "../components/layout/Dashboard";
import Users from "../features/admin/Users";
import Roles from "../features/admin/Roles";
import Reports from "../features/admin/Reports";
import DoctorsList from "../features/admin/DoctorsList";
import Settings from "../components/Settings";

/* ========= DOCTOR ========= */
import DoctorDashboard from "../features/doctor/pages/DoctorDashboard";
import DoctorSignup from "../features/doctor/pages/DoctorSignup";

import ScheduleList from "../features/doctor/components/ScheduleList";
import ScheduleProfile from "../features/doctor/components/ScheduleProfile";

/* ========= PATIENT ========= */
import PatientDashboard from "../features/patient/pages/PatientDashboard";
import PatientSignup from "../features/patient/pages/PatientSignup";
import AppointmentForm from "../features/patient/components/AppointmentForm";
import BookedAppointment from "../features/patient/components/BookedAppointment";
import PatientVideoCall from "../features/patient/components/PatientVideoCall";

import HomePage from "../pages/HomePage";

/* ========= LAB ========= */
// import LabDashboard from "../features/lab/LabDashboard";
// import LabSignup from "../features/lab/pages/LabSignup";

/* ========= PHARMACY ========= */
// import PharmacyDashboard from "../features/pharmacy/PharmacyDashboard";
// import NurseSignup from "../features/nurse/pages/NurseSignup";

/* ========= STAFF ========= */
// import StaffDashboard from "../features/staff/StaffDashboard";
// import StaffSignup from "../features/staff/pages/StaffSignup";

/* ========= ADMIN SIGNUP (OPTIONAL) ========= */
// import AdminSignup from "../features/admin/pages/AdminSignup";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />
      {/* ================= AUTH ================= */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register/doctor" element={<DoctorSignup />} />
        <Route path="/register/patient" element={<PatientSignup />} />
        {/* <Route path="/register/lab" element={<LabSignup />} /> */}
        {/* <Route path="/register/nurse" element={<NurseSignup />} /> */}
        {/* <Route path="/register/hospital" element={<HospitalSignup />} /> */}

        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<OTPVerification />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/appointment" element={<AppointmentForm />} />

        <Route
          path="/patient/booked-appointment"
          element={<BookedAppointment />}
        />

        <Route path="/patient/video-call" element={<PatientVideoCall />} />

        {/* Choose role / register landing */}
        <Route path="/register" element={<Register />} />

        {/* Role-wise signup */}
        {/* <Route path="/doctor/signup" element={<DoctorSignup />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        <Route path="/lab/signup" element={<LabSignup />} />
        <Route path="/pharmacy/signup" element={<PharmacySignup />} />
        <Route path="/staff/signup" element={<StaffSignup />} />
        <Route path="/admin/signup" element={<AdminSignup />} /> */}
      </Route>

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<Roles />} />
        <Route path="doctors" element={<DoctorsList />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* ================= DOCTOR ================= */}
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

      <Route path="/schedule" element={<ScheduleList />} />

      <Route path="/schedule/:patientId" element={<ScheduleProfile />} />

      {/* ================= PATIENT ================= */}
      <Route path="/patient/dashboard" element={<PatientDashboard />} />

      {/* ================= LAB ================= */}
      {/* <Route path="/lab/dashboard" element={<LabDashboard />} /> */}

      {/* ================= PHARMACY ================= */}
      {/* <Route path="/pharmacy/dashboard" element={<PharmacyDashboard />} /> */}

      {/* ================= STAFF ================= */}
      {/* <Route path="/staff/dashboard" element={<StaffDashboard />} /> */}

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
