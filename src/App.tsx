import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null); // Ensure type safety
  const inputRef = useRef<HTMLInputElement | null>(null);

  function SendMessage() {
    if (!socket || !inputRef.current) return;
    const message = inputRef.current.value;
    socket.send(message);
    inputRef.current.value = ""; // Clear the input field
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);

    ws.onmessage = (ev) => {
      alert(ev.data);
    };
  }, []);

  return (
    <div>
      <input type="text" placeholder="Message.." ref={inputRef} />
      <button onClick={SendMessage}>Send</button>
    </div>
  );
}

export default App;
