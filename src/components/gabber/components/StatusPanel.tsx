import { useRealtimeSessionEngine } from 'gabber-client-react';
import { useEffect } from 'react';
import * as React from 'react';

function StatusPanel() {
  const { connectionState, agentState, microphoneEnabled, setMicrophoneEnabled } = useRealtimeSessionEngine();

  const stateColorClass =
  agentState === 'listening'
    ? 'text-green-500'
    : agentState === 'speaking'
    ? 'text-blue-500'
    : agentState === 'thinking'
    ? 'text-red-500'
    : 'text-gray-800';
  return (
    <div className="p-4 bg-white   shadow rounded-lg">
      <div className="flex justify-between">
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600">Connection:</p>
        <p className="text-lg font-semibold text-gray-800">{connectionState}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-600">Agent State:</p>
        <p className={`text-lg font-semibold ${stateColorClass}`}>{agentState}</p>
      </div>
      </div>
      <button 
        onClick={() => setMicrophoneEnabled(!microphoneEnabled)}
        className="  w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded shadow transition-colors duration-200"
      >
        {microphoneEnabled ? 'Disable Mic' : 'Enable Mic'}
      </button>
    </div>
  );
}

export default StatusPanel;
