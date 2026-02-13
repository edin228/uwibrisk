import React from "react";
import { getIcon } from "../../../utils/utils";
import { motion } from "framer-motion";

function TestemonialPageCard({ testemonial }) {
  return (
    <div className="flex items-center relative w-full xl:w-[450px] md:h-[250px]">
      <div className="flex justify-center flex-auto text-xs lg:text-sm flex-col top-5 left-7 z-10 testimonial-card-bg w-[300px] h-full p-4 rounded-2xl border-2 border-zinc-500/20">
        <div className="flex font-semibold h-full">{testemonial.text}</div>
        <div className="flex items-center justify-between w-full mt-4">
          {testemonial.teamMembers.length > 0 ? (
            <div className="flex items-center w-[50px] h-[50px] text-center justify-center text-white text-3xl font-bold rounded-full  z-30 shadow-lg">
              <motion.img
                src={testemonial?.teamMembers[0]?.photo?.url}
                className=" w-full h-full object-cover rounded-full shadow-lg border-2 border-white"
              ></motion.img>
            </div>
          ) : null}
          <div className="flex flex-col justify-end items-end">
            <div className="flex justify-end w-full mt-4 font-bold">
              {testemonial.from}
            </div>
            <div className="flex justify-end w-full text-xs italic font-semibold opacity-80">
              {testemonial.subText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestemonialPageCard;
