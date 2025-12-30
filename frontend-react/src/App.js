import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('chat-history', (history) => setMessages(history));
    socket.on('receive-message', (msg) =>
      setMessages((prev) => [...prev, msg])
    );
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('send-message', input);
      setInput('');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Real-Time Chat App</h2>
      <div style={{ border: '1px solid #ccc', height: 300, overflowY: 'auto' }}>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.id.slice(0, 5)}:</b> {m.text}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
