// ==========================================
// WEB - VideoCall.tsx
// ==========================================
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

const VideoCall = () => {
  const { callId } = useParams();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'patient';
  const navigate = useNavigate();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isRemoteConnected, setIsRemoteConnected] = useState(false);
  const [connectionState, setConnectionState] = useState('connecting');

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socket = useRef<any>(null);
  const localStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    initializeCall();

    return () => {
      cleanup();
    };
  }, []);

  const initializeCall = async () => {
    try {
      console.log('🚀 Initializing call...', { callId, role });

      socket.current = io(SOCKET_URL, {
        transports: ['websocket'],
      });

      socket.current.on('connect', () => {
        console.log('✅ Socket connected');
        socket.current.emit('join-call', { callId, role });
      });

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      localStream.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setupPeerConnection(stream);

      socket.current.on('user-joined', handleUserJoined);
      socket.current.on('call-offer', handleCallOffer);
      socket.current.on('call-answer', handleCallAnswer);
      socket.current.on('ice-candidate', handleIceCandidate);
      socket.current.on('user-left', handleUserLeft);

      if (role === 'doctor') {
        setTimeout(() => createOffer(), 1000);
      }
    } catch (error) {
      console.error('❌ Failed to initialize call:', error);
      alert('Failed to start video call. Please grant camera/microphone permissions.');
    }
  };

  const setupPeerConnection = (stream: MediaStream) => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    };

    peerConnection.current = new RTCPeerConnection(configuration);

    stream.getTracks().forEach((track) => {
      peerConnection.current?.addTrack(track, stream);
    });

    peerConnection.current.ontrack = (event) => {
      console.log('📹 Remote stream received');
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setIsRemoteConnected(true);
        setConnectionState('connected');
      }
    };

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.current?.emit('ice-candidate', {
          callId,
          candidate: event.candidate,
          from: role,
        });
      }
    };

    peerConnection.current.oniceconnectionstatechange = () => {
      const state = peerConnection.current?.iceConnectionState;
      console.log('🔌 ICE connection state:', state);
      setConnectionState(state || 'connecting');
    };
  };

  const createOffer = async () => {
    try {
      const offer = await peerConnection.current?.createOffer();
      await peerConnection.current?.setLocalDescription(offer);

      socket.current?.emit('call-offer', {
        callId,
        offer,
        from: role,
      });
    } catch (error) {
      console.error('Failed to create offer:', error);
    }
  };

  const handleUserJoined = (data: any) => {
    console.log('👋 User joined:', data);
  };

  const handleCallOffer = async (data: any) => {
    try {
      await peerConnection.current?.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );

      const answer = await peerConnection.current?.createAnswer();
      await peerConnection.current?.setLocalDescription(answer);

      socket.current?.emit('call-answer', {
        callId,
        answer,
        from: role,
      });
    } catch (error) {
      console.error('Failed to handle offer:', error);
    }
  };

  const handleCallAnswer = async (data: any) => {
    try {
      await peerConnection.current?.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    } catch (error) {
      console.error('Failed to handle answer:', error);
    }
  };

  const handleIceCandidate = async (data: any) => {
    try {
      await peerConnection.current?.addIceCandidate(
        new RTCIceCandidate(data.candidate)
      );
    } catch (error) {
      console.error('Failed to add ICE candidate:', error);
    }
  };

  const handleUserLeft = () => {
    alert('The other user left the call');
    endCall();
  };

  const toggleMute = () => {
    localStream.current?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    localStream.current?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsVideoOff(!isVideoOff);
  };

  const endCall = () => {
    cleanup();
    navigate('/doctor-dashboard');
  };

  const cleanup = () => {
    localStream.current?.getTracks().forEach((track) => track.stop());
    peerConnection.current?.close();
    socket.current?.emit('leave-call', { callId, role });
    socket.current?.disconnect();
  };

  return (
    <div style={styles.container}>
      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        style={styles.remoteVideo}
      />

      {!isRemoteConnected && (
        <div style={styles.waitingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.waitingText}>
            {connectionState === 'connecting' 
              ? 'Connecting...' 
              : 'Waiting for other user...'}
          </p>
          <p style={styles.callIdText}>Call ID: {callId}</p>
        </div>
      )}

      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={styles.localVideo}
      />

      <div style={styles.controls}>
        <button
          style={{...styles.controlButton, ...(isMuted ? styles.activeButton : {})}}
          onClick={toggleMute}
        >
          {isMuted ? '🔇' : '🎤'}
        </button>

        <button
          style={{...styles.controlButton, ...(isVideoOff ? styles.activeButton : {})}}
          onClick={toggleVideo}
        >
          {isVideoOff ? '📷' : '📹'}
        </button>

        <button style={styles.endButton} onClick={endCall}>
          ☎️
        </button>
      </div>
    </div>
  );
};

const styles: any = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    backgroundColor: '#1a1a1a',
  },
  localVideo: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '200px',
    height: '150px',
    borderRadius: '10px',
    border: '2px solid #fff',
    objectFit: 'cover',
  },
  waitingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  spinner: {
    margin: '0 auto 20px',
    border: '4px solid rgba(255,255,255,0.3)',
    borderTop: '4px solid #fff',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  },
  waitingText: {
    color: '#fff',
    fontSize: '24px',
    marginBottom: '10px',
  },
  callIdText: {
    color: '#888',
    fontSize: '14px',
  },
  controls: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '20px',
  },
  controlButton: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  activeButton: {
    backgroundColor: 'rgba(255,0,0,0.5)',
  },
  endButton: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#ff3b30',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
};

// Add this to your CSS file for the spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default VideoCall;