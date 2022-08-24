import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { getIcon } from "../../utils/utils";

function TeamCard({ member }) {
  return (
    <div className="flex items-center">
      <div className="relative w-[150px] h-[150px] overflow-hidden rounded-lg shadow-lg">
        <motion.img
          className="w-full h-full object-cover"
          src={member.photo.url}
          alt=""
          initial={false}
        />
      </div>
      <div className="flex flex-col justify-between px-4 w-[230px] md:w-[300px]">
        <div className="flex flex-col">
          <div className="font-bold text-lg">{member.name}</div>
          <div>{member.position}</div>
          <div className="flex flex-col py-2">
            {member.email ? (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center w-full transition duration-200 hover:text-sky-500"
              >
                <div className="pr-4">{getIcon("email")}</div>
                <div>{member.email}</div>
              </a>
            ) : null}
            {member.phone ? (
              <div className="flex items-center w-full">
                <div className="pr-4">{getIcon("phone")}</div>
                <div>{member.phone}</div>
              </div>
            ) : null}
          </div>
        </div>
        <Link href={`/${member.slug}`}>
          <a className="flex justify-center w-full text-sm py-1 hover:text-white hover:bg-sky-500 transition ease-out duration-200 border-2 rounded-md font-bold uppercase tracking-widest">
            View Bio
          </a>
        </Link>
      </div>
    </div>
  );
}

export default TeamCard;
