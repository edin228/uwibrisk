import { motion } from "framer-motion";
import { useState } from "react";
import { getIcon } from "../../../../utils/utils";
import HeaderNavButton from "../../desktop/HeaderNavButton";
import { useRouter } from "next/router";
import MobileNavButton from "./MobileNavButton";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = ({ isOpen, navItems = [] }) => {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();
  
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    searchInput.length > 1 ? router.push(`/search?q=${searchInput}`) : null
  };

  return (
    <motion.ul
      className={!isOpen ? "hidden sb-ul z-0" : "sb-ul w-full"}
      variants={variants}
    >
      <form
        className="flex w-full mb-4 rounded-lg border-slate-500/20 border-2 relative"
        onSubmit={handleSubmit}
      >
        <input
          className="rounded-md py-1 px-2 w-full"
          type="search"
          name="search"
          placeholder="Search"
          value={searchInput}
          onInput={handleChange}
        />
        <div
          type="submit"
          name="search"
          className="cursor-pointer rounded-r-md p-2 items-center justify-center flex uppercase tracking-widest font-bold text-lg"
        >
          {getIcon("search")}
        </div>
      </form>
      {navItems.map((item, i) => (
        <MobileNavButton key={i} navItem={item} />
      ))}
    </motion.ul>
  );
};
