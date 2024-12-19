import React from "react";
import { motion } from "framer-motion";
import { getIcon } from "../utils/utils";
import { useState } from "react";
import { useEffect } from "react";
import ActionButton from "./ActionButton";
import { marked } from "marked";


const VimeoPlayer = ({data}) => {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    return (
      <div style={{ position: "relative", padding: "95.25% 0 0 0" }}>
        {isClient && (
          <iframe
            src={data.videoUrl}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            title={data.header}
          ></iframe>
        )}
      </div>
    );
  };

function WideCard({ data }) {
  return (
    <div
      className={`flex flex-col   w-full md:w-1/2 justify-between items-center p-4 rounded-md gap-4 ${
        data.showBackgroundColor ? `bg-zinc-100` : `bg-white`
      } ${data.textOnLeft ? `md:flex-row` : `md:flex-row-reverse`}`}
    >
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <div className="font-bold uppercase text-2xl mb-2">{data.header}</div>
        {data ? (
          <div
            key={Date()}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: marked(data.text),
            }}
          ></div>
        ) : null}
        {data.buttons ? (
          <div className="flex w-full gap-2 flex-wrap">
            {data.buttons.map((button) => (
              <ActionButton key={button.id} data={button} />
            ))}
          </div>
        ) : null}
      </div>
      {data.useVideo ? (
        <div className="relative md:w-1/2 w-full h-[420px]">
          <VimeoPlayer data={data} />
        </div>
      ) : (
        <div className="rounded-md w-full md:w-1/2 flex md:justify-end items-center mt-10 md:mt-0 overflow-hidden">
          <motion.img
            className="object-contain rounded-lg rounded-md"
            src={data.image[0].url}
            alt={`Card Image`}
            initial={false}
          />
        </div>
      )}
    </div>
  );
}

export default WideCard;
