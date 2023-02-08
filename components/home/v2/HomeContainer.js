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
        x: 0,
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
        <div className="hidden lg:block relative pl-0 lg:pl-4 lg:pr-40 text-3xl lg:text-6xl  drop-shadow-2xl uppercase tracking-widest font-poppins font-bold z-30 text-center lg:text-start h-[200px]">
          <h1 className="drop-shadow-sm">
            Insurance Made
            <br className="hidden sm:block"></br>
            <span className="text-gradient">Simple</span>
          </h1>
        </div>
        <p className="flex pl-4 my-4 font-semibold text-center lg:pr-40 lg:text-start font-poppins">
          Work with us! <br className="hidden sm:block"></br> We can help you
          save money and get the coverage you or your business deserves with
          quality customer service.
        </p>
        <div className="flex items-center px-4 mt-8 space-x-2">
          <div className="relative flex flex-1">
            <Link href={`/get-quotes`}>
              <a className="duration-200 hover:mt-[-10px] flex flex-1 items-center justify-center rounded-xl cursor-pointer shadow-md purple-gradient text-white p-4 font-bold">
                Get Quotes
              </a>
            </Link>
          </div>
          <div className="relative flex flex-1">
            <Link href={`/contact`}>
              <a className="duration-200 hover:mt-[-10px] flex flex-1 items-center justify-center rounded-xl cursor-pointer shadow-md p-4 font-bold border-2 border-purple-500 bg-white">
                Contact Us
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="z-30 relative h-[140px] sm:h-[400px] xl:h-auto lg:h-auto mb-4 lg:mb-0 w-full lg:w-2/3 flex flex-auto bg-cover bg-fixed right-0 rounded-lg">
        <div className="hidden lg:flex absolute z-40 top-[60px] left-0">
          <TestemonialCard testemonial={testemonials[firstTestemonial]} />
        </div>
        <div className="hidden lg:flex absolute z-40 bottom-[320px] right-[350px]">
          <TestemonialCard testemonial={testemonials[secondTestemonial]} />
        </div>
        <div className="hidden floating-6 absolute z-40 top-[60px] right-[120px] rounded-full shadow-2xl lg:w-[120px] lg:h-[120px] lg:flex justify-center items-center text-center lg:text-5xl blue-purple-gradient border-2 border-white text-white">
          {getIcon("agency")}
        </div>
        <div className="hidden floating-6 absolute z-40 bottom-[50px] right-[300px] rounded-full shadow-2xl blood-orange-gradient border-2 border-white lg:w-[70px] lg:h-[70px] lg:flex justify-center items-center text-center lg:text-4xl text-white">
          {getIcon("car")}
        </div>
        <div className="hidden floating absolute z-40 bottom-[30px] left-[60px] rounded-full shadow-2xl pink-gradient border-2 border-white lg:w-[100px] lg:h-[100px] lg:flex justify-center items-center text-center lg:text-5xl text-white">
          {getIcon("house")}
        </div>
        {/* <OfficeLocationBubbles /> */}
        <div className="overflow-hidden lg:h-[642px] w-full lg:pl-[48px] right-0  bg-blend-overlay">
          <div className="absolute z-30 flex w-full h-full lg:hidden rounded-xl">
            <div className="flex text-center items-center justify-center lg:hidden relative pl-4 text-4xl drop-shadow-2xl uppercase tracking-widest font-poppins font-bold z-30 h-[200px] w-full">
              <h1 className="flex flex-col items-center w-full">
                Insurance
                <span>Made</span>
                <br className="hidden sm:block"></br>
                <span className="text-gradient">Simple</span>
              </h1>
            </div>
          </div>
          <div className="flex justify-center w-full overflow-hidden rounded-lg bg-blend-saturation">
            <AnimatePresence initial={false} custom={1}>
              <motion.img
                src={landing[0].image?.url}
                custom={1}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 30 },
                }}
                className="hidden lg:flex w-10/12 object-contain shadow-lg right-0 z-[1] rounded-full bg-blend-saturation"
                key={landing[0].id}
              ></motion.img>
            </AnimatePresence>
          </div>

          {/* <div className="blue__gradient absolute top-0 z-[0] w-[40%] h-[90%] lg:h-[35%]" /> */}
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
