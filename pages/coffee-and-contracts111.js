/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Base from "../components/layout/Base";
import { motion } from "framer-motion";
import { getIcon } from "../utils/utils";

function CoffeeAndContracts() {
  return (
    <Base title={"Coffee and Contracts"} template={"SingleColumn"}>
      <div className="flex flex-col p-2 gap-2 items-center">
        <div className="flex flex-col items-center rounded-md  p-2">
          <motion.img
            className="object-contain rounded-lg h-[300px] w-[300px]"
            src={`/coffee-logo.webp`}
            alt={`Coffe and Contracts logo`}
            initial={false}
          />
          <div className="text-5xl font-bold uppercase text-center">
            Coffee & Contracts
          </div>
        </div>

        <div className="flex flex-col items-center rounded-md p-2 my-4 bg-white md:bg-transparent">
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
        </div>
        <div className="flex flex-col md:flex-row bg-zinc-100 w-full md:w-1/2 justify-between items-center p-4 rounded-md">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <div className="font-bold uppercase text-2xl mb-4">
              WHAT WE'RE ABOUT
            </div>
            <div>
              <span className="font-bold">
                Our Coffee & Contracts division was created in 2012
              </span>
              <span>
                {` `}after recognizing that during the past 20 years, we had
                gradually become the insurance brokers and professional advisers
                to many of the leading US specialty coffee wholesalers and third
                wave coffee bars, roasters, and importers.
              </span>
            </div>
            <div>
              <span className="font-bold">
                At Coffee & Contracts, we see ourselves as partners
              </span>
              <span>
                {` `}with the small and mid-sized coffee businesses that find
                themselves facing the challenges of navigating through today’s
                labor and insurance complexities. We bring our years of
                experience and insight to the world of coffee, with our goal
                being to expertly serve our clients.
              </span>
            </div>
            <div>
              <span className="font-bold">
                Because of our focus, we provide all of these tailored services
                at no additional cost,
              </span>
              <span>
                {` `}and more often than not, we can assist our clients to save
                money immediately after performing our cost-free review.
              </span>
            </div>
          </div>
          <div className="rounded-md w-full md:w-1/2 flex md:justify-end items-center mt-10 md:mt-0">
            <motion.img
              className="object-contain rounded-lg h-[400px] w-[300px] rounded-md"
              src={`cffe-e1554748560341.jpg`}
              alt={`Pouring Guy 1`}
              initial={false}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full md:w-1/2 justify-between items-center p-4 rounded-md bg-white md:bg-transparent">
          <div className="rounded-md w-full md:w-1/2 flex md:justify-start justify-center items-center">
            <motion.img
              className="object-contain rounded-lg h-[400px] w-[300px] rounded-md"
              src={`picture-who-we.jpg`}
              alt={`Dana and Josh`}
              initial={false}
            />
          </div>
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <div className="font-bold uppercase text-2xl mb-4">Who We Are</div>
            <div>
              Josh Acosta and Dana Coates are the people who spearhead Coffee &
              Contracts, a division of UWIB. Josh goes for single origin
              espresso while Dana is an add-shot latte guy.
            </div>
            <div>
              Josh and his wife live and work in Seattle while Dana and his wife
              live and work in Southern California. Between the two offices and
              as members of the Specialty Coffee Association, they have worked
              with a good chunk of the specialty coffee world.
            </div>
            <div>
              UWIB’s roots of providing risk management and consulting services
              date all the way back to 1918.
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full bg-zinc-100 p-4 md:h-[300px] justify-center items-center gap-2 rounded-md">
          <div className="flex flex-col items-center">
            <div className="text-[3rem] md:text-[5rem] mb-4">
              {getIcon("binoculars")}
            </div>
            <div className="font-bold text-2xl">Identify</div>
            <div className="p-2 w-3/4 text-center">
              Uncover your most critical needs and address them
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[3rem] md:text-[5rem] mb-4">
              {getIcon("scale")}
            </div>
            <div className="font-bold text-2xl">Evaluate</div>
            <div className="p-2 w-3/4 text-center">
              Customize a program to compare your options
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[3rem] md:text-[5rem] mb-4">
              {getIcon("handshake")}
            </div>
            <div className="font-bold text-2xl">Support</div>
            <div className="p-2 w-3/4 text-center">
              We’ll continue to advise and stand beside you
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row bg-white w-full md:w-1/2 justify-between items-center p-4 rounded-md">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <div className="font-bold uppercase text-2xl mb-4">
              WHAT WE DO THAT'S DIFFERENT
            </div>
            <div>
              Based on our real-world coffee related experiences which span two
              decades, we provide a unique, practical, and cost effective set of
              solutions.
            </div>
            <div>
              <span className="font-bold">Insight</span>
              <span>
                {` `}– We’ve learned valuable lessons and use common sense to
                solve problems
              </span>
            </div>
            <div>
              <span className="font-bold">Experience</span>
              <span>
                {` `}– More than two decades of consulting coffee importers,
                roasters, wholesalers and retailers.
              </span>
            </div>
            <div>
              <span className="font-bold">Passion</span>
              <span>
                {` `}– We know the difference between a gibraltar and a flat
                white, our passion for quality while helping our clients to be
                thrifty shows through in our attention to detail.
              </span>
            </div>
          </div>
          <div className="rounded-md w-full md:w-1/2 flex md:justify-end items-center mt-10 md:mt-0">
            <motion.img
              className="object-contain rounded-lg h-[400px] w-[300px] rounded-md"
              src={`Josh-Pouring-Milk.jpg`}
              alt={`Pouring Guy 2`}
              initial={false}
            />
          </div>
        </div>
        <div className="flex flex-col bg-white w-full md:w-1/2 justify-between items-center p-4 rounded-md">
          <div className="font-bold uppercase text-2xl mb-4 flex items-center justify-center w-full text-center">
            COMPANIES IN COFFEE THAT WE ADMIRE
          </div>
          <div className="flex flex-wrap items-center justify-center w-full gap-2">
            <a
              href={`https://gget.com/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/o2-GandB-400x300.webp`}
                alt={`G&B`}
                initial={false}
              />
            </a>
            <a
              href={`https://www.jonescoffeeroasters.com/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/JonesCoffee.webp`}
                alt={`G&B`}
                initial={false}
              />
            </a>
            <a
              href={`https://populace.coffee/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/o2-Populace-400x300.webp`}
                alt={`G&B`}
                initial={false}
              />
            </a>
            <a
              href={`https://www.womenincoffee.org/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/o2-IWCA-400x300.webp`}
                alt={`G&B`}
                initial={false}
              />
            </a>
            <a
              href={`https://artisancoffeeimports.com/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/o2-ACI-400x300.png`}
                alt={`G&B`}
                initial={false}
              />
            </a>
            <a
              href={`https://copa-vida.com/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/o2-Copa-400x300.webp`}
                alt={`G&B`}
                initial={false}
              />
            </a>
            <a
              href={`https://sca.coffee/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/SCA_logo_header.jpg`}
                alt={`G&B`}
                initial={false}
              />
            </a>
            <a
              href={`https://milsteadandco.com/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/o2-Milstead-400x300.webp`}
                alt={`G&B`}
                initial={false}
              />
            </a>
            <a
              href={`https://www.foundcoffeela.com/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/o2-Found-400x300.webp`}
                alt={`G&B`}
                initial={false}
              />
            </a>
            <a
              href={`https://www.dittaartigianale.it/`}
              target="_blank"
              rel="noreferrer"
              className="flex"
            >
              <motion.img
                className="object-contain rounded-lg h-[200px] w-[150px] rounded-md"
                src={`Coffee/Artigianale-400x300.webp`}
                alt={`G&B`}
                initial={false}
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-md p-2 bg-white md:bg-transparent mb-2">
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
        </div>
      </div>
    </Base>
  );
}

export default CoffeeAndContracts;
