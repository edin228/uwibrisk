import Head from "next/head";
import React from "react";
import Base from "../components/layout/Base";
import { getIcon } from "../utils/utils";

function COI() {
  return (
    <Base template={"DualColumn"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        <h1 className="w-full py-4 text-3xl font-bold text-center">
          Certificates of Insurance
        </h1>
        <div className="flex flex-col w-full h-full px-4 py-8 space-y-4 xl:py-20 xl:space-y-0 xl:flex-row xl:flex-wrap xl:gap-8 xl:items-center xl:justify-center">
          <a
            href={"https://clientportal.vertafore.com/Login/3004020-1"}
            className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col bg-white shadow-lg border-2 border-zinc-100 rounded-xl h-[300px] xl:h-[500px] w-full xl:w-[237px] 2xl:w-[300px]"
          >
            <div className="flex items-center justify-center h-full text-center text-white rounded-t-xl orange-yellow-gradient">
              <div className="flex p-8 text-5xl border-4 border-white drop-shadow-xl rounded-xl">
                {getIcon("link")}
              </div>
            </div>
            <div className="flex flex-col w-full rounded-b-xl h-[200px] bg-white p-4">
              <div className="flex items-center justify-center font-bold text-center">
                Client Portal
              </div>
              <div className="text-center">
                Are you client of ours? Sign-in to your client portal and
                request a certificate directly from your account!
              </div>
            </div>
          </a>
          <a
            href={"/certificates-of-insurance"}
            className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col bg-white shadow-lg border-2 border-zinc-100 rounded-xl h-[300px] xl:h-[500px] w-full xl:w-[237px] 2xl:w-[300px]"
          >
            <div className="flex items-center justify-center h-full text-center text-white rounded-t-xl buring-orange-gradient">
              <div className="flex p-8 text-5xl border-4 border-white drop-shadow-xl rounded-xl">
                {getIcon("certificate")}
              </div>
            </div>
            <div className="flex flex-col w-full rounded-b-xl h-[200px] bg-white p-4">
              <div className="flex items-center justify-center font-bold text-center">
                Web Form
              </div>
              <div className="text-center">
                Use our simple and easy form to request a certificate quickly!
              </div>
            </div>
          </a>
        </div>
      </div>
    </Base>
  );
}

export default COI;
