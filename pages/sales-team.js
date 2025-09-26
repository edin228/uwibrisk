/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Base from "../components/layout/Base";
import { motion } from "framer-motion";
import { getIcon } from "../utils/utils";
import Head from "next/head";
import { getProgramInfo, getQuoteCards, getSalesTeam } from "../services";
import MotionPhoto from "../components/ui/MotionPhoto";
import QuoteCard from "../components/quote/QuoteCard";
import ProgramCard from "../components/programs/ProgramCard";

function SalesTeam({ data, programs, quoteCards }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const base = (data?.teamMembers || []).filter(
      (m) => m?.isActive && m?.hasTeamPage
    );

    setMembers(shuffle(base));
  }, [data?.teamMembers]);

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

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
            <div className="w-full flex justify-center items-center my-7">
              <h2 className="text-[2.2rem]">Meet Our Team</h2>
            </div>
            {/* Team grid */}
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 w-full overflow-visible">
              {members.map((m, i) => {
                const img =
                  m?.photo?.url ||
                  m?.motionProfilePhoto?.[0]?.url ||
                  "/placeholder.png";

                return (
                  <a
                    key={m.id}
                    href={`/${(m?.slug || "").replace(/^\/?/, "")}`}
                    className="group block w-[210px] shrink-0"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: i * 0.3,
                      }}
                      className="rounded-xl border-[2px] border-white overflow-hidden border-accent-uwib bg-white"
                    >
                      <MotionPhoto
                        photos={m?.motionProfilePhoto}
                        fallback={img}
                        alt={m?.name || "Team member"}
                        staggerIndex={i} // <— phase per card
                        staggerStepSec={0.25} // <— 250ms apart
                        intervalMs={5500}
                        jitterSec={0.1} // <— optional small desync
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
            <div className="flex flex-col w-full bg-zinc-400/20 rounded-md font-bold my-10 md:my-20 items-center justfy-center text-center">
              <p className="text-center text-sm text-gray-600  text-[1.3rem] lg:text-[1.8rem] max-w-6xl mx-auto px-2 mb-10">
                UWIB Risk has team members standing by to assist with answering
                your questions.
              </p>
              <p className="text-center mt-[-7px] text-sm  text-gray-600 text-[1.1rem] lg:text-[1.4rem] max-w-5xl mx-auto px-2">
                Our specialized programs, including{" "}
                <span>
                  <a
                    rel="noreferrer"
                    className="text-yellow-600"
                    href="https://irsinsurance.tax"
                    target="_blank"
                  >
                    InsureTax
                  </a>
                </span>
                , deliver revolutionary coverage to provide complex businesses
                and successful families with Peace of Mind.
              </p>
            </div>
            <div className="flex flex-col w-full h-full">
              <h1 className="w-full py-4 text-3xl font-bold text-center">
                Niche Programs
              </h1>
              <div className="flex flex-wrap w-full h-full gap-2 xl:px-50 px-4 pb-4 lg:justify-center">
                {(programs ?? [])
                  .slice() // keep original array intact
                  .sort((a, b) => {
                    const ao = a?.order ?? Infinity;
                    const bo = b?.order ?? Infinity;

                    if (ao !== bo) return ao - bo; // smaller 'order' first

                    // tie-breaker: by id (handles numeric or string ids)
                    const aId = a?.id;
                    const bId = b?.id;
                    const aNum = Number(aId);
                    const bNum = Number(bId);

                    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
                      return aNum - bNum;
                    }
                    return String(aId).localeCompare(String(bId));
                  })
                  .map((c) => (
                    <ProgramCard key={c.id} data={c} />
                  ))}
              </div>
              <h1 className="w-full py-2 text-3xl font-bold text-center">
                Coverage and Cost Estimates
              </h1>
              <div className="flex flex-col w-full h-full px-4 py-8 space-y-4 xl:py-10 xl:space-y-0 xl:flex-row xl:flex-wrap xl:px-50 xl:gap-4 xl:items-center xl:justify-center">
                {quoteCards.map((x) => (
                  <QuoteCard key={x.id} data={x} />
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
