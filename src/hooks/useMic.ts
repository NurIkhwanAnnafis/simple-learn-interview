import { useEffect, useRef, useState } from "react"
import hark from "hark"
import { useTimerSpeakingStore } from "../store/timer-speaking.store"

export const useMic = () => {
  const { setIsMicNotAllowed, setIsSpeaking, restart } = useTimerSpeakingStore()
  const [isDetectSpeaking, setIsDetectSpeaking] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const speechEvents = useRef<any>(null);

  const startSpeaking = () => {
    if (!streamRef.current) {
      console.error("No microphone stream available");
      return;
    }

    const options = {};
    speechEvents.current = hark(streamRef.current, options);

    speechEvents.current.on('speaking', () => {
      console.log('isDetectSpeaking!');
      setIsDetectSpeaking(true);
      setIsSpeaking()
    });

    speechEvents.current.on('stopped_speaking', () => {
      console.log('isDetectNotSpeaking!');
      setIsDetectSpeaking(false);
      restart()
    });
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    speechEvents.current?.stop();
    setIsDetectSpeaking(false);
  };

  useEffect(() => {
    async function getMic() {
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Mic access granted");
      } catch (err) {
        console.error("Mic access denied or not available", err);
        setIsMicNotAllowed();
      }
    }

    getMic();

    return () => {
    };
  }, []);

  // Return the values so they can be used in your component
  return {
    isDetectSpeaking,
    startSpeaking,
    stopRecording,
  };
}
