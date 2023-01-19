import React from "react";
import { getIcon } from "../../../utils/utils";
import { motion } from "framer-motion";

function TestemonialCard({ testemonial }) {
  return (
    <div className="relative w-full">
      <div className="absolute deep-blue-gradient flex items-center text-center justify-center text-white text-3xl font-bold top-0 left-0 rounded-full w-[50px] h-[50px] z-30 shadow-lg border-2 border-white">
        {getIcon("quoteIcon")}
      </div>

      <div className="flex text-xs lg:text-sm flex-col absolute top-5 left-7 z-10 testimonial-card-bg w-[300px] h-fit p-4 rounded-2xl shadow-2xl">
        {testemonial.teamMembers.length > 0 ? (
          <div className="absolute top-[-15px] right-[-18px]  flex items-center text-center justify-center text-white text-3xl font-bold rounded-full w-[45px] h-[45px] z-30 shadow-lg">
            <motion.img
              src={testemonial?.teamMembers[0]?.photo?.url}
              className="w-[45px] h-[45px] bg-cover rounded-full shadow-lg border-2 border-white"
            ></motion.img>
          </div>
        ) : null}
        <div className="font-semibold">{testemonial.text}</div>
        <div className="flex justify-end w-full mt-4 font-bold">
          {testemonial.from}
        </div>
        <div className="flex justify-end w-full text-xs italic font-semibold opacity-80">
          {testemonial.subText}
        </div>
      </div>
    </div>
  );
}

export default TestemonialCard;
