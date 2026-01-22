import Sidebar from "../features/doctor/components/DoctorSidebar";
import Topbar from "../components/layout/Topbar";
import StatCard from "../components/StatCard";
// import PaymentPanel from "../components/PaymentPanel";
// import MedicalTourismTable from "../components/MedicalTourismTable";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <Topbar />

        <div className="grid grid-cols-4 gap-4">
          <StatCard title="Patients" value="950" highlight />
          <StatCard title="Doctors" value="950" />
          <StatCard title="Nurses" value="950" />
          <StatCard title="Labs" value="950" />
        </div>

        {/* <div className="flex gap-6 mt-6">
          <div className="flex-1">
            <MedicalTourismTable />
          </div>
          <PaymentPanel />
        </div> */}
      </main>
    </div>
  );
}
