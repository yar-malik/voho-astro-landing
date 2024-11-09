import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, PhoneOff } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import Button from "./Button";

const VapiAssistant = ({ assistantId }) => {
  const [vapi, setVapi] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    console.log('Initializing Vapi instance...');
  
    const vapiInstance = new Vapi('e5c00e52-3011-4a65-a46c-270c9d0fa091');
    setVapi(vapiInstance);
    console.log('Vapi instance created:', vapiInstance);
  
    vapiInstance.on('call-start', () => {
      console.log('Call started.');
      setIsCallActive(true);
      setIsConnecting(false);
    });
  
    vapiInstance.on('call-end', () => {
      console.log('Call ended.');
      setIsCallActive(false);
    });
  
    return () => {
      console.log('Cleaning up Vapi instance...');
      vapiInstance.stop();
    };
  }, []);
  
  const startCall = () => {
    console.log('Attempting to start the call...');
    if (vapi && assistantId) {
      setIsConnecting(true);
      console.log('Connecting to assistant with ID:', assistantId);
  
      vapi.start(assistantId)
        .then(() => {
          console.log('Call started successfully.');
          // retrieveOrderDetails();
        })
        .catch((error) => {
          console.error('Error starting the call:', error);
          setIsConnecting(false);
        });
    } else {
      console.warn('Vapi instance or assistantId is not available.');
    }
  };
  
  const stopCall = () => {
    console.log('Attempting to stop the call...');
    if (vapi) {
      vapi.stop();
      console.log('Call stopped.');
    } else {
      console.warn('Vapi instance is not available to stop the call.');
    }
  };
  
  return (
    <div className="h-screen mt-4 border border-gray-200 rounded-lg p-4">
      <div className="flex justify-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Test Audio
        </h2>
      </div>
      
      <div className="flex flex-col items-center justify-center h-full mt-[-50px]">
        <div className="flex flex-col items-center space-y-4">
          <Mic className="w-16 h-16 text-gray-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Test your agent</h2>

          {!isCallActive ? (
            <Button
              onClick={startCall}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <div className="flex items-center">
                  <FaSpinner className="mr-2 animate-spin text-gray-300" />
                  <span className="text-gray-300">Connecting</span>
                </div>
              ) : (
                <span>Test</span>
              )}
            </Button>
          ) : (
            <button
              onClick={stopCall}
              className="bg-red-600 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition duration-200 flex items-center"
            >
              <PhoneOff className="mr-2 text-white" />
              <span>End Call</span>
            </button>
          )}
        </div>

        {orderDetails && (
          <div className="mt-8 bg-gray-100 p-6 rounded-lg border border-gray-300 w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Details:</h3>
            <pre className="text-sm text-gray-600 overflow-x-auto">{JSON.stringify(orderDetails, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default VapiAssistant;