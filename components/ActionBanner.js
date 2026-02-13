import React from "react";

function ActionBanner({ data }) {
  if (!data) {
    return null; // Safeguard to handle missing data
  }

  const { title, descriptive, buttons } = data;

  return (
    <div className="flex flex-col items-center rounded-md p-2 my-4 bg-white md:bg-transparent">
      {title && (
        <div className="text-3xl font-bold uppercase text-center flex">
          {title}
        </div>
      )}
      {descriptive && (
        <div className="text-xl text-center flex p-4">{descriptive}</div>
      )}
      {buttons && buttons.length > 0 && (
        <div className="flex justify-between items-center gap-2 px-4 flex-wrap">
          {buttons.map((button) => (
            <a
              key={button.id}
              href={button.buttonUrl}
              target="_blank"
              rel="noreferrer"
              className="flex md:w-auto"
            >
              <button
                className={`w-[160px] md:w-[200px] p-2 rounded-md font-bold border-[2px] border-[#eab308] hover:bg-[#eab308] transition duration-200`}
              >
                {button.label}
              </button>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default ActionBanner;