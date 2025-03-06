import VolumeVisualizer from './VolumeVisualizer';
import StatusPanel from './StatusPanel';
import MessagePanel from './MessagePanel';
import * as React from 'react';

export function LiveView() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <header className="bg-blue-600 p-4">
          <h3 className="text-white text-xl font-bold text-center">Voho AI Chat</h3>
        </header>
        {/* Content Area */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-1/3 p-4 border-b md:border-b-0 md:border-r border-gray-200">
            <StatusPanel />
            <div className="mt-4">
              <VolumeVisualizer />
            </div>
          </aside>
          {/* Main Chat Area */}
          <main className="md:w-2/3 p-4">
            <MessagePanel />
          </main>
        </div>
      </div>
    </div>
  );
}

export default LiveView;
