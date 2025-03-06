import { useRealtimeSessionEngine } from 'gabber-client-react';
import * as React from 'react';

function VolumeVisualizer() {
  const { agentVolumeBands, userVolumeBands, remainingSeconds } = useRealtimeSessionEngine();

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold mb-4">Volume Bands</h4>
      
      {/* AI Volume Bars */}
      <div className="mb-4">
        <p className="font-medium text-gray-700 mb-1">AI:</p>
        <div className="flex items-end space-x-1 h-20">
          {agentVolumeBands.map((band, index) => (
            <div
              key={index}
              style={{ height: `${band * 100}%` }}
              className="w-4 bg-blue-500 rounded"
            ></div>
          ))}
        </div>
      </div>
      
      {/* User Volume Bars */}
      <div className="mb-4">
        <p className="font-medium text-gray-700 mb-1">User:</p>
        <div className="flex items-end space-x-1 h-20">
          {userVolumeBands.map((band, index) => (
            <div
              key={index}
              style={{ height: `${band * 100}%` }}
              className="w-4 bg-green-500 rounded"
            ></div>
          ))}
        </div>
      </div>
      
      {/* Remaining Time */}
      {remainingSeconds !== null && (
        <div className="mt-2">
          <h4 className="text-md font-medium text-gray-700">Remaining Time:</h4>
          <p className="text-gray-600">{remainingSeconds} seconds</p>
        </div>
      )}
    </div>
  );
}

export default VolumeVisualizer;
