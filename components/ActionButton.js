import React from "react";

function ActionButton({data}) {
  return (
    <a
      href={data.buttonUrl}
      target="_blank"
      rel="noreferrer"
      className="flex"
    >
      <button
        className={`w-[160px] md:w-[200px] p-2 rounded-md  font-bold border-[2px] border-[#eab308] hover:bg-[#eab308]  transition duration-200`}
      >
        {data.label}
      </button>
    </a>
  );
}

export default ActionButton;
