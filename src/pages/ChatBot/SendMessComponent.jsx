import React, { useState } from "react";
import Button from "../../components/ui/button/Button";
import { ChatWithGemini } from "../../api/geminiService";

const SendMessComponent = ({
  setIsBusy,
  chatHistory,
  setChatHistory,
  setResponse,
}) => {
  const [message, setMessage] = useState("");
  const handleSendMessage = async () => {
    try {
      setChatHistory([...chatHistory, { role: "user", text: message }]);
      setIsBusy(true);
      setMessage("");
      const res = await ChatWithGemini({
        chatHistory: JSON.stringify(chatHistory),
        userMessage: message,
      });
      var modelResponse = "...";
      if (res.success) {
        modelResponse = res.data;
      }

      setChatHistory([
        ...chatHistory,
        { role: "user", text: message },
        { role: "model", text: modelResponse },
      ]);
      setResponse(modelResponse);

      setIsBusy(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className=" sticky bottom-0  border-t p-2 flex gap-2 items-center border-gray-200 dark:border-gray-800">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type an message..."
        className=" h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
      />

      <Button
        children={"Send"}
        size="sm"
        onClick={() => {
          handleSendMessage(message);
          setMessage("");
        }}
      />
    </div>
  );
};

export default SendMessComponent;
