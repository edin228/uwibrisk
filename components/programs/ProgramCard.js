import React from "react";
import { motion } from "framer-motion";
import LinkButton from "../ui/LinkButton";

const ProgramCard = ({ data }) => {
  return (
    <div className="flex flex-col h-[510px] w-full lg:w-[300px] m-1 p-4 rounded-lg bg-white shadow-lg border-2 border-slate-500/20">
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg  border-white border-[2px]  border-accent-uwib">
        <a
          href={data.url}
          className="relative w-full h-[180px] "
          target="_blank"
          rel="noreferrer"
        >
          <motion.img
            className="flex object-cover w-full h-full rounded-lg"
            src={data.image.url}
            alt={data.title}
            initial={false}
          />
        </a>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col h-full">
          <div className="flex justify-center py-4 text-[1.2rem] font-bold text-center min-h-[100px] items-center border-b-[2px] border-yellow-500">
            {data.title}
          </div>
          <div className="flex justify-center text-sm text-gray-700 mt-3">
            {data.description}
          </div>
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <LinkButton link={data.url} text={"View"} color={"yellow"} />
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
