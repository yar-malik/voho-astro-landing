"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import useVapi from '../../hooks/use-vapi';

const RadialCard: React.FC = () => {
    const { volumeLevel, isSessionActive, toggleCall } = useVapi();
    const [bars, setBars] = useState(Array(50).fill(0));
   
    useEffect(() => {
      if (isSessionActive) {
        updateBars(volumeLevel);
      } else {
        resetBars();
      }
    }, [volumeLevel, isSessionActive]);
   
    const updateBars = (volume: number) => {
      setBars((prevBars) => prevBars.map(() => Math.random() * volume * 50));
    };
    
   
    const resetBars = () => {
      setBars(Array(50).fill(0));
    };
   
    return (
      <div className="flex flex-col items-center justify-center">
  <div
    className="w-20 h-20 rounded-full flex items-center justify-center bg-[#283CFF] shadow-lg hover:scale-105 transition-transform duration-200"
    onClick={toggleCall}
    style={{ cursor: 'pointer' }}
  >
    {isSessionActive ? (
      <MicOff size={28} className="text-white" />
    ) : (
      <Mic size={28} className="text-white" />
    )}
  </div>
  <div className="mt-4 px-4 py-1 border border-white/50 rounded-full bg-[#252d2954] text-sm text-white opacity-90">
    Give it a try !
  </div>
</div>

    );
  };
   
  export default RadialCard;

