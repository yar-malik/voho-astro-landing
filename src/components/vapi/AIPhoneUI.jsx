import { useState, useRef, useEffect, useCallback } from "react";
import useVapi from "../../hooks/use-vapi";

  const VOICES = {
    English: ["Chris", "Jessica"],
    German: ["Frida", "Niander", "Andreas"],
  };
  const VOICE_LIST = [
  "Chris", "Jessica",
    "Frida", "Niander", "Andreas",
  ];

  const PREMADE_VOICES = ["6-Month Checkup", "John Is Calling You", "Sue Is Calling You"];
  
  const AIPhoneUI = () => {
    const [selectedVoice, setSelectedVoice] = useState("Chris");
    const [slideX, setSlideX] = useState(0);
    const [answered, setAnswered] = useState(true);
    const [timer, setTimer] = useState(120);
    const [hasPermission, setHasPermission] = useState(null);
  
    const sliderRef = useRef(null);
    const trackRef = useRef(null);
    
    const { volumeLevel, isSessionActive, toggleCall, statusText, endCall, Currentassistant } = useVapi();
  
    /** 🔹 Check and Request Microphone Permission */
    const checkMicrophonePermission = useCallback(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasPermission(true);
        stream.getTracks().forEach(track => track.stop()); // Stop stream after checking
      } catch (error) {
        setHasPermission(false);
      }
    }, []);
  
    useEffect(() => {
      checkMicrophonePermission();
    }, [checkMicrophonePermission]);
  
    /** 🔹 Timer Logic */
    useEffect(() => {
      if (answered && !isSessionActive && hasPermission) {
        setTimer(120);
        toggleCall();
      }
      
      if (isSessionActive) {
        const countdown = setInterval(() => {
          setTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(countdown);
      }
    }, [answered, isSessionActive, toggleCall]);
  
    useEffect(() => {
      if (timer === 0) {
        endCall();
        setAnswered(false);
      }
    }, [timer, endCall]);
  
    /** 🔹 Format Timer */
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}:${seconds % 60 < 10 ? "0" : ""}${seconds % 60}`;
    };
  
    /** 🔹 Handle Slide to Answer */
    const handleStart = useCallback((e) => {
      e.preventDefault();
      const startX = e.clientX || e.touches[0].clientX;
      const trackWidth = trackRef.current.clientWidth - 50;
  
      const handleMove = (moveEvent) => {
        const moveX = moveEvent.clientX || moveEvent.touches[0].clientX;
        let newX = Math.max(0, Math.min(trackWidth, moveX - startX));
        setSlideX(newX);
  
        if (newX >= trackWidth) {
          setAnswered(true);
          setTimeout(() => setSlideX(0), 500);
        }
      };
  
      const handleEnd = () => {
        if (!answered) setSlideX(0);
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
    }, [answered]);
  
    /** 🔹 Handle Voice Selection */
    const onVoiceChange = (voice) => {
      setSelectedVoice(voice);
      Currentassistant(voice);
    };
  return (
    <div className="flex flex-col items-center p-4 md:p-10 min-h-screen">
      {/* Title Section */}
      <div className="text-center mb-6 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
          <span className="dot text-[#283CFF] text-3xl md:text-4xl mr-2">●</span>
          <span className="leading-tight">
            Customize The Voice And The Personality Of Your AI Calling Assistant.
          </span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start w-full max-w-5xl">
        {/* Left - Voice Selection */}
        <div className="flex flex-col w-full md:w-2/3 items-center justify-center h-full">
          <div className="w-full bg-white shadow-lg rounded-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Select a voice to Experience the AI Calling Assistant
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              We offer a selection of AI assistant voices for you to choose from. Below, you will find a few sample options. Please select one to experience the demo.
            </p>

            <div className="voice-grid grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {VOICE_LIST.map((voice) => (  
                <button
                  key={voice}
                  onClick={() => onVoiceChange(voice)}
                  disabled={answered === true}
                  className={`voice-btn p-2 md:p-3 border rounded-md flex flex-col items-center text-gray-700 text-sm md:text-lg transition ${selectedVoice === voice ? "border-[#283CFF] bg-[#283CFF] text-white shadow-md" : "border-gray-300 hover:bg-gray-200"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl mr-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3z"></path>
                      </svg>
                    </span>{" "}
                    <span>{voice}</span>
                  </div>
                  <span className={`text-xs ${selectedVoice === voice ? "text-white" : "text-gray-500"}`}>
                    {VOICES.English.includes(voice) ? "English" : "German"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {hasPermission === false && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md text-center mb-6">
            <p>Microphone access is required for AI calls. Please grant permission.</p>
            <button
              onClick={requestMicrophoneAccess}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Grant Microphone Access
            </button>
          </div>
        )}
        {/* Right - Virtual Phone UI */}
        <div className="w-full md:w-1/3 flex justify-center mt-6 md:mt-0">
          <div className="phone relative bg-gray-900 w-full max-w-xs md:w-72 h-[500px] md:h-[545px] rounded-3xl border-4 border-[#283CFF] shadow-lg flex flex-col items-center justify-center p-4">
            {!answered ? (
             <div className="text-center w-full">
             {/* Call Header */}
             <div className="bg-gray-800 text-white text-center py-2 px-4 w-full rounded-md">
               <p className="text-sm">Voho</p>
             </div>
           
             {/* Incoming Call Text */}
             <p className="text-gray-400 text-sm mt-6 md:mt-10">Please wait...</p>
             <h2 className="text-white text-lg md:text-xl font-bold mt-2">Incoming call</h2>
             <h3 className="selected-voice text-[#283CFF] text-base md:text-lg font-semibold mt-2">{selectedVoice} AI Assistant</h3>
           
             {/* Slide to Answer Button */}
             <div className="call-slide-btn absolute bottom-4 md:bottom-6 w-full flex justify-center">
               <div
                 ref={trackRef}
                 className="relative mr-10 w-full max-w-sm md:w-64 h-12 md:h-14 rounded-full flex items-center justify-center text-white font-bold overflow-hidden bg-gray-700 transition-all duration-200"
               >
                 <p className="absolute w-full text-center text-xs md:text-sm">
                   {slideX >= 100 ? "Connecting..." : "Slide to Answer"}
                 </p>
           
                 {/* Sliding Button */}
                 <div
                   ref={sliderRef}
                   className="call-slide-btn-inner absolute left-0 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200"
                   onMouseDown={handleStart}
                   onTouchStart={handleStart}
                   style={{ transform: `translateX(${slideX}px)` }}
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#283CFF" width="24px" height="24px">
                     <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.36 11.36 0 003.54.56 1 1 0 011 1v3.59a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.6a1 1 0 011 1 11.36 11.36 0 00.56 3.54 1 1 0 01-.24 1z" />
                   </svg>
                 </div>
               </div>
             </div>
           </div>
           
            ) :   (
              <div className="call-connected text-white text-center relative h-full flex flex-col ">
              <h2 className="text-lg md:text-xl font-bold">Call Connected</h2>
              <p className="text-sm md:text-lg font-semibold mt-1">Time Left: {formatTime(timer)}</p>
            
              {/* Fixed Button Container */}
              <div className="call-end-btn absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  className="rounded-full p-4 bg-red-600 text-white w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-700 transition duration-300"
                  onClick={() => {
                    setAnswered(false);
                    endCall();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.36 11.36 0 003.54.56 1 1 0 011 1v3.59a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.6a1 1 0 011 1 11.36 11.36 0 00.56 3.54 1 1 0 01-.24 1z" />
                  </svg>
                </button>
              </div>
            </div>
              )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default AIPhoneUI;
