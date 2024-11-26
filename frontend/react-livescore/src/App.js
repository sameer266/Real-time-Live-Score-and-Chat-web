import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const roomName = "sameer";
  const user = "admin";
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const websocketRef = useRef(null);

  const get_data = async () => {
    const response = await fetch('http://127.0.0.1:8001/chat/join/sameer/');
    const data = await response.json();
    console.log(data.message);

    const store_msg = data.message.map((msg) => ({
      sender: msg.sender,
      content: msg.content,
      timestamp: msg.timestamp,
    }));

    setMessages(store_msg);
  };

  useEffect(() => {
    // Fetch initial chat data
    get_data();

    // Connect to WebSocket
    const socketUrl = `ws://127.0.0.1:8000/ws/asc/${roomName}/`; // Adjust for your WebSocket URL
    websocketRef.current = new WebSocket(socketUrl);

    // Listen for incoming messages
    websocketRef.current.onmessage = (event) => {
      console.log(event);
      const data = JSON.parse(event.data);

      if (data.message) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: user, // Set the sender to the current user
            content: data.message,
            timestamp: new Date().toISOString(), // Add a timestamp
          },
        ]);
      }
    };

    websocketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    websocketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      websocketRef.current.close();
    };
  }, [roomName]);

  // Handle sending a message
  const sendMessage = () => {
    if (message.trim() === '') return;

    const messageData = {
      message: message,
    };

    websocketRef.current.send(JSON.stringify(messageData));
    setMessage('');
  };

  return (
    <div>
      <h2>Chat Room: {roomName}</h2>
      <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.sender}</strong>: {msg.content}
            <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        style={{ width: '100%', padding: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '10px', marginTop: '10px' }}>
        Send
      </button>
    </div>
  );
};

export default App;
