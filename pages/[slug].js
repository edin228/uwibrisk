import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { getHighlightedTestemonials, getPage } from "../services";
import Base from "../components/layout/Base";
import Router, { useRouter } from "next/router";
import { getIcon } from "../utils/utils";
import TestemonialCard from "../components/home/testemonials/TestemonialCard";
import TestemonialPageCard from "../components/home/testemonials/TestemonialPageCard";

function DefaultContent({ data }) {
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

function LandingPageContent({ data }) {
  const [testemonials, setTestemonials] = useState([]);

  useEffect(() => {
    getTestemonials();
    return () => {};
  }, [data]);

  const getTestemonials = async () => {
    const testemonials = await getHighlightedTestemonials();
    setTestemonials(testemonials);
    return testemonials;
  };
  return (
    <div className="relative flex flex-col w-full p-2 space-y-4 lg:space-y-0 lg:gap-4 lg:pt-0 lg:pb-4">
      <div className="relative flex w-full h-[750px] p-4 rounded-lg overflow-hidden">
        <div className="text-white  bg-slate-900/60 lg:bg-slate-900/50 backdrop-blur-lg rounded-lg p-4 z-40 flex flex-col w-full lg:w-1/2 shadow-lg  justify-center">
          <div className="text-lg lg:text-5xl font-bold">{data?.title}</div>
          <div className="py-2 w-full">
            <div className="rounded-full w-1/2 h-[4px] bg-yellow-500"></div>
          </div>
          <div className="text-md font-semibold py-2">
            {data?.wordingUnderTitle}
          </div>
          {/* <div className="py-4 flex items-center space-x-2">
            <div className="cursor-pointer flex items-center p-2 text-xl rounded-lg border-2 border-sky-500 shadow-lg w-[200px] text-center justify-center font-bold duration-100 transition bg-sky-500 text-white">
              Contact Us
            </div>
          </div> */}
        </div>
        <motion.img
          src={data?.headerImage?.url}
          className="hidden lg:flex absolute blur w-full top-[-70%] right-0 z-[-1] bg-cover scale-150"
        ></motion.img>
      </div>
      <motion.img
        src={data?.headerImage?.url}
        className="absolute w-full rounded-lg lg:rounded-[10%] top-[-5%] md:top-[-10%] lg:top-[1%] lg:max-w-[366px] lg:w-auto right-0 lg:right-[3%] z-[10] bg-cover bg-blend-multiply"
      ></motion.img>

      <div className="z-40 flex flex-col lg:flex-row w-full items-center justify-center space-y-2 lg:space-y-0 lg:space-x-2">
        {data?.components.map((card, i) => (
          <div
            key={card.id}
            className="text-white flex flex-col w-full lg:flex-auto h-[300px] bg-slate-900/80 backdrop-blur rounded-lg shadow-lg p-4"
          >
            <div className="flex justify-center text-center font-bold">
              {card.title}
            </div>
            <div className="flex items-center justify-center w-full text-6xl py-6 text-yellow-500">
              {getIcon(card.icon)}
            </div>
            <div className="font-bold flex justify-center text-center text-sm">
              {card.description}
            </div>
          </div>
        ))}
      </div>
      <div className="z-40 flex flex-col flex-wrap 2xl:flex-nowrap lg:flex-row w-full items-center justify-center space-y-2 lg:space-y-0 lg:space-x-2">
        {testemonials?.map((card, i) => (
          <TestemonialPageCard key={card.id} testemonial={card} />
        ))}
      </div>
      {data?.rawHtml.map((card, i) => (
        <div
          key={Date()}
          strategy="afterInteractive"
          className="flex w-full h-full page-content rounded-lg overflow-hidden"
          dangerouslySetInnerHTML={{ __html: data?.rawHtml[i] }}
        ></div>
      ))}
    </div>
  );
}

function Page({ data }) {
  const Content = () => {
    if (data?.template == "LandingPage") {
      return <LandingPageContent data={data} />;
    }
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
