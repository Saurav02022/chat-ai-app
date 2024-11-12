"use client";

import { useChat } from "ai/react"; // Vercel AI SDK's `useChat` hook
import Message from "@/app/components/Message";

const Chat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  // Filter out non-"user" and non-"ai" roles
  const filteredMessages = messages.filter(
    (msg) => msg.role === "user" || msg.role === "assistant"
  );

  return (
    <div className="bg-white shadow-lg rounded-lg max-w-lg w-full mx-auto p-6 flex flex-col space-y-4">
      {/* Chat message list */}
      <div className="flex flex-col space-y-3 overflow-y-auto max-h-96 p-2 border-b-2">
        {filteredMessages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
        {isLoading && (
          <div className="text-center text-gray-500 animate-pulse">
            AI is thinking...
          </div>
        )}
      </div>

      {/* Error message display */}
      {error && (
        <div className="text-red-500 text-center">
          <p>{error.message || "An unexpected error occurred."}</p>
          <button
            onClick={handleSubmit}
            className="text-blue-500 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Form for message input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 pt-4"
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
