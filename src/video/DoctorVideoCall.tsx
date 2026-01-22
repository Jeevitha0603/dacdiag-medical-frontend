import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

import type {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";

import {
  AGORA_APP_ID,
  CHANNEL_NAME,
  DOCTOR_UID,
} from "./agoraConfig";

const TOKEN = import.meta.env.VITE_AGORA_RTC_TOKEN;

export default function DoctorVideoCall() {
  // ✅ Agora client
  const clientRef = useRef<IAgoraRTCClient | null>(null);

  // ✅ Video containers
  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLDivElement | null>(null);

  // ✅ Tracks
  const localAudio = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideo = useRef<ICameraVideoTrack | null>(null);

  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // ✅ create client BEFORE join
    clientRef.current = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    });

    startCall();

    return () => {
      leaveCall();
      clientRef.current = null;
    };
  }, []);

  const startCall = async () => {
    try {
      const client = clientRef.current;
      if (!client) return;

      await client.join(
        AGORA_APP_ID,
        CHANNEL_NAME,
        TOKEN || null,
        DOCTOR_UID
      );

      // 🎤📹 Create local tracks
      localAudio.current = await AgoraRTC.createMicrophoneAudioTrack();
      localVideo.current = await AgoraRTC.createCameraVideoTrack();

      // ▶ Play local video
      if (localVideoRef.current && localVideo.current) {
        localVideo.current.play(localVideoRef.current);
      }

      // 📡 Publish tracks
      await client.publish([
        localAudio.current,
        localVideo.current,
      ]);

      // 👤 When patient publishes
      client.on(
        "user-published",
        async (user: IAgoraRTCRemoteUser, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === "video" && remoteVideoRef.current) {
            user.videoTrack?.play(remoteVideoRef.current);
          }

          if (mediaType === "audio") {
            user.audioTrack?.play();
          }
        }
      );

      client.on("user-unpublished", (user) => {
        console.log("User unpublished:", user.uid);
      });

      setJoined(true);
    } catch (error) {
      console.error("Doctor join failed:", error);
    }
  };

  const leaveCall = async () => {
    try {
      localAudio.current?.close();
      localVideo.current?.close();

      localAudio.current = null;
      localVideo.current = null;

      await clientRef.current?.leave();
    } catch (error) {
      console.error("Leave call error:", error);
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* VIDEO AREA */}
      <div className="flex-1 relative">
        {/* Patient Video */}
        <div
          ref={remoteVideoRef}
          className="absolute inset-0 bg-black"
        >
          {!joined && (
            <div className="w-full h-full flex items-center justify-center text-white text-xl">
              Waiting for patient...
            </div>
          )}
        </div>

        {/* Doctor Video (PIP) */}
        <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-900 rounded-xl overflow-hidden border border-white">
          <div ref={localVideoRef} className="w-full h-full" />
        </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-gray-900 py-4 flex justify-center">
        <button
          onClick={leaveCall}
          className="px-6 py-2 bg-red-600 text-white rounded-lg"
        >
          End Call
        </button>
      </div>
    </div>
  );
}
