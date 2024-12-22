import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ChatRoom() {
  const [messages, setMessages] = useState([]); // Store messages
  const [input, setInput] = useState(""); // Store input value
  const socketRef = useRef(null); // WebSocket instance
  const { room } = useParams(); // Get room name from URL
  const username = "admin";
  const password = "admin";

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket(
      `ws://localhost:8001/ws/asc/${room}/?username=${username}&password=${password}`
    );

    // Handle incoming messages
    socketRef.current.onmessage = (e) => {
      console.log("Message received:", e.data);
      const data = JSON.parse(e.data);

      setMessages((prev) => [...prev, data]);
    };

    // Handle WebSocket closure
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []); // Reconnect when room or credentials change

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      // Send message if WebSocket is open
      const messages = {
        message: input,
      };
      socketRef.current.send(JSON.stringify(messages));
      setInput(""); // Clear input field
    } else {
      console.log("WebSocket is not open.");
    }
  };

  return (
    <div>
      <h2>Chat Room: {room}</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div>
      <div>
        <input
          style={{ border: "2px solid red", marginRight: "10px" }}
          type="text"
          onChange={(e) => setInput(e.target.value)} // Corrected onChange
          value={input}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
