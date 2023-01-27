import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { getPage } from "../services";
import Base from "../components/layout/Base";
import Router, { useRouter } from "next/router";

function DefaultContent({data}) {
  return (
    <>
      {data?.headerImage?.url ? (
        <div className="relative rounded-lg">
          <motion.img
            className="object-cover w-full h-full max-h-[300px] rounded-lg shadow-lg z-[10]"
            src={data?.headerImage?.url}
            alt=""
            initial={false}
          />
          <div className="top-0 rounded-lg absolute w-full h-full bg-indigo-900/40 z-[20]" />
          <div className="items-center justify-center text-middle top-0 w-full h-full absolute flex text-white font-bold text-5xl drop-shadow-lg z-[30]">
            {data?.title}
          </div>
        </div>
      ) : null}
      <div className="flex flex-col w-full h-full ">
        {data?.content.map((c, i) => (
          <div
            key={Date()}
            strategy="afterInteractive"
            className="page-content"
            dangerouslySetInnerHTML={{ __html: c.html }}
          ></div>
        ))}
        {data?.rawHtml.map((card, i) => (
          <div
            key={Date()}
            strategy="afterInteractive"
            className="flex w-full h-full page-content"
            dangerouslySetInnerHTML={{ __html: data?.rawHtml[i] }}
          ></div>
        ))}
      </div>
    </>
  );
}

function Page({ data }) {
  const Content = () => {
    return <DefaultContent data={data} />;
  };

  return (
    <Base template={data?.template}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full px-2 py-2 space-y-4 lg:space-y-0 lg:gap-4 lg:py-4">
        <div className="flex flex-col w-full h-full">
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
