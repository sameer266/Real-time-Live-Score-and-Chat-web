import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../style/chatroom.css"; // Make sure to include the updated CSS file

import Chat_Group_Data from "../data/AllMessageData";

function ChatRoom() {
  const [messages, setMessages] = useState([]); // Store messages
  const [chatMessage, setChatMessage] = useState([]); // Store database messages
  const [input, setInput] = useState(""); // Store input value
  const socketRef = useRef(null); // WebSocket instance
  const { room } = useParams(); // Get room name from URL
  const username = "admin"; // Example username
  const password = "admin"; // Example password

  // Initialize WebSocket connection
  useEffect(() => {
    socketRef.current = new WebSocket(
      `ws://localhost:8001/ws/asc/${room}/?username=${username}&password=${password}`
    );

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]); // Update messages
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close(); // Clean up WebSocket
      }
    };
  }, [room]);

  // Fetch messages from the server database
  useEffect(() => {
    const fetchMessages = async () => {
      const data = await Chat_Group_Data(room);
      setChatMessage(data.message); // Store messages from the database
    };
    fetchMessages();
  }, [room,setChatMessage]);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const messageData = {
        message: input,
        user: username,
      };
      socketRef.current.send(JSON.stringify(messageData)); // Send message via WebSocket
      setInput(""); // Clear input field after sending
   
    }
  };

  // Function to format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    // Format the day of the week and the time (HH:MM AM/PM)
    const options = { 
      weekday: 'short', // Weekday as a short name (e.g., Mon, Tue)
      hour: '2-digit',  // Hour in 2-digit format (12)
      minute: '2-digit', // Minute in 2-digit format (00)
      hour12: true, // Use 12-hour clock with AM/PM
    };
    const formattedDate = date.toLocaleString('en-US', options);
    
    return formattedDate;
  };
  

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room: {room}</h2>
      </div>

      <div className="chat-messages">
        {/* --------Database Messages Display------ */}
        {chatMessage.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble-container ${
              msg.sender === username ? "chat-bubble-sender-container" : ""
            }`}
          >
            <p className="chat-username">
              {msg.sender === username ? "You" : msg.sender}
            </p>
            <div
              className={`chat-bubble ${
                msg.sender === username ? "chat-bubble-sender" : ""
              }`}
            >
              <span>{msg.content}</span>
            </div>
            <div className="chat-timestamp">
              <p>{formatTimestamp(msg.timestamp)}</p>
            </div>
          </div>
        ))}

        {/* --------Real-time Messages Display (No Timestamp)------ */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble-container ${
              msg.user === username ? "chat-bubble-sender-container" : ""
            }`}
          >
            <p className="chat-username">
              {msg.user === username ? "You" : msg.user}
            </p>
            <div
              className={`chat-bubble ${
                msg.user === username ? "chat-bubble-sender" : ""
              }`}
            >
              <span>{msg.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          className="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
        />
        <button className="chat-send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
