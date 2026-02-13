import Head from "next/head";
import React from "react";
import Base from "../components/layout/Base";
import { getIcon } from "../utils/utils";
import QuoteCard from "../components/quote/QuoteCard";
import { getQuoteCards } from "../services";

function GetQuotes({ data }) {
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
            <QuoteCard
              key={x.id}
              data={x}
            />
          ))}
        </div>
      </div>
    </Base>
  );
}

export default GetQuotes;

// Fetch data at build time
export async function getServerSideProps() {
  const data = await getQuoteCards();
  return {
    props: {
      data,
    },
  };
}
