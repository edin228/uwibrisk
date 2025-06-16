import React from "react";
import { motion } from "framer-motion";
import { getIcon } from "../utils/utils";
import { useState } from "react";
import { useEffect } from "react";

function PageHeader({ data }) {
  return (
    <div className="flex flex-col items-center rounded-md w-full md:w-1/2 p-2">
      <motion.img
        className="object-contain rounded-lg h-[200px] w-[400px]"
        src={data.headerImage.url}
        alt={data.header}
        initial={false}
      />
      <div className="text-5xl font-bold uppercase text-center mt-10">
        {data.header}
      </div>
    </div>
  );
}

export default PageHeader;