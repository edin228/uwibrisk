import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { getIcon } from "../../utils/utils";

function PetCard({ member }) {
  return (
    <div className="flex">
      <div className="relative w-[150px] h-[150px] overflow-hidden rounded-lg shadow-lg">
        <motion.img
          className="w-full h-full object-cover"
          src={member.photo.url}
          alt=""
          initial={false}
        />
      </div>
      <div className="flex flex-col justify-between px-4 w-[300px]">
        <div className="flex flex-col">
          <div className="font-bold text-lg">{member.name}</div>
        </div>
      </div>
    </div>
  );
}

export default PetCard;
