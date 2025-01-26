"use client";
import React, { useState } from "react";
import { PhoneCall } from "lucide-react"; // Importing an icon

const voices = [
  "Aaron", "Andrea", "Benji", "Beyond Average Joe", "Dakota H",
  "Harmony", "Heather - Mature British lady", "Josh Braun",
  "Kate - older British voice", "Natasha valley girl"
];

const VoiceAgentDemo = () => {
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);

  return (
    <div className="min-h-screen  text-black flex flex-col items-center px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold">10X Voice Agent Demo</h1>

      {/* Card Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6 w-full max-w-md text-center">
        <p className="text-gray-600">Your AI Assistant from Acme Computer Corp.</p>
        <p className="text-sm text-gray-500 mt-2">Choose from 50+ AI voices below</p>

        {/* Voice Selection */}
        <select
          className="w-full mt-4 px-4 py-3 border rounded-md"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice}>{voice}</option>
          ))}
        </select>

        {/* Start Call Button */}
        <button className="w-full cursor-pointer flex items-center justify-center mt-4 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-900">
          <PhoneCall className="mr-2" size={20} />
          Start Call
        </button>
      </div>

      {/* Popular Voices Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mt-6 w-full max-w-lg text-center">
        <h3 className="text-lg font-semibold flex items-center justify-center">
          <span className="mr-2">📢</span> Popular Voices
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          These voices are known for their natural and lifelike quality
        </p>

        {/* Grid of voices */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {voices.map((voice, index) => (
            <span key={index} className="bg-black text-white px-3 py-2 rounded-md text-sm">{voice}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentDemo;