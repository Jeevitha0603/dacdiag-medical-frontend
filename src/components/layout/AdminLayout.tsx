import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from '../../features/doctor/components/DoctorSidebar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}