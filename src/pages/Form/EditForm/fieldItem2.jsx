import * as React from "react";
import * as Pi from "react-icons/pi";
import * as Bs from "react-icons/bs";
import * as Go from "react-icons/go";
import * as Cg from "react-icons/cg";
import * as Rx from "react-icons/rx";
import * as Ri from "react-icons/ri";
import * as Im from "react-icons/im";
import * as Io5 from "react-icons/io5";
import * as Md from "react-icons/md";

const FieldItem = ({ field, id, index, addFieldForm }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="flex-1 px-6 py-2 mb-2 bg-gray-200 hover:shadow-md rounded-lg dark:text-white/90! dark:bg-black dark:border dark:border-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="font-bold">
            {field.type === "text" && (
              <div className="rounded-full bg-red-100 w-6 h-6 flex justify-center items-center">
                <Pi.PiTextTLight className="w-4 h-4 text-red-500" />
              </div>
            )}
            {field.type === "date" && (
              <div className="rounded-full bg-indigo-100 w-6 h-6 flex justify-center items-center">
                <Bs.BsCalendar className="w-4 h-4 text-indigo-500" />
              </div>
            )}
            {field.type === "number" && (
              <div className="rounded-full bg-pink-100 w-6 h-6 flex justify-center items-center">
                <Go.GoNumber className="w-4 h-4 text-pink-500" />
              </div>
            )}
            {field.type === "file" && (
              <div className="rounded-full bg-green-100 w-6 h-6 flex justify-center items-center">
                <Cg.CgAttachment className="w-4 h-4 text-green-500" />
              </div>
            )}
            {field.type === "heading" && (
              <div className="rounded-full bg-yellow-100 w-6 h-6 flex justify-center items-center">
                <Rx.RxHeading className="w-4 h-4 text-yellow-500" />
              </div>
            )}
            {field.type === "divider" && (
              <div className="rounded-full bg-blue-100 w-6 h-6 flex justify-center items-center">
                <Ri.RiSeparator className="w-4 h-4 text-blue-500" />
              </div>
            )}
            {field.type === "radio" && (
              <div className="rounded-full bg-orange-100 w-6 h-6 flex justify-center items-center">
                <Im.ImRadioChecked className="w-4 h-4 text-orange-500" />
              </div>
            )}
            {field.type === "checkbox" && (
              <div className="rounded-full bg-purple-100 w-6 h-6 flex justify-center items-center">
                <Io5.IoCheckboxOutline className="w-4 h-4 text-purple-500" />
              </div>
            )}
            {field.type === "dropdown" && (
              <div className="rounded-full bg-lime-100 w-6 h-6 flex justify-center items-center">
                <Rx.RxDropdownMenu className="w-4 h-4 text-lime-500" />
              </div>
            )}
            {field.type === "autoNumber" && (
              <div className="rounded-full bg-emerald-100 w-6 h-6 flex justify-center items-center">
                <Md.MdOutlineAutorenew className="w-4 h-4 text-emerald-500" />
              </div>
            )}
          </div>
          <div className="px-4 text-medium">{field.label}</div>
        </div>
        <button
          className={`icon ${isHovered ? "visible" : ""}`}
          onClick={() => addFieldForm(id, index, field)}
        >
          <Bs.BsPlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default FieldItem;
