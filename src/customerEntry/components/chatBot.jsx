import React, { useState, useEffect } from "react";
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! How can I help you?", sender: "bot" }
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

    const handleMouseMove = (e) => {
        if (!dragging) return;

        setPosition({
            x: e.clientX,
            y: e.clientY
        });
    };
    useEffect(() => {
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
                { text: "✅ You are back online!", sender: "bot" }
            ]);
        };

        const handleOffline = () => {
            setIsOnline(false);

            setMessages((prev) => [
                ...prev,
                { text: "⚠️ You are offline. Some features may not work.", sender: "bot" }
            ]);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    // 🔥 Rule-based replies
    const getBotReply = (msg) => {
        const text = msg.toLowerCase();

        if (text.includes("flight")) {
            return "You can check available flights in the dashboard.";
        }
        if (text.includes("price")) {
            return "Prices vary based on route and timing.";
        }
        if (text.includes("book")) {
            return "Booking feature will be available soon.";
        }
        if (text.includes("hello") || text.includes("hi")) {
            return "Hello! How can I assist you today?";
        }

        return "Sorry, I didn't understand that.";
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        // 🚫 Block when offline
        if (!isOnline) {
            setMessages((prev) => [
                ...prev,
                { text: "❌ Cannot send message. No internet connection.", sender: "bot" }
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
            {/* 💬 Floating Button */}
            {!isOpen && (
                <div
                    style={{
                        position: "fixed",
                        left: position.x,
                        top: position.y,
                        zIndex: 1000
                    }}
                >
                    <button
                        onMouseDown={handleMouseDown}
                        onClick={() => setIsOpen(true)}
                        className={`fixed bottom-5 right-5 text-white p-4 rounded-full shadow-lg ${isOnline ? "bg-blue-500" : "bg-red-500"
                            }`}
                    >
                        💬
                    </button>
                </div>
            )}

            {/* 🧠 Chat Window */}
            {isOpen && (
                <div className="fixed bottom-5 right-5 w-80 bg-white shadow-xl rounded-xl flex flex-col">

                    {/* Header */}
                    <div className="flex justify-between items-center bg-blue-500 text-white p-3 rounded-t-xl">
                        <span>Chatbot</span>
                        <button onClick={() => setIsOpen(false)}>❌</button>
                    </div>

                    {/* Messages */}
                    <div className="h-60 overflow-y-auto p-2">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 my-1 rounded-lg text-sm ${msg.sender === "user"
                                    ? "bg-blue-500 text-white text-right"
                                    : "bg-gray-200 text-left"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex border-t">
                        <input
                            className="flex-1 px-2 py-2 text-sm outline-none"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type message..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 text-white px-4"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;