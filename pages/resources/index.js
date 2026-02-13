import Head from "next/head";
import React from "react";
import Base from "../../components/layout/Base";

function Resources() {
  return (
    <Base template={"Home"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        Resources
      </div>
    </Base>
  );
}

export default Resources;
