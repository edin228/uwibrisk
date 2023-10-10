import React, { useEffect, useState } from "react";
import Base from "../components/layout/Base";
import { getCarrierInfo, getGlossaryTerms } from "../services";
import { getIcon, searchText } from "../utils/utils";
import { motion } from "framer-motion";
import TermCard from "../components/term/TermCard";

function GlossaryTerms({ data = null }) {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    const handler = () => {
      setGridData(data);
    };
    handler();
    return () => {};
  }, [data]);

  const search = (val) => {
    if (val.length > 1) {
      const filtered = searchText(data, val);
      setGridData(filtered);
    } else {
      setGridData(data);
    }
  };

  return (
    <Base
      data={data}
      title={"Insurance Term Glossary"}
      template={"GridWithSearch"}
    >
      <div className="flex flex-col w-full h-full min-h-[89vh]">
        <h1 className="w-full py-4 text-3xl font-bold text-center">
          Insurance Term Glossary
        </h1>
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
          className={`flex flex-wrap w-full h-full gap-4 px-4 pb-4 lg:justify-center 2xl:px-[400px]`}
        >
          {gridData.map((c, i) => (
            <TermCard key={c.id} data={c} />
          ))}
        </div>
      </div>
    </Base>
  );
}

export default GlossaryTerms;

export async function getServerSideProps() {
  const data = await getGlossaryTerms();
  return {
    props: {
      data,
    },
  };
}
