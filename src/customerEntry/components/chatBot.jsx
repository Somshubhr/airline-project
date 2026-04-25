import { useEffect, useState } from "react";

export default function Chatbot({ userName = "there" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: `Hi ${userName}! How can I help you today?`, sender: "bot" },
  ]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    setMessages([{ text: `Hi ${userName}! How can I help you today?`, sender: "bot" }]);
  }, [userName]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!dragging) {
        return;
      }

      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setMessages((prev) => [
        ...prev,
        { text: "You are back online.", sender: "bot" },
      ]);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setMessages((prev) => [
        ...prev,
        { text: "You are offline. Some features may not work.", sender: "bot" },
      ]);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const getBotReply = (message) => {
    const text = message.toLowerCase();

    if (text.includes("flight")) {
      return `${userName}, you can check available flights in the dashboard.`;
    }
    if (text.includes("price")) {
      return "Prices vary based on route and timing.";
    }
    if (text.includes("book")) {
      return "Booking feature will be available soon.";
    }
    if (text.includes("hello") || text.includes("hi")) {
      return `Hello ${userName}! How can I assist you today?`;
    }

    return "Sorry, I didn't understand that.";
  };

  const sendMessage = () => {
    if (!input.trim()) {
      return;
    }

    if (!isOnline) {
      setMessages((prev) => [
        ...prev,
        { text: "Cannot send message. No internet connection.", sender: "bot" },
      ]);
      return;
    }

    const userMessage = { text: input, sender: "user" };
    const botMessage = { text: getBotReply(input), sender: "bot" };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <>
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            zIndex: 1000,
          }}
        >
          <button
            onMouseDown={handleMouseDown}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-5 right-5 rounded-full p-4 text-white shadow-lg ${
              isOnline ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            Chat
          </button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-5 right-5 flex w-80 flex-col rounded-xl bg-white shadow-xl">
          <div className="flex items-center justify-between rounded-t-xl bg-blue-500 p-3 text-white">
            <span>{userName}'s Assistant</span>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>

          <div className="h-60 overflow-y-auto p-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-1 rounded-lg p-2 text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-right text-white"
                    : "bg-gray-200 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              className="flex-1 px-2 py-2 text-sm outline-none"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={`Type a message, ${userName}...`}
            />
            <button onClick={sendMessage} className="bg-blue-500 px-4 text-white">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
