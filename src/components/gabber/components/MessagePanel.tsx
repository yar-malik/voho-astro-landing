import { useRealtimeSessionEngine } from 'gabber-client-react';
import * as React from 'react';
import { useState } from 'react';


export function MessagePanel() {
  const { messages, transcription, sendChatMessage } = useRealtimeSessionEngine();
  const [inputMessage, setInputMessage] = useState('');

  return (
    <div>
      <h4>Messages:</h4>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className={`text-xs ${msg.agent ? 'text-blue-600' : 'text-gray-700'}`}>
              {msg.agent ? 'Agent: ' : 'You: '}{msg.text}
            </li>
          ))}
          {/* {transcription.text && (
            <li>Transcription: {transcription.text}</li>
          )} */}
        </ul>
      </div>
      
      <div>
        {/* <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            sendChatMessage({ text: inputMessage });
            setInputMessage('');
          }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              formAction='submit'
            >
              Send
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default MessagePanel;
