import { useState, useRef, useEffect } from "react";
import useVapi from "../../hooks/use-vapi";
const AIPhoneUI = () => {
  const [selectedVoice, setSelectedVoice] = useState("Chris");
  const [slideX, setSlideX] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer] = useState(120);
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const { volumeLevel, isSessionActive, toggleCall, statusText, endCall, Currentassistant } = useVapi();

  useEffect(() => {
    if (answered && isSessionActive === false) {
      setTimer(120)
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
  const voices = [
    "Chris",
    "Jessica",
    "Frida",
    "Niander",
    // "Sue",
    // "Matthew",
    // "Emma",
    // "Fred",
    // "Sam",
  ];
  const preMadeVoices = [
    "6-Month Checkup",
    "John Is Call You",
    "Sue Is Call You",
  ];
  const EnglishVoices = [
    "Chris",
    "Jessica",
  ]
  const GermanVoices = [
    "Frida",
    "Niander",
  ]
  return (
    <div className="flex flex-col items-center p-10  min-h-screen">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <span className="text-[#283CFF] text-4xl mr-2">●</span>
          <span className="leading-tight">
            Customize The Voice And The Personality Of Your AI Calling
            Assistant.
          </span>
        </h1>
        {/* <p className="text-gray-500 mt-2">
          You Can Customize Your AI Assistant To Reflect Your Dental Brand...
        </p> */}
      </div>

      <div className="flex  md:flex-row items-start w-full max-w-5xl">
        <div className="flex flex-col w-full items-center justify-center h-full md:w-2/3">
          {/* Left - Voice Selection */}
          <div className="w-full  bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Select a voice to Experience the AI Calling Assistant
            </h2>
            <p className="text-gray-500 mt-2">
              We offer a selection of over 70 different AI assistant voices for
              you to choose from. Below, you will find a few sample options.
              Please select one to experience the demo.
            </p>

            <div className="voice-grid grid grid-cols-4 gap-4 mt-4">
              {voices.map((voice) => (
                <button
                  key={voice}
                  onClick={() => onVoiceChange(voice)}
                  disabled={answered === true}
                  className={`voice-btn p-3 border rounded-md flex flex-col items-center text-gray-700 text-lg transition ${selectedVoice === voice
                    ? "border-[#283CFF] bg-[#283CFF] text-white shadow-md"
                    : "border-gray-300 hover:bg-gray-200"
                    }`}
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
                    </span>{" "}
                    <span>{voice}</span>
                  </div>
                  <span className={`text-xs ${selectedVoice === voice ? "text-white" : "text-gray-500"}`}>
                    {EnglishVoices.includes(voice) ? "English" : "German"}
                  </span>

                </button>
              ))}
            </div>
          </div>

          {/* Pre-made Voice Selection */}
          {/* <div className="mt-6 p-6 bg-[#283CFF] shadow-lg rounded-lg  w-full">
            <h2 className="text-xl font-semibold text-white">
              Select a voice to represent your dental practice.
            </h2>
            <p className="text-white mt-2">
              In addition to customizing your own AI's personality, you can also
              choose from over 15 pre-made, tested personality designs.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {preMadeVoices.map((voice, index) => (
                <button
                  key={voice}
                  className={`p-3 border rounded-md flex flex-col items-center bg-gray-900 text-white transition hover:bg-[#283CFF] hover:text-white  ${index === 1 ? "border-black" : "border-gray-900"
                    }`}
                >
                  <span className="text-white">{voice}</span>
                </button>
              ))}
            </div>
          </div> */}
        </div>

        {/* Right - Virtual Phone UI */}
        <div className="w-full md:w-1/3 flex h-[545px] justify-center mt-10 md:mt-0">
          <div className=" phone relative bg-gray-900 !w-72 !h-[545px] rounded-3xl border-4 border-[#283CFF] shadow-lg flex flex-col items-center justify-center p-">
            {!answered ? (
              <>
                <div className="bg-gray-800 text-white text-center py-2 px-4 w-full rounded-md">
                  <p className="text-sm">The 10x Model </p>
                </div>

                <p className="text-gray-400 text-sm mt-10">Please wait...</p>
                <h2 className="text-white text-xl font-bold mt-2">
                  Incoming call
                </h2>
                <h3 className="selected-voice text-[#283CFF] text-lg font-semibold mt-2">
                  {selectedVoice} AI  Assistant
                </h3>
                {/* <p className="text-gray-300 text-sm">Office Number</p> */}

                <div className="slide-btn-container absolute bottom-6 w-full flex justify-center">
                  <div
                    ref={trackRef}
                    className="slide-btn relative w-64 h-14 rounded-full flex items-center justify-center text-white font-bold overflow-hidden"
                    style={{
                      background: `linear-gradient(to right, rgb(40, 60, 255) ${slideX}px, rgba(40, 60, 255, 0.3) ${slideX + 50}px)`,
                      transition: "background 0.2s ease-out",
                    }}
                  >
                    <p className="absolute w-full text-center">
                      {slideX >= 100 ? "Connecting..." : "Slide to Answer"}
                    </p>

                    {/* Sliding Button */}
                    <div
                      ref={sliderRef}
                      className="slide-btn-inner absolute left-0 w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        transform: `translateX(${slideX}px)`,
                        transition: "transform 0.2s ease-out",
                      }}
                      onMouseDown={handleStart}
                      onTouchStart={handleStart}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#283CFF"
                        width="28px"
                        height="28px"
                      >
                        <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.36 11.36 0 003.54.56 1 1 0 011 1v3.59a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.6a1 1 0 011 1 11.36 11.36 0 00.56 3.54 1 1 0 01-.24 1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            ) : !isSessionActive ? (
              <p className="text-white text-center text-xl font-bold">Connecting...</p>
            ) : (
              <div className="text-white text-center">
                <h2 className="text-xl font-bold">Call Connected</h2>
                <p className="text-lg font-semibold mt-2">Time Left: {formatTime(timer)}</p>
                <button className="call-end-btn bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => {
                  setAnswered(false);
                  endCall();
                }}>
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
      </div>
    </div>
  );
};

export default AIPhoneUI;
