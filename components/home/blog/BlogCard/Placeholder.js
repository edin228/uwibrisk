import * as React from "react";
import { LoremIpsum } from "react-lorem-ipsum";
import { motion, useDeprecatedInvertedScale } from "framer-motion";
import Link from "next/link";

// eslint-disable-next-line react/display-name
export const Placeholder = React.memo(( { id } ) => {
  const inverted = useDeprecatedInvertedScale(15,15);
  return (
    <motion.div
      className="content-container flex flex-col"
      style={{ ...inverted, originY: 0, originX: 0 }}
    >
      <p>lorem asd sa
      d sa
      d shadowsadasdad asdas dsad asd sadsadas ds  asdsad  asdsadsa a asdsadasd 
       asdsadsa asdsa sadas adssda adadssd asdas
       asdasdsad as adsda d</p>
       <p>lorem asd sa
      d sa
      d shadowsadasdad asdas dsad asd sadsadas ds  asdsad  asdsadsa a asdsadasd 
       asdsadsa asdsa sadas adssda adadssd asdas
       asdasdsad as adsda d</p>
       <p>lorem asd sa
      d sa
      d shadowsadasdad asdas dsad asd sadsadas ds  asdsad  asdsadsa a asdsadasd 
       asdsadsa asdsa sadas adssda adadssd asdas
       asdasdsad as adsda d</p>
       <p>lorem asd sa
      d sa
      d shadowsadasdad asdas dsad asd sadsadas ds  asdsad  asdsadsa a asdsadasd 
       asdsadsa asdsa sadas adssda adadssd asdas
       asdasdsad as adsda d</p>
       <p>lorem asd sa
      d sa
      d shadowsadasdad asdas dsad asd sadsadas ds  asdsad  asdsadsa a asdsadasd 
       asdsadsa asdsa sadas adssda adadssd asdas
       asdasdsad as adsda d</p>
       <p>lorem asd sa
      d sa
      d shadowsadasdad asdas dsad asd sadsadas ds  asdsad  asdsadsa a asdsadasd 
       asdsadsa asdsa sadas adssda adadssd asdas
       asdasdsad as adsda d</p>
       <p>lorem asd sa
      d sa
      d shadowsadasdad asdas dsad asd sadsadas ds  asdsad  asdsadsa a asdsadasd 
       asdsadsa asdsa sadas adssda adadssd asdas
       asdasdsad as adsda d</p>
       <Link href={`/blog/${id}`}>
         <a className="flex justify-end w-full text-md text-sky-500 font-bold uppercase tracking-widest">Read More</a>
       </Link>
    </motion.div>
  );
});
