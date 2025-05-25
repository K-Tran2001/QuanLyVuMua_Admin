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
import TypingComponent from "../../components/lotties/TypingComponent";
import SendMessComponent from "./SendMessComponent";

const ChatBotPage = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Cuộn xuống dưới cùng khi chatHistory thay đổi
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleClearHistory = () => {
    setChatHistory([]);
  };

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
            chatHistory.map((mess, index) => (
              <div key={Math.random()}>
                {mess.role === "model" ? (
                  <MessageItem
                    data={mess}
                    isLastMessage={index == chatHistory.length - 1}
                  />
                ) : (
                  <MessageByUserItem data={mess} />
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full dark:text-white">
              No message!
            </div>
          )}
        </div>
        {isBusy && <TypingComponent />}

        {/* Ô nhập tin nhắn cố định ở đáy */}
        <SendMessComponent
          {...{
            setIsBusy,
            chatHistory,
            setChatHistory,
            setResponse,
          }}
        />
      </div>
    </div>
  );
};

export default ChatBotPage;
