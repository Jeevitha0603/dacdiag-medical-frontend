import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import type {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";

const AGORA_APP_ID = import.meta.env.VITE_AGORA_APP_ID;
const AGORA_RTC_TOKEN = import.meta.env.VITE_AGORA_RTC_TOKEN;
const AGORA_CHANNEL_NAME = import.meta.env.VITE_AGORA_CHANNEL_NAME;

export default function PatientVideoCall() {
  const navigate = useNavigate();

  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  const localAudioTrack = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideoTrack = useRef<ICameraVideoTrack | null>(null);
  const remoteUsers = useRef<Record<string, IAgoraRTCRemoteUser>>({});

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [doctorJoined, setDoctorJoined] = useState(false); // Track if doctor joined

  const doctorInitials = "DR"; // Replace with actual doctor's initials if dynamic

  // Initialize Agora
  useEffect(() => {
    clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    joinCall();

    return () => {
      leaveCall();
    };
  }, []);

  const joinCall = async () => {
    try {
      const client = clientRef.current;
      if (!client) return;

      await client.join(
        AGORA_APP_ID,
        AGORA_CHANNEL_NAME,
        AGORA_RTC_TOKEN,
        null
      );

      // Create and play local tracks
      localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();
      localVideoTrack.current = await AgoraRTC.createCameraVideoTrack();

      if (localVideoRef.current && localVideoTrack.current) {
        localVideoTrack.current.play(localVideoRef.current);
      }

      await client.publish([localAudioTrack.current, localVideoTrack.current]);

      // Listen for remote user published
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === "video") {
          remoteUsers.current[user.uid] = user;
          user.videoTrack?.play(remoteVideoRef.current!);
          setDoctorJoined(true); // Doctor video now available
        }

        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user) => {
        delete remoteUsers.current[user.uid];
        setDoctorJoined(false); // Doctor left
      });

      setIsJoined(true);
    } catch (err) {
      console.error("Patient join error:", err);
    }
  };

  const leaveCall = async () => {
    try {
      localAudioTrack.current?.close();
      localVideoTrack.current?.close();
      await clientRef.current?.leave();
    //   navigate("/patient/appointment");
    } catch (err) {
      console.error("Leave error:", err);
    }
  };

  const toggleMute = async () => {
    if (!localAudioTrack.current) return;
    await localAudioTrack.current.setEnabled(isMuted);
    setIsMuted(!isMuted);
  };

  const toggleVideo = async () => {
    if (!localVideoTrack.current) return;
    await localVideoTrack.current.setEnabled(isVideoOff);
    setIsVideoOff(!isVideoOff);
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* VIDEO AREA */}
      <div className="flex-1 relative">
        {/* Doctor Video */}
        <div
          ref={remoteVideoRef}
          className="absolute inset-0 bg-black flex items-center justify-center"
        >
          {!doctorJoined && (
            <div className="text-center text-white">
              <div className="w-32 h-32 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center text-6xl font-bold mb-4">
                {doctorInitials}
              </div>
              <p className="text-xl font-semibold">Waiting for doctor...</p>
            </div>
          )}
        </div>

        {/* Patient Video (PIP) */}
        <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-900 rounded-xl overflow-hidden border border-white shadow-lg">
          <div ref={localVideoRef} className="w-full h-full" />
        </div>

        {/* Doctor Joined Indicator */}
        {doctorJoined && (
          <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            Doctor Joined
          </div>
        )}
      </div>

      {/* CONTROLS */}
      <div className="bg-gray-900 py-4 flex justify-center gap-6">
        <button
          onClick={toggleMute}
          className={`p-4 rounded-full ${isMuted ? "bg-red-600" : "bg-gray-700"} text-white`}
        >
          {isMuted ? <MicOff /> : <Mic />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full ${isVideoOff ? "bg-red-600" : "bg-gray-700"} text-white`}
        >
          {isVideoOff ? <VideoOff /> : <Video />}
        </button>

        <button
          onClick={leaveCall}
          className="p-4 rounded-full bg-red-600 text-white"
        >
          <PhoneOff />
        </button>
      </div>
    </div>
  );
}
