import React, { useEffect, useState } from "react";
import Base from "../components/layout/Base";
import { getProgramInfo } from "../services";
import { getIcon, searchText } from "../utils/utils";
import { motion } from "framer-motion";

function Programs({ programs = null }) {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    const handler = () => {
      setGridData(programs);
    };
    handler();
    return () => {};
  }, [programs]);

  const search = (val) => {
    if (val.length > 1) {
      const filtered = searchText(carriers, val);
      setGridData(filtered);
    } else {
      setGridData(carriers);
    }
  };

  const LinkButton = ({ link, text, color }) => {
    const getColor = () => {
      const def = { bg: ``, text: ``, shadow: "" };
      switch (color) {
        case "emerald":
          return {
            bg: `bg-emerald-500`,
            text: `text-emerald-400`,
            border: `border-emerald-400`,
            shadow: "shadow-emerald-400",
          };
        case "sky":
          return {
            bg: `bg-sky-500`,
            text: `text-sky-400`,
            border: `border-sky-400`,
            shadow: "shadow-sky-500",
          };
        case "purple":
          return {
            bg: `bg-purple-500`,
            text: `text-purple-400`,
            border: `border-purple-400`,
            shadow: "pink-shadow",
          };
        case "pink":
          return {
            bg: `bg-pink-500`,
            text: `text-pink-400`,
            border: `border-pink-400`,
            shadow: "pink-shadow",
          };
        case "teal":
          return {
            bg: `bg-teal-500`,
            text: `text-teal-400`,
            border: `border-teal-400`,
            shadow: "blue-shadow",
          };
        case "amber":
          return {
            bg: `bg-amber-500`,
            text: `text-amber-400`,
            border: `border-amber-400`,
            shadow: "orange-shadow",
          };
        case "fuchsia":
          return {
            bg: `bg-fuchsia-500`,
            text: `text-fuchsia-400`,
            border: `border-fuchsia-400`,
            shadow: "pink-shadow",
          };
        case "rose":
          return {
            bg: `bg-rose-500`,
            text: `text-rose-400`,
            border: `border-rose-400`,
            shadow: "pink-shadow",
          };
        case "violet":
          return {
            bg: `bg-violet-500`,
            text: `text-violet-400`,
            border: `border-violet-400`,
            shadow: "purple-shadow",
          };
        case "indigo":
          return {
            bg: `bg-indigo-500`,
            text: `text-indigo-400`,
            border: `border-indigo-400`,
            shadow: "purple-shadow",
          };
        case "cyan":
          return {
            bg: `bg-cyan-500`,
            text: `text-cyan-400`,
            border: `border-cyan-400`,
            shadow: "blue-shadow",
          };
        case "red":
          return {
            bg: `bg-red-500`,
            text: `text-red-400`,
            border: `border-red-400`,
            shadow: "pink-shadow",
          };
        case "rose":
          return {
            bg: `bg-rose-500`,
            text: `text-rose-500`,
            border: `border-rose-400`,
            shadow: "pink-shadow",
          };
        case "yellow":
          return {
            bg: `bg-yellow-500`,
            text: `text-yellow-400`,
            border: `border-yellow-400`,
            shadow: "orange-shadow",
          };
        case "orange":
          return {
            bg: `bg-orange-500`,
            text: `text-orange-400`,
            border: `border-orange-400`,
            shadow: "shadow-orange-400",
          };
        case "lime":
          return {
            bg: `bg-lime-500`,
            text: `text-lime-400`,
            border: `border-lime-400`,
            shadow: "green-shadow",
          };
        default:
          return def;
      }
    };

    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={`w-full justify-center items-center text-center text-xl px-2 border-2 rounded-lg font-bold ${
          getColor().border
        } ${getColor().text} ${
          getColor().shadow
        } transition duration-100 ease-out hover:shadow-lg`}
      >
        {text}
      </a>
    );
  };

  const ProgramGridItem = ({ data }) => {
    return (
      <div className="flex flex-col w-full lg:w-[300px] m-1 p-4 h-full rounded-lg shadow-lg border-2 border-slate-500/20">
        <div className="relative flex items-center justify-center overflow-hidden rounded-lg">
          <a
            href={data.url}
            className="relative w-full h-[180px]"
            target="_blank"
            rel="noreferrer"
          >
            <motion.img
              className="absolute top-[-160px] object-contain w-full rounded-lg"
              src={data.image.url}
              alt={data.title}
              initial={false}
            />
          </a>
        </div>
        <div className="flex justify-center py-4 text-xl font-bold text-center">
          {data.title}
        </div>
        <div className="flex justify-center text-sm text-center">
          {data.description}
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <LinkButton link={data.url} text={"Click Through to Qualify"} color={"sky"} />
        </div>
      </div>
    );
  };

  const getHeight = () => {
    const height = gridData.length * 120;
    return height;
  };

  return (
    <Base data={programs} title={"Programs"} template={"GridWithSearch"}>
      <div className="flex flex-col w-full h-full">
        <h1 className="w-full py-4 text-3xl font-bold text-center">Programs</h1>
        <div className="flex items-center justify-center w-full px-4">
          <div className="relative flex w-full my-4 border-2 rounded-lg lg:w-1/2 border-slate-500/20">
            <input
              className="w-full px-2 py-1 rounded-md"
              type="search"
              name="search"
              placeholder="Search"
              onInput={(e) => search(e.target.value)}
            />
            <div
              type="submit"
              name="search"
              className="flex items-center justify-center p-2 text-lg font-bold tracking-widest uppercase cursor-pointer rounded-r-md"
            >
              {getIcon("search")}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-wrap w-full h-full gap-2 px-4 pb-4 lg:justify-center`}
        >
          {gridData?.map((c, i) => (
            <ProgramGridItem key={c.id} data={c} />
          ))}
        </div>
      </div>
    </Base>
  );
}

export default Programs;

export async function getServerSideProps() {
  const programs = await getProgramInfo();
  return {
    props: {
      programs,
    },
  };
}
