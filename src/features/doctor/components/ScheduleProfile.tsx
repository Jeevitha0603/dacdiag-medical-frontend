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
  Download,
  AlertCircle,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  CalendarIcon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import type {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";

const AGORA_APP_ID = import.meta.env.VITE_AGORA_APP_ID;
const AGORA_RTC_TOKEN = import.meta.env.VITE_AGORA_RTC_TOKEN;
const AGORA_CHANNEL_NAME = import.meta.env.VITE_AGORA_CHANNEL_NAME;

export default function ScheduleProfile() {
  const doctorName = "Dr. Jeevi";
  const [open, setOpen] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const navigate = useNavigate();

  // Agora References
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
  const remoteUsersRef = useRef<Record<string, IAgoraRTCRemoteUser>>({});
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLDivElement | null>(null);

  // Sample patient data
  const patientData = {
    name: "Arun Kumar",
    initials: "ET",
    age: "34 years",
    gender: "Female",
    bloodGroup: "O+",
    patientId: "PT-00001",
    allergies: ["Penicillin", "Pollen"],
    remark:
      "Infectious diseases and acute febrile illnesses, Dengue, Malaria, Typhoid, Diabetes, Hypertension, Thyroid issues, Respiratory diseases, Tuberculosis, Asthma, Abdominal pain, Gastro-enteritis Urinary tract infection, Covid infection",
    symptoms: "Cardiology, Dermatology, Pediatrics",
    duration: "3 Days",
    reports: [
      { name: "Aadhaar", type: "png" },
      { name: "Pan", type: "png" },
      { name: "Medical License Certificate", type: "png" },
      { name: "Digital Signature", type: "png" },
    ],
  };

  const [prescription, setPrescription] = useState({
    diagnosis: "",
    recommendedTests: "",
    specialInstructions: "",
    recommendedFoods: "",
    notes: "",
    clinicalFinding: "",
    followUpDate: "",
    medicines: [{ name: "", purpose: "", dosage: "" }],
  });

  // Initialize Agora Client
  useEffect(() => {
    clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    return () => {
      leaveCall();
    };
  }, []);

  // Join Agora Channel
const joinCall = async () => {
  try {
    const client = clientRef.current;
    if (!client) return;

    console.log("=== Agora Config ===");
    console.log("App ID:", AGORA_APP_ID);
    console.log("Channel:", AGORA_CHANNEL_NAME);
    console.log("Token:", AGORA_RTC_TOKEN ? AGORA_RTC_TOKEN.substring(0, 20) + "..." : "null");

    // Join the channel
    await client.join(AGORA_APP_ID, AGORA_CHANNEL_NAME, AGORA_RTC_TOKEN, null);
    console.log("✅ Successfully joined channel");

    // Create local audio and video tracks
    localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
    localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
    console.log("✅ Local tracks created");

    // Play local video
    if (localVideoRef.current && localVideoTrackRef.current) {
      localVideoTrackRef.current.play(localVideoRef.current);
      console.log("✅ Playing local video");
    }

    // Publish local tracks
    await client.publish([
      localAudioTrackRef.current,
      localVideoTrackRef.current,
    ]);
    console.log("✅ Published local tracks");

    // Handle user published (remote user joins)
    client.on("user-published", async (user, mediaType) => {
      console.log("🎥 Remote user published:", user.uid, "mediaType:", mediaType);

      try {
        // Subscribe to remote user
        await client.subscribe(user, mediaType);
        console.log("✅ Subscribed to remote user:", user.uid, mediaType);

        if (mediaType === "video") {
          remoteUsersRef.current[user.uid] = user;
          
          // Wait a bit for the DOM to be ready
          setTimeout(() => {
            const remoteContainer = document.getElementById("remote-video-container");
            if (remoteContainer && user.videoTrack) {
              // Clear existing content
              remoteContainer.innerHTML = '';
              
              // Play remote video
              user.videoTrack.play(remoteContainer);
              console.log("✅ Playing remote video for user:", user.uid);
            } else {
              console.error("❌ Remote container not found or no video track");
            }
          }, 100);
        }

        if (mediaType === "audio" && user.audioTrack) {
          user.audioTrack.play();
          console.log("✅ Playing remote audio for user:", user.uid);
        }
      } catch (error) {
        console.error("❌ Error subscribing to remote user:", error);
      }
    });

    // Handle user unpublished
    client.on("user-unpublished", (user, mediaType) => {
      console.log("📴 Remote user unpublished:", user.uid, mediaType);
      if (mediaType === "video") {
        delete remoteUsersRef.current[user.uid];
      }
    });

    // Handle user left
    client.on("user-left", (user) => {
      console.log("👋 Remote user left:", user.uid);
      delete remoteUsersRef.current[user.uid];
      
      // Clear remote video container
      const remoteContainer = document.getElementById("remote-video-container");
      if (remoteContainer) {
        remoteContainer.innerHTML = '';
      }
    });

    setIsJoined(true);
  } catch (error) {
    console.error("❌ Error joining call:", error);
    alert("Failed to join call. Check console for details.");
  }
};

  // Leave Agora Channel
  const leaveCall = async () => {
    try {
      if (localAudioTrackRef.current) {
        localAudioTrackRef.current.close();
        localAudioTrackRef.current = null;
      }

      if (localVideoTrackRef.current) {
        localVideoTrackRef.current.close();
        localVideoTrackRef.current = null;
      }

      if (clientRef.current) {
        await clientRef.current.leave();
      }

      remoteUsersRef.current = {};
      setIsJoined(false);
      setShowConsultation(false);
    } catch (error) {
      console.error("Error leaving call:", error);
    }
  };

  // Toggle Mute
  const toggleMute = async () => {
    if (localAudioTrackRef.current) {
      await localAudioTrackRef.current.setEnabled(isMuted);
      setIsMuted(!isMuted);
    }
  };

  // Toggle Video
  const toggleVideo = async () => {
    if (localVideoTrackRef.current) {
      await localVideoTrackRef.current.setEnabled(isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

  // Start Consultation
  const handleStartConsultation = () => {
    setShowConsultation(true);
    joinCall();
  };

  const handleAddMedicine = () => {
    setPrescription({
      ...prescription,
      medicines: [
        ...prescription.medicines,
        { name: "", purpose: "", dosage: "" },
      ],
    });
  };

  const handleMedicineChange = (
    index: number,
    field: keyof (typeof prescription.medicines)[0],
    value: string,
  ) => {
    const updatedMedicines = [...prescription.medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], [field]: value };
    setPrescription({ ...prescription, medicines: updatedMedicines });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="hidden md:flex w-64 bg-white border-r flex-col px-1 py-2">
        <img src="/dacdiag-logo.png" alt="DACDIAG" className="w-40 mb-8" />

        <nav className="space-y-3">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <SidebarItem icon={UserPlus} label="New Request" />
          <SidebarItem icon={Users} label="Patient" />
          <SidebarItem icon={ShoppingBag} label="Shop" />
          <SidebarItem
            icon={Calendar}
            label="Schedule"
            active
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
        <main className="p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Schedule Profile
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-1 space-y-6">
              {/* Patient Info Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-sky-400 to-cyan-500 text-white flex items-center justify-center font-bold text-4xl">
                    {patientData.initials}
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-gray-800 text-center">
                    {patientData.name}
                  </h2>

                  <div className="text-center text-gray-600">
                    <p>
                      {patientData.age} · {patientData.gender}
                    </p>
                    <p className="mt-1">
                      Blood Group: {patientData.bloodGroup}
                    </p>
                    <p className="mt-1 text-sm">
                      Patient ID: {patientData.patientId}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-2 text-red-600">
                      <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Allergies</p>
                        <p className="text-sm">
                          {patientData.allergies.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Report</h3>

                <div className="space-y-3 mb-6">
                  {patientData.reports.map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <div className="text-yellow-600 font-bold text-xs uppercase">
                            {report.type}
                          </div>
                        </div>
                        <span className="font-semibold text-gray-800">
                          {report.name}
                        </span>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-lg transition">
                        <Download size={20} className="text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleStartConsultation}
                  className="w-full bg-indigo-700 text-white py-4 rounded-xl font-semibold hover:bg-indigo-800 transition"
                >
                  Start Consultation
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Remark</h3>
                <p className="text-gray-700 leading-relaxed">
                  {patientData.remark}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Symptoms:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {patientData.symptoms}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Duration
                </h3>
                <p className="text-gray-700 text-lg font-semibold">
                  {patientData.duration}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ================= CONSULTATION MODAL ================= */}
      {showConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-2xl font-bold">
                Consultation with {patientData.name}
              </h2>
              <button
                onClick={leaveCall}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex">
              {/* Video Call Section */}
              <div className="w-1/2 bg-gray-900 relative">
                {/* Remote Video (Patient) - Large */}
                <div
                  ref={remoteVideoRef}
                  id="remote-video-container"
                  className="w-full h-full bg-gray-800"
                >
                  {!Object.keys(remoteUsersRef.current).length && (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center text-6xl font-bold mb-4">
                          {patientData.initials}
                        </div>
                        <p className="text-xl font-semibold">
                          {isJoined
                            ? "Waiting for patient to join..."
                            : "Connecting..."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Local Video (Doctor) - Picture in Picture */}
                <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-xl overflow-hidden shadow-lg border-2 border-white">
                  <div
                    ref={localVideoRef}
                    id="local-video-container"
                    className="w-full h-full"
                  />
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <button
                    onClick={toggleMute}
                    className={`p-4 rounded-full ${
                      isMuted ? "bg-red-600" : "bg-gray-700"
                    } text-white hover:opacity-80 transition`}
                  >
                    {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                  </button>
                  <button
                    onClick={toggleVideo}
                    className={`p-4 rounded-full ${
                      isVideoOff ? "bg-red-600" : "bg-gray-700"
                    } text-white hover:opacity-80 transition`}
                  >
                    {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                  </button>
                  <button
                    onClick={leaveCall}
                    className="p-4 rounded-full bg-red-600 text-white hover:opacity-80 transition"
                  >
                    <PhoneOff size={24} />
                  </button>
                </div>
              </div>

              {/* Prescription Form */}
              <div className="w-1/2 overflow-y-auto p-6 bg-gray-50">
                <h3 className="text-2xl font-bold mb-6">Create Prescription</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Diagnosis
                      </label>
                      <input
                        type="text"
                        value={prescription.diagnosis}
                        onChange={(e) =>
                          setPrescription({
                            ...prescription,
                            diagnosis: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Recommended Tests
                      </label>
                      <select
                        value={prescription.recommendedTests}
                        onChange={(e) =>
                          setPrescription({
                            ...prescription,
                            recommendedTests: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select option</option>
                        <option value="Blood Test">Blood Test</option>
                        <option value="X-Ray">X-Ray</option>
                        <option value="MRI">MRI</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Special Instructions
                      </label>
                      <select
                        value={prescription.specialInstructions}
                        onChange={(e) =>
                          setPrescription({
                            ...prescription,
                            specialInstructions: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select option</option>
                        <option value="Take with food">Take with food</option>
                        <option value="Before meals">Before meals</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Recommended Foods
                      </label>
                      <select
                        value={prescription.recommendedFoods}
                        onChange={(e) =>
                          setPrescription({
                            ...prescription,
                            recommendedFoods: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select option</option>
                        <option value="High Protein">High Protein</option>
                        <option value="Low Sugar">Low Sugar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Notes
                      </label>
                      <input
                        type="text"
                        value={prescription.notes}
                        onChange={(e) =>
                          setPrescription({
                            ...prescription,
                            notes: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Clinical Finding
                      </label>
                      <input
                        type="text"
                        value={prescription.clinicalFinding}
                        onChange={(e) =>
                          setPrescription({
                            ...prescription,
                            clinicalFinding: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Follow-up Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="dd/mm/yyyy"
                        value={prescription.followUpDate}
                        onChange={(e) =>
                          setPrescription({
                            ...prescription,
                            followUpDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <CalendarIcon
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-xl font-bold mb-4">Medicines</h4>

                    {prescription.medicines.map((medicine, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Medicine Name
                          </label>
                          <select
                            value={medicine.name}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="">Select option</option>
                            <option value="Paracetamol">Paracetamol</option>
                            <option value="Amoxicillin">Amoxicillin</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Medicine Purpose
                          </label>
                          <select
                            value={medicine.purpose}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "purpose",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="">Select option</option>
                            <option value="Pain Relief">Pain Relief</option>
                            <option value="Infection">Infection</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Dosage
                          </label>
                          <select
                            value={medicine.dosage}
                            onChange={(e) =>
                              handleMedicineChange(
                                index,
                                "dosage",
                                e.target.value,
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="">Select option</option>
                            <option value="1-0-1">1-0-1</option>
                            <option value="1-1-1">1-1-1</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={handleAddMedicine}
                      className="text-indigo-700 font-semibold hover:text-indigo-800"
                    >
                      + Add Another Medicine
                    </button>
                  </div>

                  <button className="w-full bg-indigo-700 text-white py-3 rounded-xl font-semibold hover:bg-indigo-800 transition mt-6">
                    Submit Prescription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number }>;
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
