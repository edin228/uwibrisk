import React from "react";
import Header from "../header/Header";

function Base({ children }) {
  return (
    <div className="flex w-full bg-red-500 h-screen">
      <div className="flex flex-col w-full lg:mx-auto lg:w-3/4">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Base;
