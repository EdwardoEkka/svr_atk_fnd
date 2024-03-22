import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://192.168.1.2:5000'); // Replace with your server URL

function Sky() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Function to send message
  const sendMessage = () => {
    socket.emit('talk', message);
    setMessage('');
  };

  useEffect(() => {
    // Listen for incoming messages
    socket.on('talk', data => {
      // Update messages with the new message
      setMessages(prevMessages => [...prevMessages, data]);
    });

    // Cleanup when component unmounts
    return () => {
      socket.off('talk');
    };
  }, []);

  return (
    <div>
      {/* <h1>Socket.io Chat</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div> */}
      <div>
        <h2>Events:</h2>
        <h4>All the attack events will be notified here.</h4>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sky;
