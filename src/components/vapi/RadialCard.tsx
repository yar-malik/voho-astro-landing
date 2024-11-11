"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
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
      <motion.div
        className={`relative w-20 h-20 rounded-full flex items-center justify-center ${
          isSessionActive ? 'bg-[#4CAF50]' : 'bg-[#283CFF]'
        } shadow-lg hover:scale-105 transition-transform duration-200`}
        onClick={toggleCall}
        style={{ cursor: 'pointer' }}
        animate={isSessionActive ? { y: [0, -10, 0] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {!isSessionActive && <Mic size={28} className="text-white" />}
        {isSessionActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/20"
            style={{ boxShadow: '0 0 30px 5px rgba(255, 255, 255, 0.2)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        )}
      </motion.div>
      <div className="mt-4 px-4 py-1 border border-white/50 rounded-full bg-[#252d2954] text-sm text-white opacity-90">
        Give it a try!
      </div>
      {isSessionActive && (
        <div className="absolute flex space-x-1">
          {bars.map((height, index) => (
            <motion.div
              key={index}
              className="w-1 bg-[#4CAF50]"
              style={{
                height: `${height}px`,
              }}
              animate={{
                height: [height, height + 5, height],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                delay: index * 0.05,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RadialCard;
