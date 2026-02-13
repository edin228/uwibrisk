/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Base from "../components/layout/Base";
import { motion } from "framer-motion";
import { getIcon } from "../utils/utils";
import { useState } from "react";
import { useEffect } from "react";

const VimeoPlayer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{ position: "relative", padding: "95.25% 0 0 0" }}>
      {isClient && (
        <iframe
          src="https://player.vimeo.com/video/223334793?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          title="Portal Introduction"
        ></iframe>
      )}
    </div>
  );
};

function BenefitsSolutions() {
  return (
    <Base title={"Coffee and Contracts"} template={"SingleColumn"}>
      <div className="flex flex-col p-2 gap-2 items-center">
        <div className="flex flex-col items-center rounded-md  p-2 mb-10">
          <motion.img
            className="object-contain rounded-lg h-[200px] w-[400px]"
            src={`/UWIBRIS.png`}
            alt={`Coffe and Contracts logo`}
            initial={false}
          />
          <div className="text-5xl font-bold uppercase text-center mt-10">
            Benefits & HR Solutions
          </div>
        </div>

        {/* <div className="flex flex-col items-center rounded-md p-2 my-4 bg-white md:bg-transparent">
          <div className="text-3xl font-bold uppercase text-center flex">
            WE’RE READY WHEN YOU ARE, LET’S GET STARTED
          </div>
          <div className="text-xl text-center flex p-4">
            We're proud to serve and have relationships with leaders of the
            specialty coffee community.
          </div>
          <div className="flex justify-between items-center gap-2 px-4">
            <a
              href={`/contact`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full"
            >
              <button
                className={`w-[160px] md:w-[200px] p-2 rounded-md  font-bold border-[2px] border-[#eab308] hover:bg-[#eab308]  transition duration-200`}
              >
                Contact Us
              </button>
            </a>
            <a
              href={`/coffee-industry`}
              target="_blank"
              rel="noreferrer"
              className="flex w-full"
            >
              <button
                className={`w-[160px] md:w-[200px] p-2 rounded-md  font-bold border-[2px] border-[#eab308] hover:bg-[#eab308]  transition duration-200`}
              >
                Get a Quick Quote
              </button>
            </a>
          </div>
        </div> */}
        <div className="flex flex-col md:flex-row bg-zinc-100 w-full md:w-1/2 justify-between items-center p-4 rounded-md">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <div className="font-bold uppercase text-2xl mb-4">
              Deliver Benefits Electronically
            </div>
            <div>
              <span className="font-bold">Online Enrollment</span>
              <span>
                {` `}– Allow your employees to review plan options and enroll
                securely online
              </span>
            </div>
            <div>
              <span className="font-bold">HR Documents</span>
              <span>
                {` `}– Provide employee handbooks and important legal
                notifications to employees, with an e-signature receipt
              </span>
            </div>
            <div>
              <span className="font-bold">Seamless Integration</span>
              <span>
                {` `}– Link to your company’s Payroll, PTO, Performance Reviews
                and Company Directory automatically
              </span>
            </div>
            {/* <div className="flex w-full mt-3">
              <a
                href={`/benefits-check-up`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full"
              >
                <button
                  className={`w-[160px] md:w-[200px] p-2 rounded-md  font-bold border-[2px] border-[#eab308] hover:bg-[#eab308]  transition duration-200`}
                >
                  Benefits Admin
                </button>
              </a>
            </div> */}
          </div>
          <div className="rounded-md w-full md:w-1/2 flex md:justify-end items-center mt-10 md:mt-0 overflow-hidden">
            <motion.img
              className="object-contain rounded-lg rounded-md"
              src={`stock1.jpg`}
              alt={`Pouring Guy 1`}
              initial={false}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full md:w-1/2 justify-between items-center gap-4 rounded-md bg-white md:bg-transparent">
          <div className="relative md:w-1/2 w-full h-[420px]">
            <VimeoPlayer />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <div className="font-bold uppercase text-2xl mb-4">
              Portal Introduction
            </div>
            Watch our brief video to see how to:
            <ul className="flex gap-2 flex-col mt-4">
              <li className="font-bold">• Easily Onboard Employees</li>
              <li className="font-bold">
                • Select Medical Plans and Enroll Dependents
              </li>
              <li className="font-bold">
                • Quickly Check Status of Enrollment
              </li>
            </ul>
            <div className="flex w-full mt-3">
              <a
                href={`/benefits-check-up`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full"
              >
                <button
                  className={`w-[160px] md:w-[200px] p-2 rounded-md  font-bold border-[2px] border-[#eab308] hover:bg-[#eab308]  transition duration-200`}
                >
                  Benefits Checkup
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default BenefitsSolutions;
