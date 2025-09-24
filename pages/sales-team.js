/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Base from "../components/layout/Base";
import { motion } from "framer-motion";
import { getIcon } from "../utils/utils";
import Head from "next/head";
import { getProgramInfo, getQuoteCards, getSalesTeam } from "../services";
import MotionPhoto from "../components/ui/MotionPhoto";
import QuoteCard from "../components/quote/QuoteCard";

const ProgramGridItem = ({ data }) => {
  return (
    <div className="flex flex-col h-[500px] w-full lg:w-[300px] m-1 p-4 rounded-lg bg-white shadow-lg border-2 border-slate-500/20">
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg">
        <a
          href={data.url}
          className="relative w-full h-[180px]"
          target="_blank"
          rel="noreferrer"
        >
          <motion.img
            className="flex object-cover w-full h-full rounded-lg"
            src={data.image.url}
            alt={data.title}
            initial={false}
          />
        </a>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col h-full">
          <div className="flex justify-center py-4 text-xl font-bold text-center min-h-[100px] items-center ">
            {data.title}
          </div>
          <div className="flex justify-center text-sm text-center">
            {data.description}
          </div>
        </div>
        <div className="flex items-center justify-center w-full py-4">
          <LinkButton
            link={data.url}
            text={"Click Through to Qualify"}
            color={"sky"}
          />
        </div>
      </div>
    </div>
  );
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

function SalesTeam({ data, programs, quoteCards }) {
  return (
    <>
      <Head>
        <title>Sales Team</title>
        <meta name="description" content="UWIBRisk" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base title={"Sales Team"} template={"SingleColumn"}>
        <div className="flex w-full justify-center items-center p-4">
          <div className="w-full">
            {/* <div className="hidden md:flex flex-col w-full justify-center items-center p-4">
              <img
                src={`https://us-west-2.graphassets.com/AxLg70bPjR3y8qyVdg6FNz/cmfx68c9z00k807n5vnyzdmxq`}
                alt={"logo"}
                className="h-full w-1/2 object-cover"
                loading="lazy"
              />
            </div> */}
            <div className="w-full flex justify-center items-center mb-5">
              <h2 className="text-[2rem]">Meet Our Team</h2>
            </div>
            {/* Team grid */}
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 w-full overflow-visible">
              {(data?.teamMembers || [])
                .filter((m) => m?.isActive && m?.hasTeamPage)
                .sort((a, b) => (a?.name || "").localeCompare(b?.name || ""))
                .map((m) => {
                  const img =
                    m?.photo?.url ||
                    m?.motionProfilePhoto?.[0]?.url ||
                    "/placeholder.png";

                  return (
                    <a
                      key={m.id}
                      href={`/${(m?.slug || "").replace(/^\/?/, "")}`}
                      className="group block w-[210px] shrink-0" // <- fixed width, don't shrink, stay on one line
                    >
                      <motion.div
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="rounded-xl border border-gray-300 overflow-hidden border-accent-uwib  bg-white"
                      >
                        <MotionPhoto
                          photos={m?.motionProfilePhoto}
                          fallback={img}
                          alt={m?.name || "Team member"}
                        />
                      </motion.div>
                      <div className="mt-2 text-center">
                        <div className="text-lg font-medium leading-tight">
                          {m?.name || ""}
                        </div>
                        <div className="text-xs text-gray-500">
                          {m?.position || ""}
                        </div>
                      </div>
                    </a>
                  );
                })}
            </div>

            {/* Intro copy below the grid */}
            <div className="flex flex-col w-full bg-zinc-400/20 rounded-md my-5 items-center justfy-center text-center">
              <p className="text-center text-sm text-gray-600 text-[1.4rem] max-w-4xl mx-auto px-2">
                UWIB Risk has team members standing by to assist with answering
                your questions.
              </p>
              <p className="text-center mt-[-7px] text-sm text-gray-600 text-[1.4rem] max-w-4xl mx-auto px-2">
                InsureTax delivers revolutionary coverage to provide complex
                businesses and successful families with Peace of Mind.
              </p>
            </div>
            <div className="flex flex-col w-full h-full">
              <h1 className="w-full py-2 text-3xl font-bold text-center">
                Coverage and Cost Estimates
              </h1>
              <div className="flex flex-col w-full h-full px-4 py-8 space-y-4 xl:py-10 xl:space-y-0 xl:flex-row xl:flex-wrap xl:px-50 xl:gap-4 xl:items-center xl:justify-center">
                {quoteCards.map((x) => (
                  <QuoteCard key={x.id} data={x} />
                ))}
              </div>
              <h1 className="w-full py-4 text-3xl font-bold text-center">
                Niche Programs
              </h1>
              <div
                className={`flex flex-wrap w-full h-full gap-2  xl:px-50 px-4 pb-4 lg:justify-center`}
              >
                {programs?.map((c, i) => (
                  <ProgramGridItem key={c.id} data={c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Base>
    </>
  );
}

export default SalesTeam;

export async function getServerSideProps() {
  const data = await getSalesTeam();
  const programs = await getProgramInfo();
  const quoteCards = await getQuoteCards();

  return {
    props: { data, programs, quoteCards },
  };
}
