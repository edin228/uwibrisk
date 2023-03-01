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
        <h1 className="w-full py-8 text-3xl font-bold text-center">
          Proof of Insurance
        </h1>
        <div className="flex flex-col w-full h-full px-4 space-y-4 xl:space-y-0 xl:flex-row xl:flex-wrap xl:gap-8 xl:items-center xl:justify-center">
          <div className="flex flex-col gap-4">
            <a
              href={"https://clientportal.vertafore.com/Login/3004020-1"}
              className="flex flex-col transition duration-100 bg-white border-2 shadow-lg cursor-pointer hover:scale-105 border-zinc-100 rounded-xl xl:min-h-[300px] xl:h-[200px] w-full xl:w-[237px] 2xl:w-[300px]"
            >
              <div className="flex flex-col items-center justify-center h-full p-2 text-center text-white rounded-xl buring-orange-gradient">
                <div className="flex p-3 text-5xl border-4 border-white drop-shadow-xl rounded-xl">
                  {getIcon("link")}
                </div>
                <div className="relative py-4 text-2xl font-bold xl:text-4xl">
                  Instant COI{" "}
                  <span className="absolute top-[8px] right-[-3px] text-xs">
                    ©
                  </span>
                </div>
              </div>
            </a>
            <div className="flex items-center justify-center w-full h-[100px]">
              <a
                href={"https://clientportal.vertafore.com/Login/3004020-1"}
                className="flex items-center justify-center w-full h-full p-4 text-xl font-bold text-white rounded-lg shadow-lg buring-orange-gradient"
              >
                Manage Your Coverage
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <a
              href={"/certificates-of-insurance"}
              className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col bg-white shadow-lg border-2 border-zinc-100 rounded-xl xl:min-h-[300px] xl:h-[200px] w-full xl:w-[237px] 2xl:w-[300px]"
            >
              <div className="flex flex-col items-center justify-center h-full p-2 text-center text-white rounded-xl orange-yellow-gradient">
                <div className="flex p-3 text-5xl border-4 border-white drop-shadow-xl rounded-xl">
                  {getIcon("certificate")}
                </div>
                <div className="relative py-4 text-2xl font-bold xl:text-4xl">
                  24hr COI{" "}
                  <span className="absolute top-[8px] right-[-3px] text-xs">
                    ©
                  </span>
                </div>
              </div>
            </a>
            <div className="flex items-center justify-center w-full h-[100px]">
              <a
                href={"https://clientportal.vertafore.com/Login/3004020-1"}
                className="relative flex items-center justify-center w-full h-full p-4 text-xl font-bold text-white rounded-lg shadow-lg orange-yellow-gradient"
              >
                <div className="relative">
                  Apply for Instant COI
                  <span className="absolute top-[-8px] right-[-3px] text-xs">
                    ©
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default COI;
