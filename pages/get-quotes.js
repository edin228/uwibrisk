import Head from "next/head";
import React from "react";
import Base from "../components/layout/Base";
import { getIcon } from "../utils/utils";

function GetQuotes() {
  return (
    <Base template={"Grid"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full h-full">
        <h1 className="text-3xl font-bold w-full text-center py-4">
          Get Quotes
        </h1>
        <div className="flex flex-col py-8 xl:py-20 px-4 space-y-4 xl:space-y-0 xl:flex-row xl:flex-wrap xl:gap-8 w-full h-full xl:items-center xl:justify-center">
          <a href={"/commercial-quote"} className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col bg-white shadow-lg border-2 border-slate-100 rounded-xl h-[300px] xl:h-[500px] w-full xl:w-[300px]">
            <div className="flex rounded-t-xl h-full blue-haze-gradient text-white justify-center items-center text-center">
              <div className="flex border-4 border-white drop-shadow-xl rounded-xl text-5xl p-8">
                {getIcon("agency")}
              </div>
            </div>
            <div className="flex text-center items-center justify-center font-bold rounded-b-xl h-[100px] bg-white">
              Business Quote
            </div>
          </a>
          <a href={"/personal-quote"} className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col bg-white shadow-lg border-2 border-slate-100 rounded-xl h-[300px] xl:h-[500px] w-full xl:w-[300px]">
            <div className="flex rounded-t-xl h-full buring-orange-gradient text-white justify-center items-center text-center">
              <div className="flex border-4 border-white drop-shadow-xl rounded-xl text-5xl p-8">
                {getIcon("house")}
              </div>
            </div>
            <div className="flex text-center items-center justify-center font-bold rounded-b-xl h-[100px] bg-white">
              Home & Auto Quote
            </div>
          </a>
          <a href={"/benefits-quote"} className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col bg-white shadow-lg border-2 border-slate-100 rounded-xl h-[300px] xl:h-[500px] w-full xl:w-[300px]">
            <div className="flex rounded-t-xl h-full lime-gradient text-white justify-center items-center text-center">
              <div className="flex border-4 border-white drop-shadow-xl rounded-xl text-5xl p-8">
                {getIcon("medical")}
              </div>
            </div>
            <div className="flex text-center items-center justify-center font-bold rounded-b-xl h-[100px] bg-white">
              Benefits Quote
            </div>
          </a>
        </div>
      </div>
    </Base>
  );
}

export default GetQuotes;
