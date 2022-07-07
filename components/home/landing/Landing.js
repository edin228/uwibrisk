import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Landing() {
  const [images, setImages] = useState([
    { id: 1, href: "/office1-1.jpg", text: "Insurance made simple" },
    { id: 2, href: "/house-2.jpeg", text: "Insurance made safe" },
    { id: 3, href: "/cars-1.jpeg", text: "Insurance made easy" },
  ]);
  const [selectedImage, setSelectedImage] = useState(1);


  useEffect(() => {
    const interval = setInterval(() => {
      const maxLimit = images.length;
      const imageCheck = () =>
        selectedImage < maxLimit ? Number(selectedImage) + 1 : 1;
      setSelectedImage(imageCheck());
    }, 18000);
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

  return (
    <div className="landing-base relative flex flex-col w-full h-[28vh] lg:h-[40vh] rounded-lg drop-shadow-xl overflow-hidden">
      <AnimatePresence initial={false} custom={1}>
        <motion.img
          src={images.find((x) => x.id == selectedImage).href}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className="w-full lg:top-[-200px] lg:max-w-[80vw]"
          key={selectedImage}
        ></motion.img>
      </AnimatePresence>
      <div className="absolute left-0 top-[50px] px-8 text-5xl flex drop-shadow-2xl landing-text text-white uppercase tracking-widest font-bold z-30 lg:text-[6rem]">
        {images.find((x) => x.id == selectedImage).text}
      </div>
      <div className="absolute right-0 top-0 w-full h-full z-20 landing-bg opacity-40"></div>
    </div>
  );
}

export default Landing;
