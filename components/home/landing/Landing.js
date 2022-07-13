import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Landing() {
  const [images, setImages] = useState([
    { id: 1, href: "/office1-1.jpg", text: "Insurance made simple" },
    { id: 2, href: "/house-2.jpeg", text: "Insurance made reliable" },
    { id: 3, href: "/cars-1.jpeg", text: "Insurance made easy" },
    { id: 4, href: "/work-1.jpeg", text: "Insurance made safe" },
  ]);
  const [selectedImage, setSelectedImage] = useState(1);


  useEffect(() => {
    const interval = setInterval(() => {
      const maxLimit = images.length-1;
      const imageCheck = () =>
        selectedImage < maxLimit ? Number(selectedImage) + 1 : 0;
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
    <div className="landing-base z-10 relative flex flex-col w-full h-[28vh] lg:h-[30vh] rounded-md overflow-hidden">
      <AnimatePresence initial={false} custom={1}>
        <motion.img
          src={images[selectedImage].href}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
          }}
          className="w-full lg:top-[-300px] lg:max-w-[80vw]"
          key={selectedImage}
        ></motion.img>
      </AnimatePresence>
      <div className="absolute left-0 top-[30px] max-w-[95%] lg:max-w-[33%] pl-4 pr-40 text-3xl lg:text-6xl block drop-shadow-2xl landing-text text-white uppercase tracking-widest font-bold text-gradient z-30">
        {images[selectedImage].text}
      </div>
      <div className="absolute right-0 top-0 w-full h-full z-20 landing-bg"></div>
    </div>
  );
}

export default Landing;
