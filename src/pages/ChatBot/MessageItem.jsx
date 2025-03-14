import React from "react";
import { MoreDotIcon } from "../../icons";
import { Dropdown } from "../../components/ui/dropdown/Dropdown";
import { DropdownItem } from "../../components/ui/dropdown/DropdownItem";

const MessageItem = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className={` w-full   flex justify-start`}>
      <div className="flex  items-start gap-2.5 max-[200px]">
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {data?.sendBy || "Khoa"}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {data?.createdAt || "12:00"}
            </span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white break-words whitespace-normal">
            {data?.text}
          </p>
        </div>
        <div className="relative inline-block  ">
          <button
            className="dropdown-toggle my-2"
            onClick={() => {
              toggleDropdown();
            }}
          >
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={() => {
                closeDropdown();
              }}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View more
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
