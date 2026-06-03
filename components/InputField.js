"use client";

const InputField = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-black mb-4"
    />
  );
};

export default InputField;