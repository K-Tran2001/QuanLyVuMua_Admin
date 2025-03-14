import React, { useEffect, useRef, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Badge from "../../components/ui/badge/Badge";
import Pagination from "../../components/ui/pagination";
import { BoxIcon, MoreDotIcon } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";
import Button from "../../components/ui/button/Button";
import Modal from "../../components/modal/Modal";
import Label from "../../components/form/Label";
import TextArea from "../../components/form/input/TextArea";
import Input from "../../components/form/input/InputField";
import { useNavigate } from "react-router";
import { GetAllForm, SeachForm } from "../../api/formService";
import EmptyData from "../../components/no-data/EmptyData";

import {
  DeleteCategory,
  GetAllCategory,
  SaveCategory,
  UpdateCategory,
} from "../../api/categoryService";
import MessageItem from "./MessageItem";
import { ChatWithGemini } from "../../api/geminiService";
import MessageByUserItem from "./MessageByUserItem";

const ChatBotPage = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "user", text: "Hello" },
    { role: "model", text: "Great to meet you. What would you like to know?" },
    { role: "user", text: "Hello" },
    { role: "model", text: "Great to meet you. What would you like to know?" },
  ]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Cuộn xuống dưới cùng khi chatHistory thay đổi
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    try {
      setChatHistory([...chatHistory, { role: "user", text: message }]);
      setIsBusy(true);
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
      setMessage("");
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
  const handleClearHistory = () => {
    setChatHistory([]);
  };
  console.log("chatHistory", chatHistory);

  return (
    <div>
      <div className="relative h-[calc(100vh-130px)] max-h-[calc(100vh+300px)] flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        {/* Khu vực hiển thị tin nhắn */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-2 p-2"
          style={{ maxHeight: "70vh" }}
        >
          {chatHistory.length > 0 ? (
            chatHistory.map((mess) => (
              <div key={Math.random()}>
                {mess.role === "model" ? (
                  <MessageItem data={mess} />
                ) : (
                  <MessageByUserItem data={mess} />
                )}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        {/* Ô nhập tin nhắn cố định ở đáy */}
        <div className=" sticky bottom-0  border-t p-2 flex gap-2 items-center border-gray-200 dark:border-gray-800">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tin nhắn..."
            className=" h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800"
          />

          <Button children={"Gửi"} size="sm" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
