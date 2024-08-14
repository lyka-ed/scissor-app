import React from "react";

export default function Input({
  label,
  name,
  type = "text",
  value,
  placeholder,
  handleChange,
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[#181820] font-medium">
        {label}
      </label>
      <input
        className="w-full h-[48px] py-2 px-4 border border-[#D6D6E1] outline-none rounded mt-2"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={handleChange}
        id={name}
        name={name}
      />
    </div>
  );
}
