import { useState, useRef, useEffect, useCallback } from "react";
import useVapi from "../../hooks/use-vapi";

  const VOICES = {
    English: ["Chris", "Jessica"],
    German: ["Frida", "Niander", "Andreas","Ava","Ben","Lana"],
  };
  const VOICE_LIST = [
  "Chris", "Jessica",
    "Frida", "Niander", "Andreas","Ava","Ben","Lana"
  ];

  const PREMADE_VOICES = ["6-Month Checkup", "John Is Calling You", "Sue Is Calling You"];
  
  const AIPhoneUI = () => {
    const [selectedVoice, setSelectedVoice] = useState("Chris");
    const [slideX, setSlideX] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [timer, setTimer] = useState();
    const sliderRef = useRef(null);
    const trackRef = useRef(null);
    const { volumeLevel, isSessionActive, toggleCall, statusText, endCall, Currentassistant } = useVapi();
  
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
            {Array.isArray(VOICE_LIST) && VOICE_LIST.length > 0 ? (
              VOICE_LIST.map((voice) => (
                <button
                  key={voice}
                  onClick={() => onVoiceChange(voice)}
                  disabled={answered === true}
                  className={`voice-btn p-2 md:p-3 border rounded-md flex flex-col items-center text-gray-700 text-sm md:text-lg transition ${selectedVoice === voice ? "border-[#283CFF] bg-[#283CFF] text-white shadow-md" : "border-gray-300 hover:bg-gray-200"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl mr-1.5">
                    <svg fill={`${selectedVoice === voice ? "!#FFFFFF" : "!#000000"}`} height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="m444.8,76.8c-6.8-9-19.7-10.9-28.8-4.2-9.1,6.7-11,19.4-4.2,28.4 64.8,85.9 64.8,225.6 0,311.5-6.8,9-5.1,21.9 4.2,28.4 11.4,7.9 24.8,1.2 28.8-4.2 74.9-99.1 74.9-260.6 0-359.9v-1.42109e-14z"></path> <path d="m394.7,143.2c-6.8-9-19.7-10.8-28.8-4.2-9.1,6.7-11,19.4-4.2,28.4 36.6,48.4 36.6,130.3 0,178.7-6.8,9-5,21.8 4.2,28.4 11.7,8.3 24.8,1.2 28.8-4.2 48.1-63.6 48.1-163.4 0-227.1z"></path> <path d="m291.9,438.3l-144.2-112.4v-138.2l144.2-112.3v362.9 5.68434e-14zm-185.4-122.8h-54.3v-117.7h54.3v117.7zm194.7-300.2l-180.1,141.9h-89.5c-11.4,0-20.6,9.1-20.6,20.3v158.2c0,11.2 9.2,20.3 20.6,20.3h91.2l178.4,140.7c12.8,10.1 31.9,1.1 31.9-15.1v-451.2c0-16.2-19-25.3-31.9-15.1z"></path> </g> </g> </g> </g></svg>
                    </span>{" "}
                    <span className={selectedVoice === voice ? "!text-[#FFFFFF]" : "!text-gray-500"}>
  {voice}
</span>
                  </div>
                  <span className={`text-xs ${selectedVoice === voice ? "!text-[#FFFFFF]" : "!text-gray-500"}`}>
                    {VOICES.English.includes(voice) ? "English" : "German"}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-gray-500 text-sm md:text-base">No voices available</p>
            )}
            </div>
          </div>
        </div>
        {/* {hasPermission === false && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md text-center mb-6">
            <p>Microphone access is required for AI calls. Please grant permission.</p>
            <button
              onClick={requestMicrophoneAccess}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Grant Microphone Access
            </button>
          </div>
        )} */}
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
           
          ) : !isSessionActive ? (
            <p className="text-white text-center text-xl font-bold">Connecting...</p>
          ) : (
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
