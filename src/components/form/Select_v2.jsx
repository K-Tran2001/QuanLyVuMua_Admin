import React from "react";

const Select_v2 = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  success = false,
  error = false,
  hint,
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = React.useState();

  const handleChange = (e) => {
    console.log(e.target.value);

    const value = e.target.value;
    setSelectedValue(value);
    const selectedObj = options.find((opt) => opt.value === value);
    onChange(selectedObj); // Trigger parent handler
  };
  const classNameErr = `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  React.useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <div>
      <select
        className={`h-11 w-full appearance-none rounded-lg border ${
          error ? classNameErr : "border-gray-300"
        }  bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
          selectedValue
            ? "text-gray-800 dark:text-white/90"
            : "text-gray-400 dark:text-gray-400"
        } ${className}`}
        value={selectedValue}
        onChange={handleChange}
      >
        {/* Placeholder option */}
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {placeholder}
        </option>
        {/* Map over options */}
        {options?.length > 0 &&
          options.map((option) => (
            <option
              key={Math.random()}
              value={option.value}
              className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
              {option.label}
            </option>
          ))}
      </select>
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Select_v2;
