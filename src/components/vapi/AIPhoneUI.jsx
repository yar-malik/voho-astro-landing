import { useState, useRef, useEffect, useCallback } from "react";
import useVapi from "../../hooks/use-vapi";
import { motion } from "framer-motion";
import QRModal from "./QRModal";
const vibrateEffect = {
  animate: {
    x: [0, -2, 2, -2, 2, 0],
    transition: { duration: 0.3, repeat: Infinity },
  },
};

const waveEffect = {
  initial: { opacity: 0, scale: 1 },
  animate: {
    opacity: [0.5, 0.3, 0],
    scale: [1, 1, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeOut" },
  },
};

  const VOICES = {
    English: ["Chris", "Jessica"],
    German: ["Frida", "Niander", "Maryam","Ava","Ben","Lana"],
  };
  const VOICE_LIST = [
  // "Chris", "Jessica",
    "Frida", "Niander", "Maryam","Ava","Ben","Lana"
  ];

  const PREMADE_VOICES = ["6-Month Checkup", "John Is Calling You", "Sue Is Calling You"];
  
  const AIPhoneUI = () => {
    const [selectedVoice, setSelectedVoice] = useState("Frida");
    const [slideX, setSlideX] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [timer, setTimer] = useState();
    const sliderRef = useRef(null);
    const trackRef = useRef(null);
    const { volumeLevel, isSessionActive, toggleCall, statusText, endCall, Currentassistant } = useVapi();
    const [showQRModal, setShowQRModal] = useState(true);

const closeModal = () => {
  setShowQRModal(false);
};

useEffect(() => {
  const submittedData = sessionStorage.getItem("submittedFormData");
  if (submittedData) {
    setShowQRModal(false);
  }
}, []); // ✅ Runs only once on mount

console.log(showQRModal);
    


    useEffect(() => {
      if (answered && isSessionActive === false) {
        setTimer(300)
        toggleCall();
      }
      if (isSessionActive === true) {
        const countdown = setInterval(() => {
          setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
      }
  
    }, [answered, isSessionActive]);
    useEffect(() => {
      if (timer === 0) {
        endCall()
        setAnswered(false);
      }
    }, [timer])
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };
  
  
    console.log(slideX);
    const handleStart = (e) => {
      e.preventDefault();
      const startX = e.clientX || e.touches[0].clientX;
      const trackWidth = trackRef.current.clientWidth - 50;
  
      const handleMove = (moveEvent) => {
        const moveX = moveEvent.clientX || moveEvent.touches[0].clientX;
        let newX = moveX - startX;
        newX = Math.max(0, Math.min(trackWidth, newX));
  
        setSlideX(newX);
  
        if (newX >= trackWidth) {
          setAnswered(true);
          setTimeout(() => setSlideX(0), 500);
        }
      };
  
      const handleEnd = () => {
        if (!answered) {
          setSlideX(0);
        }
        cleanup();
      };
  
      const cleanup = () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      };
  
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleEnd);
    };
  
    const onVoiceChange = (voice) => {
      setSelectedVoice(voice)
      Currentassistant(voice)
    }

    const Accent = [
      "UK",
      "US",
      "Arabic",
      "Indian",
      "US",
      "British",
    ]
  return (
    <>

    <div className="flex flex-col items-center p-4 sm:p-10 min-h-screen">
 

      <div className="phone-container-con flex flex-col md:flex-row items-start w-full max-w-5xl">

        <div className= "phone-container order-1 md:order-2 w-full md:w-1/3 flex md:h-[400px] justify-center">
          <div className="phone relative bg-gray-900 !w-72 !h-[400px] mt-4 md:mt-0 rounded-3xl border-4 border-[#283CFF] shadow-lg flex flex-col items-center justify-center">
            {!answered ? (
              <>
                <div className="bg-gray-800 text-white text-center py-2 px-4 w-full rounded-md">
                  <p className="text-sm">Voho</p>
                </div>

                <p className="text-gray-400 text-sm mt-10">Please wait...</p>
                <h2 className="text-white text-xl font-bold mt-2">
                  Incoming call
                </h2>
                <h3 className="voice-name !text-[#283CFF] text-lg font-semibold mt-2">
                  {selectedVoice} AI Assistant
                </h3>

                {/* Slide button */}
                <div className="slide-btn-container absolute bottom-6 w-full flex justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Pulsating waves */}
                    <motion.div
                      className="absolute w-64 h-14 bg-[#283CFF] rounded-full"
                      variants={waveEffect}
                      initial="initial"
                      animate="animate"
                    />
                    <motion.div
                      className="absolute w-64 h-14 bg-[#283CFF] rounded-full"
                      variants={waveEffect}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: 0.5 }}
                    />

                    {/* Vibrating button */}
                    <motion.div
                      ref={trackRef}
                      onClick={() => {
                        setAnswered(true);
                        setSlideX(0);
                      }}
                      className="call relative w-64 h-14 bg-[#283CFF] rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-[#283CFF]"
                      animate={!answered ? vibrateEffect.animate : {}}
                    >
                      <p className="absolute w-full text-center">
                        {slideX >= 100 ? "Connecting..." : "Answer Call"}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </>
            ) : !isSessionActive ? (
              <p className="text-white text-center text-xl font-bold">
                Connecting...
              </p>
            ) : (
              /* Active Call Screen */
              <div className="text-white text-center">
                <h2 className="text-xl font-bold">Call Connected</h2>
                <p className="text-lg font-semibold mt-2">
                  Time Left: {formatTime(timer)}
                </p>
                <button
                  className="call-end-btn bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                  onClick={() => {
                    setAnswered(false);
                    endCall();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.36 11.36 0 003.54.56 1 1 0 011 1v3.59a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.6a1 1 0 011 1 11.36 11.36 0 00.56 3.54 1 1 0 01-.24 1z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* VOICES on mobile is order-2, on desktop is order-1 (left side) */}
        <div className="voice-container order-2 md:order-1 w-full md:w-2/3 flex flex-col items-center md:items-start justify-center h-full mt-6 md:mt-0">
          <div className="w-full bg-white shadow-lg rounded-lg p-6">
            <h2 className="hidden lg:block text-xl font-semibold text-[#283CFF]">
              Select a voice to Experience the AI Calling Assistant
            </h2>
            <p className="hidden lg:block text-gray-500 mt-2">
              We offer a selection of over 70 different AI assistant voices for you
              to choose from. Below, you will find a few sample options. Please select
              one to experience the demo.
            </p>

            {/* Voice Grid */}
            <div className="voice-grid grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {VOICE_LIST.map((voice) => (
                <button
                  key={voice}
                  onClick={() => onVoiceChange(voice)}
                  disabled={answered === true}
                  className={`voice-btn ${selectedVoice === voice ? "selected" : "default"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl mr-1.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-.73-3.37-1.9-4.53l1.41-1.41C17.36 7.19 18.5 9.45 18.5 12s-1.14 4.81-2.49 5.94l-1.41-1.41c1.17-1.16 1.9-2.76 1.9-4.53zM14 12c0-1.1-.9-2-2-2v4c1.1 0 2-.9 2-2zm3.5-9.09l-1.41 1.41C18.99 6.3 21 9.03 21 12s-2.01 5.7-4.91 7.68l1.41 1.41C20.99 18.54 23 15.43 23 12s-2.01-6.54-5.5-9.09z" />
                      </svg>
                    </span>
                    <span>{voice}</span>
                  </div>
                  <span
                    className={`text-xs ${selectedVoice === voice ? "text-white" : "text-gray-500"
                      }`}
                  >
                     {VOICE_LIST.includes(voice) 
  ? `English (${Accent[VOICE_LIST.indexOf(voice)] || "Unknown"})` 
  : "English"}
                    {/* {VOICE_LIST.includes(voice) ? "English" : "German"} */}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
{showQRModal && <QRModal closeModal={closeModal} />}
</>
  );
};


export default AIPhoneUI;
