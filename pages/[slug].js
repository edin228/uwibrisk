import React, { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { getHighlightedTestemonials, getPage } from "../services";
import Base from "../components/layout/Base";
import Router, { useRouter } from "next/router";
import { getIcon } from "../utils/utils";
import TestemonialCard from "../components/home/testemonials/TestemonialCard";
import TestemonialPageCard from "../components/home/testemonials/TestemonialPageCard";
import Link from "next/link";
import WideCard from "../components/WideCard";
import PageHeader from "../components/PageHeader";

function DefaultContent({ data }) {
  return (
    <>
      {data?.headerImage?.url ? (
        <div className="relative rounded-lg">
          <motion.img
            className="object-cover w-full h-full max-h-[240px] shadow-lg z-[10]"
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
      <div
        className={`flex items-center flex-col w-full h-full ${
          data?.template != "WebForm" ? "px-8" : ""
        }`}
      >
        {data?.content.map((c, i) => (
          <div
            key={Date()}
            strategy="afterInteractive"
            className="w-full xl:w-3/4 page-content"
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
    <div className="relative flex flex-col w-3/4 p-2 py-4 mx-auto space-y-4 lg:space-y-0 lg:gap-4">
      <div className="relative flex w-full h-[395px] p-4 rounded-lg overflow-hidden">
        <div className="z-40 flex flex-col justify-center w-full p-4 text-white rounded-lg shadow-lg bg-zinc-900/60 lg:bg-zinc-900/50 backdrop-blur-lg lg:w-1/2">
          <div className="text-lg font-bold lg:text-5xl">{data?.title}</div>
          <div className="w-full py-2">
            <div className="rounded-full w-1/2 h-[4px] bg-yellow-500"></div>
          </div>
          <div className="py-2 font-semibold text-md">
            {data?.wordingUnderTitle}
          </div>
        </div>
        <motion.img
          src={data?.headerImage?.url}
          className="hidden lg:flex absolute blur-[4px] w-full top-[-70%] right-0 z-[-1] bg-cover scale-150"
        ></motion.img>
        <div className="flex items-center py-4 absolute top-[30%] right-[15%] hover:scale-110 transition duration-100">
          <Link
            href={
              "https://outlook.office.com/bookwithme/user/64af5564721d47918b0c4061dff559e0@uwib.com/meetingtype/zPlzuawutkij0GZ1BCf8KA2?anonymous&ep=mlink"
            }
          >
            <button
              className={`bg-[#eab308] text-shadow-sm text-white p-2 rounded-md bg-shadow-lg text-2xl font-bold border-[2px] border-[#eab308]  transition duration-200 `}
            >
              Schedule a Consultation
            </button>
          </Link>
        </div>
      </div>
      {/* <motion.img
        src={data?.headerImage?.url}
        className="absolute w-full rounded-lg lg:rounded-[10%] top-[-5%] md:top-[-10%] lg:top-[1%] lg:max-w-[366px] lg:w-auto right-0 lg:right-[3%] z-[10] bg-cover bg-blend-multiply"
      ></motion.img> */}

      <div className="z-40 flex flex-col items-center justify-center w-full space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
        {data?.components.map((card, i) => (
          <div
            key={card.id}
            className="flex flex-col w-full lg:flex-auto h-[300px] backdrop-blur rounded-lg  p-4"
          >
            <div className="flex justify-center font-bold text-center">
              {card.title}
            </div>
            <div className="flex items-center justify-center w-full py-6 text-6xl text-yellow-500">
              {getIcon(card.icon)}
            </div>
            <div className="flex items-center justify-center h-full text-sm font-bold text-center rounded-lg ">
              {card.description}
            </div>
          </div>
        ))}
      </div>
      <div className="z-40 flex flex-col flex-wrap items-center justify-center w-full space-y-2 2xl:flex-nowrap lg:flex-row lg:space-y-0 lg:space-x-2">
        {testemonials?.map((card, i) => (
          <TestemonialPageCard key={card.id} testemonial={card} />
        ))}
      </div>
      {data?.rawHtml.map((card, i) => (
        <div
          key={Date()}
          strategy="afterInteractive"
          className="overflow-hidden rounded-lg page-content"
          dangerouslySetInnerHTML={{ __html: data?.rawHtml[i] }}
        ></div>
      ))}
    </div>
  );
}

function CustomPageContent({ data }) {
  return (
    <div className="flex flex-col p-2 gap-2 items-center">
      {data?.components.map((c, i) =>
        c.__typename === "PageHeader" ? (
          <PageHeader key={c.id} data={c} />
        ) : c.__typename === "WideCard" ? (
          <WideCard key={c.id} data={c} />
        ) : null
      )}
    </div>
  );
}

function Page({ data }) {
  const Content = () => {
    if (data?.template == "LandingPage") {
      return <LandingPageContent data={data} />;
    }
    if (data?.template == "customLandingPage") {
      return <CustomPageContent data={data} />;
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
      <div className="flex flex-col w-full space-y-4 lg:space-y-0 lg:gap-4">
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
