import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TestemonialCard from "../testemonials/TestemonialCard";
import { getIcon } from "../../../utils/utils";
import HeroCard from "../hero/HeroCard";
import Link from "next/link";
import { set } from "lodash";

function HomeContainer({
  landing,
  officeLocations,
  carriers,
  homeButtons,
  posts,
  testemonials,
}) {
  const [selectedImage, setSelectedImage] = useState(1);
  const [firstTestemonial, setFirstTestemonial] = useState(0);
  const [secondTestemonial, setSecondTestemonial] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      const maxLimit = landing.length - 1;
      const imageCheck = () =>
        selectedImage < maxLimit ? Number(selectedImage) + 1 : 0;
      setSelectedImage(imageCheck());
    }, 18000);
    const firstRndm = Math.floor(Math.random() * testemonials?.length);
    const secondRndm =
      Math.floor(Math.random() * testemonials?.length) == firstRndm
        ? Math.floor(Math.random() * testemonials?.length)
        : Math.floor(Math.random() * testemonials?.length);
    setFirstTestemonial(firstRndm);
    setSecondTestemonial(secondRndm);
    return () => clearInterval(interval);
  }, [selectedImage]);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 1,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const OfficeLocationBubbles = () => {
    const coords = [
      { class: `top-[50px] right-[180px]` },
      { class: `top-[300px] right-[50px]` },
      { class: `bottom-[-55px] left-[0px]` },
      { class: `top-[50px] right-[260px]` },
      { class: `top-[50px] right-[260px]` },
    ];

    return officeLocations?.map((card, indx) => (
      <div
        key={card.id}
        className={`hidden md:flex absolute ${coords[indx].class} z-30 w-[250px] h-[200px]`}
      >
        <HeroCard
          image={card.image?.url}
          label={card.state}
          sublabel={card.subtitle}
        />
      </div>
    ));
  };

  return (
    <div className="relative w-full lg:h-[650px] ultrawide-home-height flex flex-col-reverse lg:flex-row md:overflow-hidden">
      <div className="flex flex-col justify-center relative lg:w-2/5 lg:mr-[-100px] z-40">
        <div className="hidden lg:block relative pl-0 lg:pl-4 lg:pr-40 text-3xl lg:text-6xl  drop-shadow-2xl text-white uppercase tracking-widest font-bold text-gradient z-30 text-center lg:text-start h-[200px]">
          {landing[selectedImage].text}
        </div>
        <div className="flex pl-4 my-4 font-bold lg:pr-40 text-center lg:text-start">
          Work with us! We can help you save money and get the coverage you or
          your business deserves with quality customer service!
        </div>
        <div className="flex items-center px-4 space-x-2 mt-8">
          <Link href={`/get-quotes`}>
            <a className="floating-6 duration-200 hover:mt-[-10px] flex flex-1 items-center justify-center rounded-2xl cursor-pointer shadow-md purple-gradient text-white p-4 font-bold">
              Get Quotes
            </a>
          </Link>
          <Link href={`/contact`}>
            <a className="floating duration-200 hover:mt-[-10px] flex flex-1 items-center justify-center rounded-2xl cursor-pointer shadow-md p-4 font-bold border-2 border-purple-500 bg-white">
              Contact Us
            </a>
          </Link>
        </div>
      </div>
      <div className="z-30 relative h-[280px] sm:h-[500px] xl:h-[650px] lg:h-auto mb-4 lg:mb-0 w-full lg:w-2/3 flex flex-auto bg-cover bg-fixed right-0 rounded-lg">
        <div className="hidden lg:flex absolute z-40 top-[60px] left-0">
          <TestemonialCard testemonial={testemonials[firstTestemonial]} />
        </div>
        <div className="hidden lg:flex absolute z-40 bottom-[320px] right-[350px]">
          <TestemonialCard testemonial={testemonials[secondTestemonial]} />
        </div>
        <div className="hidden floating-6 absolute z-40 top-[130px] right-[160px] rounded-full shadow-2xl lg:w-[120px] lg:h-[120px] lg:flex justify-center items-center text-center lg:text-5xl blue-purple-gradient border-2 border-white text-white">
          {getIcon("agency")}
        </div>
        <div className="hidden floating-6 absolute z-40 bottom-[50px] right-[300px] rounded-full shadow-2xl blood-orange-gradient border-2 border-white lg:w-[70px] lg:h-[70px] lg:flex justify-center items-center text-center lg:text-4xl text-white">
          {getIcon("car")}
        </div>
        <div className="hidden floating absolute z-40 bottom-[130px] left-[240px] rounded-full shadow-2xl pink-gradient border-2 border-white lg:w-[100px] lg:h-[100px] lg:flex justify-center items-center text-center lg:text-5xl text-white">
          {getIcon("house")}
        </div>
        {/* <OfficeLocationBubbles /> */}
        <div className="overflow-hidden lg:h-[632px] w-full lg:pl-[48px] right-0">
          <div className="flex w-full h-full absolute bg-black/20 z-30 rounded-2xl">
            <div className="lg:hidden w-full h-full text-5xl lg:text-7xl flex drop-shadow-6xl text-white uppercase tracking-widest font-bold text-gradient  text-center lg:text-start justify-center items-center py-8 px-20">
              <div>{landing[selectedImage].text}</div>
            </div>
          </div>
          <div className="absolute top-0 right-0 rounded-2xl h-full w-full z-20 landing-bg circle-clip"></div>
          <AnimatePresence initial={false} custom={1}>
            <motion.img
              src={landing[selectedImage].image?.url}
              custom={1}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
              }}
              className="absolute h-full w-full bg-cover bg-fixed rounded-2xl shadow-lg  circle-clip right-0"
              key={landing[selectedImage].id}
            ></motion.img>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
