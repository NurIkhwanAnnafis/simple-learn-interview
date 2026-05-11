import { useEffect, useRef, useState } from "react"
import hark from "hark"
import { useTimerSpeakingStore } from "../store/timer-speaking.store"

export const useMic = () => {
  const { setIsMicNotAllowed, setIsSpeaking, restart } = useTimerSpeakingStore()
  const [isDetectSpeaking, setIsDetectSpeaking] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startSpeaking = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const options = {};
      const speechEvents = hark(stream, options);

      speechEvents.on('speaking', () => {
        console.log('isDetectSpeaking!');
        setIsDetectSpeaking(true);
        setIsSpeaking()
      });

      speechEvents.on('stopped_speaking', () => {
        console.log('Stopped isDetectSpeaking!');
        setIsDetectSpeaking(false);
        restart()
      });
    });
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsDetectSpeaking(false);
  };

  useEffect(() => {
    async function getMic() {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
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
