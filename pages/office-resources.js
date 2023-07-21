import React, { useEffect, useState } from "react";
import Base from "../components/layout/Base";
import { getOfficeResources } from "../services";
import { getIcon, searchText } from "../utils/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function OfficeResources({ data = null }) {
  const [gridData, setGridData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagePassword, setpagePassword] = useState("uwib");
  const [passWordInput, setpassWordInput] = useState("");

  useEffect(() => {
    const handler = () => {
      setGridData(data);
      filterCatgories(data);
    };
    handler();
    return () => {};
  }, [data]);

  const filterCatgories = (inData) => {
    const tags = [];
    const sortOrder = {
      Insurtech: 1,
      Carriers: 2,
      CRM: 3,
      Office: 4,
      Resources: 5,
      Insuretech: 6,
    };
    if (inData) {
      inData.forEach((x) => {
        if (!tags.includes(x.category)) {
          tags.push(x.category);
        }
      });
      tags.sort((a, b) => sortOrder[a] - sortOrder[b]);
    }
    setCategories(tags);
  };

  const search = (val) => {
    if (val.length > 1) {
      const filtered = searchText(data, val);
      setGridData(filtered);
    } else {
      setGridData(data);
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
        className={`px-2 text-sm border-2 rounded-lg font-bold ${
          getColor().border
        } ${getColor().text} ${
          getColor().shadow
        } transition duration-100 ease-out hover:shadow-lg`}
      >
        {text}
      </a>
    );
  };

  const OfficeResourceCard = ({ data }) => {
    return (
      <div className="flex flex-col w-full lg:h-[180px] lg:w-[160px] m-1 p-4 h-full rounded-lg shadow-lg border-2 border-zinc-500/20">
        <div className="relative flex items-center overflow-hidden rounded-lg">
          <a
            href={data.link}
            target="_blank"
            rel="noreferrer"
            className="w-full"
          >
            {data.image?.id ? (
              <motion.img
                className="object-contain rounded-lg h-36 w-96"
                src={data.image.url}
                alt={data.title}
                initial={false}
              />
            ) : (
              <div className="flex items-center justify-center w-full font-bold text-center h-36">
                {data.altLogoText}
              </div>
            )}
          </a>
        </div>
        <div className="flex justify-center font-bold text-center text-md">
          {data.title}
        </div>
      </div>
    );
  };

  return (
    <Base data={data} title={"Office Resources"} template={"GridWithSearch"}>
      <div className="flex flex-col w-full h-full">
        {passWordInput != pagePassword ? (
          <div className="flex items-center justify-center mt-[-10%] flex-col w-full h-[80vh] ">
            <div className="flex items-center justify-center p-6 text-6xl text-center">
              {getIcon("lock")}
            </div>
            <div className="flex items-center justify-center w-full">
              <input
                className="w-1/2 px-2 py-1 border-2 rounded-md "
                type="Password"
                name="Password"
                placeholder="Password"
                onInput={(e) => setpassWordInput(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className="w-full py-4 text-3xl font-bold text-center">
              Office Resources
            </h1>
            <div className="flex items-center justify-center w-full px-4">
              <div className="relative flex w-full my-4 border-2 rounded-lg lg:w-1/2 border-zinc-500/20">
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
            {categories.map((category, i) => (
              <div
                key={category}
                className="flex flex-col w-full px-4 pb-4 lg:justify-center"
              >
                <div className="flex justify-center w-full px-4 text-xl font-bold tracking-wide text-center uppercase opacity-80">
                  {category}
                </div>
                <div className="flex justify-center w-full">
                  <div
                    className={`flex flex-wrap w-1/2 h-full gap-2 lg:justify-center`}
                  >
                    {gridData
                      .filter((x) => x.category == category)
                      .sort((a, b) => {
                        if (category === "Carriers") {
                          return a.title.localeCompare(b.title);
                        }
                        return 0;
                      })
                      .map((c, i) => (
                        <OfficeResourceCard key={c.id} data={c} />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Base>
  );
}

export default OfficeResources;

export async function getServerSideProps() {
  const data = await getOfficeResources();
  return {
    props: {
      data,
    },
  };
}
