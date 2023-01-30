import React from "react";
import { getIcon } from "../../../utils/utils";
import { motion } from "framer-motion";

function TestemonialPageCard({ testemonial }) {
  return (
    <div className="flex items-center relative w-full">
      <div className="flex justify-center flex-auto text-xs lg:text-sm flex-col top-5 left-7 z-10 testimonial-card-bg w-[300px] h-[300px] p-4 rounded-2xl">
        <div className="flex min-h-[170px] font-semibold">{testemonial.text}</div>
        <div className="flex items-center justify-between w-full">
          {testemonial.teamMembers.length > 0 ? (
            <div className="flex items-center text-center justify-center text-white text-3xl font-bold rounded-full  z-30 shadow-lg">
              <motion.img
                src={testemonial?.teamMembers[0]?.photo?.url}
                className="w-[45px] bg-cover rounded-full shadow-lg border-2 border-white"
              ></motion.img>
            </div>
          ) : null}
          <div className="flex flex-col w-full justify-end items-end">
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
