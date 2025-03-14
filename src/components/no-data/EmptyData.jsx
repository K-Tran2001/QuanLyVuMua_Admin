import React from "react";

const EmptyData = ({ title = "No data !" }) => {
  return (
    <div className=" flex flex-col items-center justify-center p-4 gap-6">
      <img
        src="images/orther/empty.png"
        alt=""
        className="w-[200px] h-[200px]"
      />
      <div className="text-theme-sm dark:text-gray-400 break-words whitespace-normal">
        {title}
      </div>
    </div>
  );
};

export default EmptyData;
