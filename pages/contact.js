import Head from "next/head";
import React from "react";
import { useState } from "react";
import Form from "../components/form/Form";
import Base from "../components/layout/Base";
import { getPage } from "../services";
import { motion } from "framer-motion";
import ContactForm from "../components/form/ContactForm";
import { useEffect } from "react";

function Contact({ data }) {
  const [formFields, setFormFields] = useState(null);
  const [showPanel, setShowPanel] = useState(null)

  useEffect(() => {
    let isCancelled = false;
    const handleChange = async () => {
      if (!isCancelled) {
        setFormFields(data?.forms[0]);
      }
    };
    handleChange();
    return () => {
      isCancelled = true;
    };
  }, [data]);

  return (
    <Base template={"SingleColumn"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex xl:flex-row flex-col w-full xl:w-3/4 p-2 space-y-4 lg:space-y-0 mx-auto py-4 h-full">
        <motion.img
          src={data?.headerImage?.url}
          className="flex absolute w-full blur-[40px] top-[-70%] right-0 z-[-1] bg-cover scale-150"
        />
        <div className="xl:w-[800px] flex items-center justify-center w-full lg:p-4 transition-all duration-250 ease-out">
          <div className="flex flex-col text-white  bg-zinc-900/80 backdrop-blur-lg rounded-lg p-4 z-40w-full shadow-lg justify-center xl:justify-start lg:h-[700px]">
            <div className="text-lg lg:text-5xl font-bold">{data?.title}</div>
            <div className="py-2 w-full">
              <div className="rounded-full w-1/2 h-[4px] bg-yellow-500"></div>
            </div>
            <div className="text-md font-semibold py-2 !text-white">
              {data?.content.map((c, i) => (
                <div
                  key={Date()}
                  strategy="afterInteractive"
                  className="black-box"
                  dangerouslySetInnerHTML={{ __html: c.html }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <motion.div
          
          className="flex items-center justify-center w-full lg:p-4 transition-all duration-250 ease-out"
        >
          {data ? (
            <ContactForm
              style={`lg:h-[700px] w-full flex flex-col p-4 rounded-lg border-2 border-zinc-900/20 shadow-lg bg-zinc-900/80 backdrop-blur-lg  text-white`}
              {...formFields}
            />
          ) : null}
        </motion.div>
        { showPanel && 
          <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              opacity: 1,
              x: 0,
            },
            hidden: { opacity: 1, x: -150 },
          }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="flex items-center justify-center w-full lg:p-4 transition-all duration-250 ease-out"
        >
          {data ? (
            <ContactForm
              style={`lg:h-[700px] w-full flex flex-col p-4 rounded-lg border-2 border-zinc-900/20 shadow-lg bg-zinc-900/80 backdrop-blur-lg  text-white`}
              {...formFields}
            />
          ) : null}
        </motion.div>
        }
      </div>
    </Base>
  );
}

export default Contact;

export async function getServerSideProps() {
  const data = await getPage("contact");
  return {
    props: { data },
  };
}
