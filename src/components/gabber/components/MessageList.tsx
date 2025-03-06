import { useRealtimeSessionEngine } from 'gabber-client-react';
import * as React from 'react';

export function MessageList() {
  const { messages } = useRealtimeSessionEngine();

  return (
    <div>
      {messages.map((message, index) => (
        <div 
          key={index} 
        >
          <div>
            {message.agent ? "agent" : "user"}:{message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;