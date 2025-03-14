import React, { useState } from "react";
import { MainContext } from "../../../context/MainContext";

const CheckboxList = ({ currentField, setCurrentField }) => {
  const context = React.useContext(MainContext);
  const { options } = context;

  const [checkedItem, setCheckedItem] = useState(currentField?.type);

  const handleToggle = (typeInput) => {
    setCheckedItem((prev) => (prev === typeInput ? null : typeInput));
    setCurrentField({ ...currentField, type: typeInput });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]  w-full">
      <ul className="flex flex-col h-[200px] overflow-y-scroll overflow-hidden custom-scrollbar w-full">
        {options.map((item) => {
          const itemValue = item.value;
          return (
            <li
              key={Math.random()}
              className="border-b border-gray-200 px-3 py-2.5 last:border-b-0 dark:border-gray-800"
            >
              <label
                htmlFor={itemValue}
                className="flex cursor-pointer select-none items-center text-sm text-gray-500 dark:text-gray-400"
              >
                <span className="relative">
                  <input
                    type="checkbox"
                    id={itemValue}
                    className="sr-only"
                    checked={checkedItem === itemValue}
                    onChange={() => {
                      handleToggle(itemValue);
                    }}
                    // checked={item.value === currentField.type}
                    // onClick={() =>
                    //   setCurrentField({ ...currentField, type: item.value })
                    // }
                  />
                  <span
                    className={`mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 transition-all ${
                      checkedItem === itemValue
                        ? "border-brand-500 bg-brand-500"
                        : "bg-transparent"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        checkedItem === itemValue
                          ? "bg-white"
                          : "bg-white dark:bg-[#1e2636]"
                      }`}
                    ></span>
                  </span>
                </span>
                {item.label}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CheckboxList;
