"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import useVapi from "../../hooks/use-vapi";

// Inline styles for the pulse button and keyframes
const styles = `
.pulse-button {
  width: 80px;
  height: 80px;
  font-size: 24px;
  color: #fff;
  background: #6200ea;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
`;

const RadialCard: React.FC = () => {
  const { volumeLevel, isSessionActive, toggleCall, statusText } = useVapi();
  const [bars, setBars] = useState(Array(50).fill(0));

  useEffect(() => {
    if (isSessionActive) {
      const timeout = setTimeout(() => {}, 2000); // Simulating connection delay
      return () => clearTimeout(timeout);
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
      {/* Inline styles injected into the head */}
      <style>{styles}</style>

      {/* Button with pulse animation */}
      <motion.div
        className="pulse-button flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
        onClick={toggleCall}
        style={{ cursor: "pointer" }}
        animate={
          isSessionActive
            ? { backgroundColor: ["#283CFF", "#87cefa", "#5454ff"] }
            : { backgroundColor: ["#283CFF"] }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        {!isSessionActive && <Mic size={28} className="text-white" />}
      </motion.div>

      {/* Dynamic status text */}
      <div className="mt-4 px-4 py-1 border border-white/50 rounded-full bg-[#252d2954] text-sm text-white opacity-90">
        {statusText}
      </div>
    </div>
  );
};

export default RadialCard;
