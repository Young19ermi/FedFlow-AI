// "use client";
// import { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";

// export default function HotelChat() {
//   const [messages, setMessages] = useState<{ role: string; content: string }[]>(
//     []
//   );
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   const webhookUrl =
//     "https://hcx-resort.app.n8n.cloud/webhook-test/3c2b4e29-6a6d-4431-8854-f718a99cfca5";

//   // Scroll to the bottom of chat
//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, scrollToBottom]);

//   // Send message to n8n
//   const sendMessage = useCallback(async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       // The provided axios.post request
//       const response = await axios.post(webhookUrl, {
//         message: input, // Use the user input here
//       });
//       console.log(response);
//       // Assuming the response contains the data in response.data.output
//       const aiMessage = {
//         role: "assistant",
//         content: response.data.output || "Sorry, something went wrong!",
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "Oops, I’m having trouble!" },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [input]);

//   // Handle Enter key
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 h-[500px] flex flex-col">
//       {/* Chat Header */}
//       <div className="text-center mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">
//           Hotel AI Assistant
//         </h2>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-50 rounded-lg">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-2 flex ${
//               msg.role === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-xs p-3 rounded-lg ${
//                 msg.role === "user"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {msg.content}
//             </div>
//           </div>
//         ))}
//         {isLoading && <div className="text-gray-500 text-sm">Typing...</div>}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="flex items-center">
//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Ask about rooms, bookings, etc..."
//           className="flex-1 border rounded-lg p-2 resize-none h-12 focus:ring-2 focus:ring-blue-400"
//           disabled={isLoading}
//         />
//         <button
//           onClick={sendMessage}
//           disabled={isLoading}
//           className="ml-2 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors disabled:bg-blue-300"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

export default function HotelChat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const webhookUrl =
    "https://hcx-resort.app.n8n.cloud/webhook-test/3c2b4e29-6a6d-4431-8854-f718a99cfca5";

  // Scroll to the bottom of chat
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Send message to n8n
  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // The provided axios.post request
      const response = await axios.post(webhookUrl, {
        message: input,
        // Use the user input here
      });

      console.log(response);

      // Assuming the response contains the data in response.data.response
      const aiMessage = {
        role: "assistant",
        content: response.data.response || "Sorry, something went wrong!",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops, I’m having trouble!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input]);

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 h-[500px] flex flex-col">
      {/* Chat Header */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Hotel AI Assistant
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-50 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-500 text-sm">Typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about rooms, bookings, etc..."
          className="flex-1 border rounded-lg p-2 resize-none h-12 focus:ring-2 focus:ring-blue-400"
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="ml-2 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
