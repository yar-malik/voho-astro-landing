import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import { RealtimeSessionEngineProvider } from 'gabber-client-react';
import type { SDKConnectOptions } from 'gabber-client-core';
import Chat from './LiveView';
import * as React from 'react';
function Demo() {
  const [sessionConnectOpts, setSessionConnectOpts] = useState<SDKConnectOptions | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. If session has not started, show the circular mic button
  //    and “Start Session” text (or “Connecting...” while loading).
  if (!sessionConnectOpts) {
    return (
      <div className="flex flex-col items-center mt-10 space-y-4">
        {/* Circular mic button */}
        <motion.div
          className="pulse-button   flex items-center text-center justify-center 
                     w-16 h-16 rounded-full shadow-lg 
                     hover:scale-105 transition-transform duration-200"
          style={{ cursor: "pointer" }}
          animate={{ backgroundColor: ["#283CFF", "#283CFF", "#283CFF"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            onClick={async () => {
              console.log("Connecting...");
              setLoading(true);
              try {
                const res = await axios.post("/api/startSession");
                setSessionConnectOpts(res.data);
              } catch (error) {
                console.error(error);
              } finally {
                setLoading(false);
              }
            }}
            className="flex items-center justify-center w-full h-full"
            disabled={loading}
          >
              <Mic size={28} className="text-white" />
          </button>
        </motion.div>

        {/* Text label under the circle */}
        <span className="text-gray-700 text-sm">
          {loading ? "Please wait..." : "Start Session"}
        </span>
      </div>
    );
  }

  // 2. If sessionConnectOpts exists, render the main Chat UI.
  return (
    <div>
      <RealtimeSessionEngineProvider connectionOpts={sessionConnectOpts}>
        <Chat />
      </RealtimeSessionEngineProvider>
    </div>
  );
}

export default Demo;
