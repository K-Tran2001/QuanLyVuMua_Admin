import React from "react";

const Bage = ({ status, title }) => {
  return (
    <span
      className={`inline-flex items-center justify-center gap-1 rounded-full ${
        status ? "bg-success-500" : "bg-error-500"
      } px-2.5 py-0.5 text-sm font-medium text-white`}
    >
      {title}
    </span>
  );
};

export default Bage;
