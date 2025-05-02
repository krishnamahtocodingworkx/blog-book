import React from "react";
import "./style.css";

const Loading = () => {
  return (
    <div className="h-[40vh] w-full flex justify-center items-center">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
