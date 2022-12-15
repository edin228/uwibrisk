import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { getPage } from "../services";
import Base from "../components/layout/Base";
import Router, { useRouter } from "next/router";

function Page({ data }) {
  const Content = () => {
    return (
      <div className="flex flex-col w-full h-full">
        {data.content.map((c, i) => (
          <div
            key={Date()}
            strategy="afterInteractive"
            className=""
            dangerouslySetInnerHTML={{ __html: c.html }}
          ></div>
        ))}
        {data.rawHtml.map((card, i) => (
          <div
            key={Date()}
            strategy="afterInteractive"
            className="flex w-full h-full"
            dangerouslySetInnerHTML={{ __html: data.rawHtml[i] }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <Base template={data.template}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full px-2 py-2 space-y-4 lg:space-y-0 lg:gap-4 lg:py-4">
        <div className="flex w-full h-full">
          <Content />
        </div>
      </div>
    </Base>
  );
}

export default Page;

// Fetch data at build time
export async function getServerSideProps({ params }) {
  const data = await getPage(params.slug);
  return {
    props: { data },
  };
}
