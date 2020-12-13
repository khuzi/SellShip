import React from "react";
// import "../assets/main.css";

const CustomButton = ({ children, isInverted }) => {
  return (
    <button
      className={`md:text-xl font-bold rounded text-white px-10 w-auto transition duration-200 ease-in h-16${
        isInverted
          ? " bg-orange-400 hover:bg-purple-700"
          : " bg-purple-700 hover:bg-orange-400"
      }`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
