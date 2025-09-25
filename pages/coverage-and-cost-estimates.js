import Head from "next/head";
import React from "react";
import Base from "../components/layout/Base";
import { getIcon } from "../utils/utils";
import QuoteCard from "../components/quote/QuoteCard";
import { getProgramInfo, getQuoteCards } from "../services";
import { motion } from "framer-motion";
import ProgramCard from "../components/programs/ProgramCard";

function GetQuotes({ data, programs }) {
  return (
    <Base template={"Grid"}>
      <Head>
        <title>UWIB Risk</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        <h1 className="w-full py-4 text-3xl font-bold text-center">
          Coverage and Cost Estimates
        </h1>
        <div className="flex flex-col w-full h-full px-4 py-8 space-y-4 xl:py-20 xl:space-y-0 xl:flex-row xl:flex-wrap xl:px-80 xl:gap-8 xl:items-center xl:justify-center">
          {data.map((x) => (
            <QuoteCard key={x.id} data={x} />
          ))}
        </div>
        <h1 className="w-full py-4 text-3xl font-bold text-center">
          Niche Programs
        </h1>
        <div
          className={`flex flex-wrap w-full h-full gap-2  xl:px-80 px-4 pb-4 lg:justify-center`}
        >
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
      </div>
    </Base>
  );
}

export default GetQuotes;

// Fetch data at build time
export async function getServerSideProps() {
  const programs = await getProgramInfo();
  const data = await getQuoteCards();
  return {
    props: {
      data,
      programs,
    },
  };
}
