"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import useVapi from "../../hooks/use-vapi";

const RadialCard: React.FC = () => {
  const { volumeLevel, isSessionActive, toggleCall, statusText } = useVapi();
  const [bars, setBars] = useState(Array(50).fill(0));


  useEffect(() => {
    if (isSessionActive) {
     
      const timeout = setTimeout(() => {
       
      }, 2000); // Simulating connection delay
      return () => clearTimeout(timeout);
    } else {
      
    }
  }, [isSessionActive]);

  const updateBars = (volume: number) => {
    setBars((prevBars) => prevBars.map(() => Math.random() * volume * 50));
  };

  const resetBars = () => {
    setBars(Array(50).fill(0));
  };

  useEffect(() => {
    if (isSessionActive) {
      updateBars(volumeLevel);
    } else {
      resetBars();
    }
  }, [volumeLevel, isSessionActive]);

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Button */}
      {/* {isSessionActive && ( */}
        {/* <div className="absolute inset-4 flex items-center justify-center">
          {bars.map((height, index) => (
            <motion.div
              key={index}
              className="absolute border-2 border-[#283CFF] rounded-full"
              style={{
                width: `${20 + index * 1}px`,
                height: `${10 + index * 1}px`,
                opacity: 0.1,
              }}
              animate={{
                scale: [1, 1],
                opacity: [0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.05,
              }}
            />
          ))}
        </div> */}
      {/* )} */}
      <motion.div
        className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200`}
        onClick={toggleCall}
        style={{ cursor: "pointer" }}
        animate={
          isSessionActive
            ? { backgroundColor: ["#283CFF", "#87cefa", "#5454ff"] }
            : { backgroundColor: ["#283CFF"]}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {!isSessionActive && <Mic size={28} className="text-white" />}
      </motion.div>

      {/* Animated waves */}
    

      {/* Dynamic status text */}
      <div className="mt-4 px-4 py-1 border border-white/50 rounded-full bg-[#252d2954] text-sm text-white opacity-90">
        {statusText}
      </div>
    </div>
  );
};

export default RadialCard;
