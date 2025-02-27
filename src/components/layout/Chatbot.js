"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { text: userInput, sender: "user" };
    const newMessages = [...messages, newUserMessage];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    // Format history with 'parts' array *before* sending
    const formattedHistory = chatHistory.map((item) => ({
      role: item.role,
      parts: [{ text: item.parts }],
    }));

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: formattedHistory, message: userInput }),
      });

      const data = await response.json();

      if (data.response) {
        const botMessage = { text: data.response, sender: "bot" };
        setMessages([...newMessages, botMessage]);

        // Update chatHistory *consistently* with role
        setChatHistory([
          ...chatHistory,
          { role: "user", parts: userInput },
          { role: "model", parts: data.response }, // Use "model" role for bot
        ]);
      } else if (data.error) {
        console.error("API Error:", data.error);
        setMessages([...newMessages, { text: data.error, sender: "bot" }]);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setMessages([
        ...newMessages,
        { text: "Error generating response.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-red-600 p-4 rounded-full shadow-lg hover:bg-red-700 transition-all flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
          whileTap={{ scale: 0.9 }}
        >
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            fill="#fff3dd"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.48 4h4l.5.5v2.03h.52l.5.5V8l-.5.5h-.52v3l-.5.5H9.36l-2.5 2.76L6 14.4V12H3.5l-.5-.64V8.5h-.5L2 8v-.97l.5-.5H3V4.36L3.53 4h4V2.86A1 1 0 0 1 7 2a1 1 0 0 1 2 0 1 1 0 0 1-.52.83V4zM12 8V5H4v5.86l2.5.14H7v2.19l1.8-2.04.35-.15H12V8zm-2.12.51a2.71 2.71 0 0 1-1.37.74v-.01a2.71 2.71 0 0 1-2.42-.74l-.7.71c.34.34.745.608 1.19.79.45.188.932.286 1.42.29a3.7 3.7 0 0 0 2.58-1.07l-.7-.71zM6.49 6.5h-1v1h1v-1zm3 0h1v1h-1v-1z"
              ></path>
            </g>
          </svg>
        </motion.button>
      )}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="w-72 sm:w-80 md:w-96 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-300 mt-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-600 p-4 flex justify-between items-center text-white"
          >
            <h2 className="text-lg font-semibold">Pizza Bot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white w-10 text-2xl hover:text-gray-400 font-bold border-none"
            >
              X
            </button>
          </motion.div>

          <div className="p-4 h-72 sm:h-80 md:h-96 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-xl max-w-[80%] text-sm shadow-md ${
                  msg.sender === "user"
                    ? "bg-red-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-center">
                <img src="/loader.gif" width="30" alt="Loading..." />
              </div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="p-4 border-t flex items-center justify-center gap-2 bg-white"
          >
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me about our pizzas..."
              className="w-full p-2 mt-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-red-600 w-36 text-white p-2 rounded-xl hover:bg-red-700 transition-all"
            >
              Send
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
