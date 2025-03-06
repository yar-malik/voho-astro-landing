import  { useState } from 'react';
import { useRealtimeSessionEngine } from 'gabber-client-react';
import * as React from 'react';

const InputBar: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendChatMessage, microphoneEnabled, setMicrophoneEnabled } = useRealtimeSessionEngine();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      await sendChatMessage({ text: message });
      setMessage('');
    }
  };

  return (
    <div>
      <button 
        onClick={() => setMicrophoneEnabled(!microphoneEnabled)}
        className={`mic-button ${microphoneEnabled ? 'active' : ''}`}
      >
        🎤
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={microphoneEnabled}
        />
        <button type="submit" disabled={microphoneEnabled}>
          Send
        </button>
      </form>
    </div>
  );
};

export default InputBar;