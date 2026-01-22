import {
  LayoutDashboard,
  UserPlus,
  Users,
  ShoppingBag,
  Calendar,
  ShoppingCart,
  Package,
  User,
  Video,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const API_URL = "http://192.168.29.159:5000";

export default function DoctorDashboard() {
  const doctorName = "Dr. Jeevi";
  const [open, setOpen] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const [startingCall, setStartingCall] = useState<string | null>(null);
  const navigate = useNavigate();

  // Test patients data
  const patients = [
    { id: "pat123", name: "Arun Kumar", time: "Today, 2:30 PM", symptoms: "Fever, Headache, Body pain" },
    { id: "pat456", name: "Priya Sharma", time: "Today, 3:00 PM", symptoms: "Cold, Cough" },
    { id: "pat789", name: "Raj Patel", time: "Today, 4:00 PM", symptoms: "Stomach ache" },
  ];

  useEffect(() => {
    // Connect socket
    const socketInstance = io(API_URL, {
      transports: ["websocket"],
    });

    socketInstance.on("connect", () => {
      console.log("✅ Doctor socket connected:", socketInstance.id);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleStartVideoCall = async (patientId: string, patientName: string) => {
    if (!socket) {
      alert("Socket not connected. Please refresh the page.");
      return;
    }

    try {
      setStartingCall(patientId);

      // Create video call
      const response = await axios.post(`${API_URL}/api/videocall/start`, {
        appointmentId: `apt-${Date.now()}`,
        doctorId: "doc-jeevi-123",
        patientId: patientId,
      });

      const { callId } = response.data;
      console.log("📞 Call created:", callId);

      // Notify patient via socket
      socket.emit("call-offer", {
        callId,
        from: "doc-jeevi-123",
        to: patientId,
        fromName: doctorName,
      });

      // Navigate to video call
      navigate(`/video-call/${callId}?role=doctor`);
    } catch (err) {
      console.error("❌ Failed to start call", err);
      alert("Failed to start video call. Please try again.");
    } finally {
      setStartingCall(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 bg-white border-r flex-col px-1 py-2">
        <img src="/dacdiag-logo.png" alt="DACDIAG" className="w-40 mb-8" />

        <nav className="space-y-3">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
          <SidebarItem icon={UserPlus} label="New Request" />
          <SidebarItem icon={Users} label="Patient" />
          <SidebarItem icon={ShoppingBag} label="Shop" />
          <SidebarItem
            icon={Calendar}
            label="Schedule"
            onClick={() => navigate("/schedule")}
          />
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
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#" className="font-semibold">
              Your Dashboard
            </a>
          </nav>

          {/* Doctor Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-indigo-700 text-white px-5 py-2 rounded-full"
            >
              <User size={18} />
              {doctorName}
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
        </header>

        {/* ================= CONTENT ================= */}
        <main className="p-6 space-y-8">
          {/* ================= STATS ================= */}
          <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Patient" value="50" highlight />
              <StatCard title="Today Appointment" value="5" />
              <StatCard title="Pending Appointment" value="50" />
              <StatCard title="Completed Appointment" value="50" />
            </div>
          </section>

          {/* ================= APPOINTMENTS ================= */}
          <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full"></span>
              Appointment Request
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patients.map((patient) => (
                <AppointmentCard 
                  key={patient.id}
                  patient={patient}
                  onStartCall={handleStartVideoCall}
                  isStarting={startingCall === patient.id}
                />
              ))}
            </div>
          </section>
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

function StatCard({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 flex justify-between items-center shadow-sm ${
        highlight ? "bg-indigo-700 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h3 className="text-4xl font-bold mt-2">{value}</h3>
      </div>
      <div className="bg-indigo-100 text-indigo-700 rounded-xl p-3">
        <Users size={24} />
      </div>
    </div>
  );
}

function AppointmentCard({ 
  patient, 
  onStartCall,
  isStarting 
}: { 
  patient: any;
  onStartCall: (id: string, name: string) => void;
  isStarting: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-white flex items-center justify-center font-semibold">
          {patient.name.substring(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{patient.name}</h4>
          <p className="text-sm text-gray-500">{patient.time}</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 mb-4">
        <span className="font-semibold">Symptoms:</span>
        <p className="mt-1">{patient.symptoms}</p>
      </div>

      {/* Video Call Button */}
      <button
        onClick={() => onStartCall(patient.id, patient.name)}
        disabled={isStarting}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50"
      >
        {isStarting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Starting Call...</span>
          </>
        ) : (
          <>
            <Video size={18} />
            <span>Start Video Call</span>
          </>
        )}
      </button>
    </div>
  );
}

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const API_URL = 'http://localhost:3000';

// const DoctorDashboard = () => {
//   const navigate = useNavigate();
//   const [callId, setCallId] = useState('');

//   const handleStartVideoCall = async () => {
//     try {
//       const response = await axios.post(`${API_URL}/api/videocall/start`, {
//         appointmentId: 'test-apt-' + Date.now(),
//         doctorId: 'test-doc-123',
//         patientId: 'test-pat-456',
//       });

//       const newCallId = response.data.callId;
//       console.log('📞 Call created:', newCallId);
//       alert(`Call ID: ${newCallId}\n\nShare this ID with the patient to join!`);

//       navigate(`/video-call/${newCallId}?role=doctor`);
//     } catch (err) {
//       console.error('❌ Failed to start call', err);
//       alert('Failed to start call');
//     }
//   };

//   const handleJoinCall = () => {
//     if (!callId.trim()) {
//       alert('Please enter Call ID');
//       return;
//     }

//     navigate(`/video-call/${callId.trim()}?role=patient`);
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Doctor Dashboard</h1>

//       <button style={styles.startButton} onClick={handleStartVideoCall}>
//         🎥 Start New Video Call
//       </button>

//       <hr style={styles.divider} />

//       <h3>Or Join Existing Call:</h3>
//       <input
//         style={styles.input}
//         type="text"
//         placeholder="Enter Call ID"
//         value={callId}
//         onChange={(e) => setCallId(e.target.value)}
//       />
//       <button style={styles.joinButton} onClick={handleJoinCall}>
//         Join Call
//       </button>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '50px auto',
//     padding: '20px',
//   },
//   startButton: {
//     backgroundColor: '#007AFF',
//     color: '#fff',
//     padding: '15px',
//     border: 'none',
//     borderRadius: '10px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     width: '100%',
//     marginBottom: '20px',
//   },
//   joinButton: {
//     backgroundColor: '#34C759',
//     color: '#fff',
//     padding: '15px',
//     border: 'none',
//     borderRadius: '10px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     width: '100%',
//   },
//   input: {
//     width: '100%',
//     padding: '15px',
//     fontSize: '16px',
//     borderRadius: '10px',
//     border: '1px solid #ddd',
//     marginBottom: '15px',
//   },
//   divider: {
//     margin: '30px 0',
//   },
// };

// export default DoctorDashboard;