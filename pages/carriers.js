import React, { useEffect, useState } from "react";
import Base from "../components/layout/Base";
import { getCarrierInfo } from "../services";
import { getIcon, searchText } from "../utils/utils";
import { motion } from "framer-motion";

function Carriers({ carriers = null }) {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    const handler = () => {
      setGridData(carriers);
    };
    handler();
    return () => {};
  }, [carriers]);

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
        className={`px-2 text-sm border-2 rounded-lg font-bold ${getColor().border} ${getColor().text} ${getColor().shadow} transition duration-100 ease-out hover:shadow-lg`}
      >
        {text}
      </a>
    );
  };

  const CarrierGridItem = ({ data }) => {
    return (
      <div className="flex flex-col w-full lg:h-[385px] lg:w-[300px] m-1 p-4 h-full rounded-lg shadow-lg border-2 border-slate-500/20">
        <div className="relative flex items-center overflow-hidden rounded-lg">
          <a href={data.website} target="_blank" rel="noreferrer">
            <motion.img
              className="object-contain rounded-lg h-36 w-96"
              src={data.logo.url}
              alt={data.name}
              initial={false}
            />
          </a>
        </div>
        <div className="flex justify-center text-xl font-bold text-center">
          {data.name}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full py-4 justify-evenly">
            {data.website ? (
              <LinkButton link={data.website} text={"Website"} color={"sky"} />
            ) : null}
            {data.claimLink ? (
              <LinkButton
                link={data.claimLink}
                text={"Claims"}
                color={"orange"}
              />
            ) : null}
            {data.payLink ? (
              <LinkButton
                link={data.payLink}
                text={"Bill Pay"}
                color={"emerald"}
              />
            ) : null}
          </div>
          {data.generalPhoneNumber ? (
            <div className="flex flex-col">
              <div className="text-xs font-semibold text-zinc-500">
                General Phone Number
              </div>
              <div className="font-bold">{data.generalPhoneNumber}</div>
            </div>
          ) : null}
          {data.claimsPhoneNumber ? (
            <div className="flex flex-col">
              <div className="text-xs font-semibold text-zinc-500">
                Claims Phone Number
              </div>
              <div className="font-bold">{data.claimsPhoneNumber}</div>
            </div>
          ) : null}
          {data.billingPhoneNumber ? (
            <div className="flex flex-col">
              <div className="text-xs font-semibold text-zinc-500">
                Billing Phone Number
              </div>
              <div className="font-bold">{data.billingPhoneNumber}</div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const getHeight = () => {
      const height = gridData.length * 120
      return height
  }

  return (
    <Base data={carriers} title={"Carriers"} template={"GridWithSearch"}>
      <div className="flex flex-col w-full  min-h-[89vh] h-full">
        <h1 className="w-full py-4 text-3xl font-bold text-center">Carriers</h1>
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
        <div className={`flex flex-wrap w-full h-full gap-2 px-4 pb-4 lg:justify-center`}>
          {gridData.map((c, i) => (
            <CarrierGridItem key={c.id} data={c} />
          ))}
        </div>
      </div>
    </Base>
  );
}

export default Carriers;

export async function getServerSideProps() {
  const carriers = await getCarrierInfo();
  return {
    props: {
      carriers,
    },
  };
}
