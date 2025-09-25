import React, { useEffect, useState } from "react";
import Base from "../components/layout/Base";
import { getProgramInfo, getQuoteCards } from "../services";
import { getIcon, searchText } from "../utils/utils";
import { motion } from "framer-motion";
import ProgramCard from "../components/programs/ProgramCard";
import QuoteCard from "../components/quote/QuoteCard";

function Programs({ programs = null, quoteCards }) {
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
      const filtered = searchText(programs, val);
      setGridData(filtered);
    } else {
      setGridData(programs);
    }
  };

  return (
    <Base data={programs} title={"Programs"} template={"GridWithSearch"}>
      <div className="flex flex-col lg:flex-row w-full h-full  min-h-[92vh]">
        <div>
          <h1 className="w-full py-4 text-3xl font-bold text-center">
            Programs
          </h1>
          <div className="flex items-center justify-center w-full px-4">
            <div className="relative flex w-3/4 my-4  border-2 rounded-lg border-slate-500/20">
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
            className={`flex flex-wrap w-full gap-2 justify-center items-center`}
          >
            <div className="flex flex-wrap w-full justify-center">
              {(gridData ?? [])
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
        </div>
        <div>
          <h1 className="w-full py-4 text-3xl font-bold text-center mb-3">
            Coverage and Cost Estimates
          </h1>
          <div className="flex flex-col w-full lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-4">
            {quoteCards.map((x) => (
              <QuoteCard key={x.id} data={x} />
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Programs;

export async function getServerSideProps() {
  const programs = await getProgramInfo();
  const quoteCards = await getQuoteCards();
  return {
    props: {
      programs,
      quoteCards,
    },
  };
}
