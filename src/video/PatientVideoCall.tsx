import { useEffect, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

import type {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IAgoraRTCRemoteUser,
} from "agora-rtc-sdk-ng";

import { AGORA_APP_ID, CHANNEL_NAME, PATIENT_UID } from "./agoraConfig";

const TOKEN = import.meta.env.VITE_AGORA_RTC_TOKEN;

export default function PatientVideoCall() {
  const clientRef = useRef<IAgoraRTCClient | null>(null);

  const localVideoRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoRef = useRef<HTMLDivElement | null>(null);

  const localAudio = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideo = useRef<ICameraVideoTrack | null>(null);

  useEffect(() => {
    // ✅ create client first
    clientRef.current = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    });

    joinCall();

    // ✅ cleanup
    return () => {
      leaveCall();
      clientRef.current = null;
    };
  }, []);

  const joinCall = async () => {
    clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    await clientRef.current.join(
      AGORA_APP_ID,
      CHANNEL_NAME,
      TOKEN,
      PATIENT_UID,
    );

    localAudio.current = await AgoraRTC.createMicrophoneAudioTrack();
    localVideo.current = await AgoraRTC.createCameraVideoTrack();

    localVideo.current.play(localVideoRef.current!);

    await clientRef.current.publish([localAudio.current, localVideo.current]);

    clientRef.current.on("user-published", async (user, mediaType) => {
      await clientRef.current?.subscribe(user, mediaType);

      if (mediaType === "video") {
        user.videoTrack?.play(remoteVideoRef.current!);
      }
      if (mediaType === "audio") {
        user.audioTrack?.play();
      }
    });
  };

  const leaveCall = async () => {
    localAudio.current?.close();
    localVideo.current?.close();
    await clientRef.current?.leave();
  };

  return (
    <div className="flex h-screen bg-black">
      <div className="w-3/4" ref={remoteVideoRef} />
      <div className="w-1/4 p-2">
        <div ref={localVideoRef} className="h-48 border" />
        <p className="text-white mt-2">Patient</p>
      </div>
    </div>
  );
}
