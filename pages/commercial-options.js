import Head from "next/head";
import React from "react";
import Base from "../components/layout/Base";
import { getIcon } from "../utils/utils";
import QuoteCard from "../components/quote/QuoteCard";
import { getQuoteCards } from "../services";
import { motion } from "framer-motion";
import Image from "next/image";

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

function CommercialQuoteOptions({ data }) {
  return (
    <Base template={"Grid"}>
      <Head>
        <title>UWIB Risk</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        <h1 className="w-full py-4 text-2xl font-bold text-center">
          Commercial Quoting
        </h1>
        <div className="h-full md:min-h-[700px] flex items-center justify-center px-4">
          <div className="flex flex-col md:flex-row w-full items-center justify-center gap-4 h-full">
            <div>
              <a
                href={"/initial-client-interview"}
                className="relative transition duration-100  cursor-pointer flex flex-col shadow-lg border-2 border-zinc-100 rounded-xl h-[480px] w-full xl:w-[400px]"
              >
                <Image
                  src={"/big-business.webp"}
                  alt="author-pic"
                  objectFit="cover"
                  layout="fill"
                  className="z-10 rounded-md "
                />
                <div className="z-20 flex flex-col w-full h-full rounded-md bg-gradient-to-t from-slate-900 to-zinc-500/20 hover:backdrop-blur-[10px] backdrop-blur-[0px] transition duration-100 ease-out">
                  <div className="flex items-center justify-center h-[200px] text-center text-white rounded-t-xl ">
                    <div className="flex p-8 text-5xl border-4 border-white shadow-xl rounded-xl text-shadow">
                      {getIcon("apartment")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-2 text-3xl font-bold text-center text-white rounded-b-xl text-shadow">
                    Large Business
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-center p-2 text-xl  text-center text-white rounded-b-xl text-shadow">
                    <div className="flex-col w-full border-t-[3px] border-b-[3px] h-[80px] flex justify-center border-yellow-500 rounded-sm">
                      <div>• Over $2M in revenue</div>
                      <div>• &gt;50+ Employees</div>
                    </div>
                    <div>
                      Tailored insurance solutions to meet your large-scale
                      business needs and coverage
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div>
              <a
                href={"/commercial-quote"}
                className="relative transition duration-100  cursor-pointer flex flex-col shadow-lg border-2 border-zinc-100 rounded-xl h-[480px] w-full xl:w-[400px]"
              >
                <Image
                  src={"/small-business.webp"}
                  alt="author-pic"
                  objectFit="cover"
                  layout="fill"
                  className="z-10 rounded-md "
                />
                <div className="z-20 flex flex-col w-full h-full rounded-md bg-gradient-to-t from-slate-900 to-zinc-500/20 hover:backdrop-blur-[10px] backdrop-blur-[0px] transition duration-100 ease-out">
                  <div className="flex items-center justify-center h-[200px] text-center text-white rounded-t-xl ">
                    <div className="flex p-8 text-5xl border-4 border-white shadow-xl rounded-xl text-shadow">
                      {getIcon("handshake")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-2 text-3xl font-bold text-center text-white rounded-b-xl text-shadow">
                    Small Business
                  </div>
                  <div className="flex flex-col gap-2 items-center justify-center p-2 text-xl  text-center text-white rounded-b-xl text-shadow">
                    <div className="flex-col w-full border-t-[3px] border-b-[3px] h-[80px] flex justify-center border-yellow-500 rounded-sm">
                      <div>• Under $2M in revenue</div>
                      <div>• &lt;50 Employees</div>
                    </div>
                    <div>
                      Insurance solutions to protect your business and support
                      your growth
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default CommercialQuoteOptions;

// // Fetch data at build time
// export async function getServerSideProps() {
//   const data = await getQuoteCards();
//   return {
//     props: {
//       data,
//     },
//   };
// }
