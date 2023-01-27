import Head from "next/head";
import Base from "../components/layout/Base";
import { getLanding } from "../services";
import { getIcon } from "../utils/utils";
import { motion } from "framer-motion";



export default function PrivateClient({
  landing = null,
  officeLocations = null,
  carriers = null,
  posts = null,
  testemonials = null,
  homeButtons = null,
}) {
  return (
    <Base template={"home"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex flex-col w-full p-2 space-y-4 lg:space-y-0 lg:gap-4 lg:pt-0 lg:pb-4">
        <div className=" flex w-full h-[450px] p-4 rounded-lg">
          <div className="text-white lg:text-inherit bg-slate-900/60 lg:bg-transparent backdrop-blur-lg rounded-lg p-2 z-40 flex flex-col w-full lg:w-1/2 py-4 items-center justify-center">
            <div className="text-2xl font-bold">Private Client Services</div>
            <div className="text-md font-semibold py-2 text-center">
              As you continue to grow your wealth and make plans for the future,
              ordinary insurance protection likely isn’t enough. UWIB Risk
              Insurance Solutions Private Client Services (UWIB PCS) has the
              expertise and specialty solutions that can help you protect the
              things you care about most.
            </div>
            <div className="py-4 flex items-center space-x-2">
              <div className="cursor-pointer flex items-center p-2 text-xl rounded-lg border-2 border-sky-500 shadow-lg w-[200px] text-center justify-center font-bold duration-100 transition bg-sky-500 text-white">
                Contact Us
              </div>
            </div>
          </div>
        </div>
        <motion.img
          src={"/bently.png"}
          className="absolute w-full md:top-[-10%] lg:top-0 lg:max-w-[600px] lg:w-auto right-0 lg:right-[4%] z-[10] bg-cover bg-blend-multiply"
        ></motion.img>
        <motion.img
          src={"/bently.png"}
          className="hidden lg:flex absolute blur w-full lg:w-1/2 right-0 z-[-1] bg-cover"
        ></motion.img>
        <div className="z-40 flex flex-col lg:flex-row w-full items-center justify-center space-y-2 lg:space-y-0 lg:space-x-2">
          <div className="text-white flex flex-col w-full lg:flex-auto h-[250px] bg-slate-900 rounded-lg shadow-lg p-4">
            <div className="flex justify-center text-center font-bold">
              Amet dolore mollit{" "}
            </div>
            <div className="flex items-center justify-center w-full text-6xl py-6 text-yellow-500">
              {getIcon("policy")}
            </div>
            <div className="flex justify-center text-center">
              Ut voluptate id fugiat tempor. Voluptate aliqua consectetur dolore
              in fugiat eu occaecat et. Anim aute in cupidatat nostrud culpa
              officia.
            </div>
          </div>
          <div className="text-white flex flex-col w-full lg:flex-auto h-[250px] bg-slate-900 rounded-lg shadow-lg p-4">
            <div className="flex justify-center text-center font-bold">
              Amet dolore mollit{" "}
            </div>
            <div className="flex items-center justify-center w-full text-6xl py-6 text-yellow-500">
              {getIcon("policy")}
            </div>
            <div className="flex justify-center text-center">
              Ut voluptate id fugiat tempor. Voluptate aliqua consectetur dolore
              in fugiat eu occaecat et. Anim aute in cupidatat nostrud culpa
              officia.
            </div>
          </div>
          <div className="text-white flex flex-col w-full lg:flex-auto h-[250px] bg-slate-900 rounded-lg shadow-lg p-4">
            <div className="flex justify-center text-center font-bold">
              Amet dolore mollit{" "}
            </div>
            <div className="flex items-center justify-center w-full text-6xl py-6 text-yellow-500">
              {getIcon("policy")}
            </div>
            <div className="flex justify-center text-center">
              Ut voluptate id fugiat tempor. Voluptate aliqua consectetur dolore
              in fugiat eu occaecat et. Anim aute in cupidatat nostrud culpa
              officia.
            </div>
          </div>
        </div>
        {/* <div className="h-[600px] w-full py-4 z-40">
          <div
            className="flex h-full w-1/2 "
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: form,
            }}
          ></div>
        </div> */}
      </div>
    </Base>
  );
}

// Fetch data at build time
export async function getServerSideProps({ params }) {
  const landing = await getLanding();
  return {
    props: {
      landing,
    },
  };
}
