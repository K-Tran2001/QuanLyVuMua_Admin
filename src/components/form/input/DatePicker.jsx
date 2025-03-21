import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";

import { CalenderIcon } from "../../../icons";
const DatePicker = ({ onChange }) => {
  const [dateOfBirth, setDateOfBirth] = useState("");
  console.log("dateOfBirth", dateOfBirth);

  const handleDateChange = (date) => {
    // setDateOfBirth(date[0].toLocaleDateString()); // Handle selected date and format it
    setDateOfBirth(date[0]);
    onChange(date[0]);
  };

  return (
    <div>
      <div className="relative w-full flatpickr-wrapper z-999999999999999">
        <Flatpickr
          value={dateOfBirth} // Set the value to the state
          onChange={handleDateChange} // Handle the date change
          options={{
            dateFormat: "d-m-Y", // Set the date format
          }}
          placeholder="Select an option"
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
        />
        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
};

export default DatePicker;
