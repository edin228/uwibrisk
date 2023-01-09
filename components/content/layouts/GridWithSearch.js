import Head from "next/head";
import React, { useEffect, useState } from "react";
import { searchText } from "../../../utils/utils";

function GridWithSearch({ children = null, data = null, title = null }) {
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
      const filtered = searchText(raw, val);
      setGridData(filtered);
    } else {
      setGridData(data);
    }
  };

  return (
    <>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
}

export default GridWithSearch;
