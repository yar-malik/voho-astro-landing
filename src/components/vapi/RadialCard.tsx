"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import useVapi from "../../hooks/use-vapi";
import DataModal from './DataModal';

// Inline styles for the pulse button and keyframes
const styles = `
.pulse-button {
  width: 80px;
  height: 80px;
  font-size: 24px;
  color: #fff;
  background: #283CFF;
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Inject styles */}
      <style>{styles}</style>

      {/* Button with pulse animation */}
      <motion.div
        className="pulse-button flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
        onClick={() => setIsModalOpen(true)}
        style={{ cursor: "pointer" }}
        animate={
          isSessionActive
            ? { backgroundColor: ["#283CFF", "#283CFF", "#283CFF"] }
            : { backgroundColor: ["#283CFF"] }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Mic size={28} className="text-white" />
      </motion.div>

      {/* Dynamic status text */}
      <div className="mt-4 px-4 py-1 border border-white/50 rounded-full bg-[#252d2954] text-sm text-white opacity-90">
        {statusText}
      </div>
      {/* Modal Component */}
      {isModalOpen && <DataModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default RadialCard;
