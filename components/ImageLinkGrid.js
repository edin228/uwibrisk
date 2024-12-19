import React from "react";
import { motion } from "framer-motion";

function ImageLinkGrid({ data }) {
  if (!data || !data.gridItems || data.gridItems.length === 0) {
    return null; // Safeguard in case data is missing or empty
  }

  const { title, gridItems } = data;

  return (
    <div className="flex flex-col justify-center items-center bg-white w-full p-4 rounded-md">
      <div className="font-bold uppercase text-2xl mb-4 flex items-center justify-center w-full text-center">
        {title || "Image Grid"}
      </div>
      <div className="flex flex-wrap items-center justify-center md:w-1/2 w-full gap-4">
        {gridItems.map((item, index) => (
          <a
            key={item.id || index}
            href={item.url || "#"}
            target="_blank"
            rel="noreferrer"
            className="flex"
          >
            <motion.img
              className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
              src={item.gridImage?.url || ""}
              alt={item.label || "Image"}
              initial={false}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default ImageLinkGrid;