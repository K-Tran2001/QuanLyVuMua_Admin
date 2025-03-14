import React from "react";

const Tooltip = ({
  children,
  titleTooltip = "Tooltip content",
  position = "top",
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2  rotate-45",
    bottom: "bottom-full left-1/2 -translate-x-1 translate-y-1 rotate-45",
    left: "left-full top-1/2 -translate-y-1/2 -translate-x-1 rotate-45",
    right: "right-full top-1/2 -translate-y-1/2 translate-x-1 rotate-45",
  };

  return (
    <div className="relative group inline-block">
      {children}
      <div
        className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 min-w-[100px] max-w-[200px] ${positionClasses[position]}`}
      >
        {titleTooltip}
        <div
          className={`absolute w-2 h-2 bg-gray-900 ${arrowClasses[position]}`}
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
