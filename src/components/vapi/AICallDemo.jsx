import React from "react";
import Demo1 from "./demos/Sarah+(1).mp3";
import Demo2 from "./demos/664a6d4d7068a5a75a312d46.mp3";
import Demo3 from "./demos/664a4cbd5625fa426e6d6644.mp3";


const demos = [
  { 
    title: "AI Call Demo - Male", 

    description: "Turn cold leads into hot prospects with AI-powered conversations.", 
    icon: "🎤", 
    audioSrc: Demo1
  },

  { 
    title: "AI Call Demo - Female", 
    description: "Turn cold leads into hot prospects with AI-powered conversations.", 
    icon: "🎧", 
    audioSrc: Demo2

  },
  { 
    title: "AI Call Demo - Male", 
    description: "AI follow-up calls, SMS, and emails to increase appointment show-up rates.", 
    icon: "💬", 
    audioSrc: Demo3
  }
];


const AICallDemo = () => {
  return (
    <section className="bg-white text-black py-12 max-w-6xl mx-auto">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Listen To AI Conversations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo, index) => (
            <div key={index} className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col items-center">
              {/* <div className="text-4xl mb-4">{demo.icon}</div> */}

              <h3 className="text-xl font-semibold mb-2">{demo.title}</h3>
              <p className="text-gray-300 mb-4">{demo.description}</p>
              <audio controls className="w-full">
                <source src={demo.audioSrc} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AICallDemo;
