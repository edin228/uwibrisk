import Head from "next/head";
import React from "react";
import { useState } from "react";
import Form from "../components/form/Form";
import Base from "../components/layout/Base";
import { getPage } from "../services";
import { getIcon } from "../utils/utils";
import { motion } from "framer-motion";

function Contact({ data }) {
  return (
    <Base template={"SingleColumn"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex flex-col w-full xl:w-3/4 p-2 space-y-4 lg:space-y-0 lg:gap-4  mx-auto py-4 h-full">
        <div className="text-white  bg-zinc-900/80 backdrop-blur-lg rounded-lg p-4 z-40 flex flex-col w-full shadow-lg justify-center xl:justify-start h-max">
          <div className="text-lg lg:text-5xl font-bold">{data?.title}</div>
          <div className="py-2 w-full">
            <div className="rounded-full w-1/2 h-[4px] bg-yellow-500"></div>
          </div>
          <div className="text-md font-semibold py-2">
            <div
              key={Date()}
              strategy="afterInteractive"
              className="page-content"
              dangerouslySetInnerHTML={{ __html: data?.wordingUnderTitle }}
            ></div>
          </div>
        </div>
        <motion.img
          src={data?.headerImage?.url}
          className="flex absolute w-full blur-[40px] top-[-70%] right-0 z-[-1] bg-cover scale-150"
        ></motion.img>
        <div className="flex items-center justify-center w-full">
          {data ? (
            <Form
              style={`w-[400px] flex flex-col p-4 rounded-lg border-2 border-zinc-900/20 shadow-lg bg-zinc-900/80 backdrop-blur-lg  text-white`}
              {...data?.forms[0]}
            />
          ) : null}
        </div>
      </div>
    </Base>
  );
}

export default Contact;

export async function getServerSideProps() {
  const data = await getPage("contact");
  return {
    props: { data },
  };
}
