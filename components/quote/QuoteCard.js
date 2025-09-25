import React from "react";
import { getIcon } from "../../utils/utils";
import Image from "next/image";

function QuoteCard({ data }) {
  return (
    <>
      <a
        href={data.slug}
        className="relative transition duration-100  cursor-pointer flex flex-col shadow-lg border-2 border-zinc-100 rounded-xl h-[380px] w-full xl:w-[237px] 2xl:w-[255px]"
      >
        <Image
          src={data?.image?.url}
          alt="author-pic"
          objectFit="cover"
          layout="fill"
          className="z-10 rounded-md "
        />
        <div className="z-20 flex flex-col w-full h-full rounded-md bg-gradient-to-t from-slate-900 to-zinc-500/20 hover:backdrop-blur-[10px] backdrop-blur-[0px] transition duration-100 ease-out">
          <div className="flex items-center justify-center h-[200px] text-center text-white rounded-t-xl ">
            <div className="flex p-8 text-5xl border-4 border-white shadow-xl rounded-xl text-shadow">
              {getIcon(data.icon)}
            </div>
          </div>
          <div className="flex items-center justify-center p-2 text-3xl font-bold text-center text-white rounded-b-xl text-shadow">
            {data.label}
          </div>
        </div>
      </a>
    </>
  );
}

export default QuoteCard;
