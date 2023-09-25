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
        <h1 className="w-full py-4 text-3xl font-bold text-center">
          Get Quotes
        </h1>
        <div className="flex flex-col w-full h-full px-4 py-8 space-y-4 xl:py-20 xl:space-y-0 xl:flex-row xl:flex-wrap xl:px-80 xl:gap-8 xl:items-center xl:justify-center">
          <a
            href={"/commercial-quote"}
            className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col black-gradient shadow-lg border-2 border-zinc-100 rounded-xl h-[450px] w-full xl:w-[237px] 2xl:w-[300px]"
          >
            <div className="flex items-center justify-center h-[200px] text-center text-white rounded-t-xl ">
              <div className="flex p-8 text-5xl border-4 border-white white-shadow rounded-xl text-shadow">
                {getIcon("agency")}
              </div>
            </div>
            <div className="flex items-center justify-center p-2 text-4xl font-bold text-center text-white rounded-b-xl text-shadow">
              Coverage For Your Business
            </div>
          </a>
          <a
            href={"/benefits-quote"}
            className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col  shadow-lg border-2 border-zinc-100 rounded-xl h-[450px] w-full xl:w-[237px] 2xl:w-[300px] black-gradient"
          >
            <div className="flex items-center justify-center  h-[200px] text-center text-white rounded-t-xl ">
              <div className="flex p-8 text-5xl border-4 border-white rounded-xl text-shadow white-shadow ">
                {getIcon("medical")}
              </div>
            </div>
            <div className="flex items-center justify-center p-2 text-3xl font-bold text-center text-white rounded-b-xl text-shadow">
              Employee Healthcare, Benefits, Payroll and HR
            </div>
          </a>
          <a
            href={"/personal-quote"}
            className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col black-gradient shadow-lg border-2 border-zinc-100 rounded-xl h-[450px] w-full xl:w-[237px] 2xl:w-[300px]"
          >
            <div className="flex items-center justify-center  h-[200px] text-center text-white rounded-t-xl ">
              <div className="flex p-8 text-5xl border-4 border-white white-shadow rounded-xl text-shadow">
                {getIcon("house")}
              </div>
            </div>
            <div className="flex items-center justify-center p-2 text-4xl font-bold text-center text-white rounded-b-xl text-shadow">
              Home & Auto Coverage
            </div>
          </a>
          <a
            href={"https://bxsurety.com/bx-pro-landing/92507"}
            target="_blank"
            className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col  shadow-lg border-2 border-zinc-100 rounded-xl h-[450px] w-full xl:w-[237px] 2xl:w-[300px] black-gradient"
            rel="noreferrer"
          >
            <div className="flex items-center justify-center  h-[200px] text-center text-white rounded-t-xl ">
              <div className="flex p-8 text-5xl border-4 border-white white-shadow rounded-xl">
                {getIcon("certificate")}
              </div>
            </div>
            <div className="flex items-center justify-center p-2 text-4xl font-bold text-center text-white rounded-b-xl text-shadow">
              Life
            </div>
          </a>

          <a
            href={"https://bxsurety.com/bx-pro-landing/92507"}
            target="_blank"
            className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col  shadow-lg border-2 border-zinc-100 rounded-xl h-[450px] w-full xl:w-[237px] 2xl:w-[300px] black-gradient"
            rel="noreferrer"
          >
            <div className="flex items-center justify-center  h-[200px] text-center text-white rounded-t-xl ">
              <div className="flex p-8 text-5xl border-4 border-white white-shadow rounded-xl">
                {getIcon("certificate")}
              </div>
            </div>
            <div className="flex items-center justify-center p-2 text-4xl font-bold text-center text-white rounded-b-xl text-shadow">
              Travel
            </div>
          </a>
          <a
            href={"https://bxsurety.com/bx-pro-landing/92507"}
            target="_blank"
            className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col  shadow-lg border-2 border-zinc-100 rounded-xl h-[450px] w-full xl:w-[237px] 2xl:w-[300px] black-gradient"
            rel="noreferrer"
          >
            <div className="flex items-center justify-center  h-[200px] text-center text-white rounded-t-xl ">
              <div className="flex p-8 text-5xl border-4 border-white white-shadow rounded-xl">
                {getIcon("certificate")}
              </div>
            </div>
            <div className="flex items-center justify-center p-2 text-4xl font-bold text-center text-white rounded-b-xl text-shadow">
              Bonds
            </div>
          </a>

          <a
            href={"https://bxsurety.com/bx-pro-landing/92507"}
            target="_blank"
            className="transition duration-100 hover:scale-105 cursor-pointer flex flex-col  shadow-lg border-2 border-zinc-100 rounded-xl h-[450px] w-full xl:w-[237px] 2xl:w-[300px] black-gradient"
            rel="noreferrer"
          >
            <div className="flex items-center justify-center  h-[200px] text-center text-white rounded-t-xl ">
              <div className="flex p-8 text-5xl border-4 border-white white-shadow rounded-xl">
                {getIcon("certificate")}
              </div>
            </div>
            <div className="flex items-center justify-center p-2 text-4xl font-bold text-center text-white rounded-b-xl text-shadow">
              Pet
            </div>
          </a>
        </div>
      </div>
    </Base>
  );
}

export default GetQuotes;
