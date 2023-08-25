import React from "react";
import HomeContactForm from "../components/contact/HomeContactForm";
import Head from "next/head";
import Base from "../components/layout/Base";

function contact() {
  return (
    <Base template={"SingleColumn"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex items-center justify-center w-full h-[80vh]">
        <div className="flex flex-col w-full px-4 2xl:w-1/2">
          <div className="flex items-center justify-center w-full mb-4 tracking-widest uppercase">
            <h2 className="text-xl">Contact an Advisor</h2>
          </div>
          <HomeContactForm />
        </div>
      </div>
    </Base>
  );
}

export default contact;
