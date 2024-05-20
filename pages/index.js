import BlogContainer from "../components/blog/BlogContainer";
import CarriersContainer from "../components/home/carriers/CarriersContainer";
import Base from "../components/layout/Base";
import {
  getCarrierInfo,
  getLanding,
  getOfficeLocations,
  getRecentBlogPosts,
  getTestemonials,
} from "../services";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import TestemonialPageCard from "../components/home/testemonials/TestemonialPageCard";
import Head from "next/head";
import Image from "next/image";

const TypingText = () => {
  return (
    <TypeAnimation
      sequence={[
        "Business Insurance", // Types 'One'
        3000, // Waits 1s
        "Personal Insurance", // Deletes 'One' and types 'Two'
        3000, // Waits 2s
        "Health Insurance", // Deletes 'One' and types 'Two'
        3000, // Waits 2s
        "Employee Benefits", // Deletes 'One' and types 'Two'
        3000, // Waits 2s
        () => {},
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      speed={2}
      deletionSpeed={88}
      style={{ fontSize: "1em" }}
    />
  );
};

export default function Home({
  carriers = null,
  posts = null,
  testemonials = null,
}) {
  return (
    <Base template={"home"}>
      <Head>
        <title>UWIB Risk</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex flex-col w-full space-y-4 lg:space-y-0 lg:gap-4 lg:pt-0 lg:pb-4">
        {testemonials ? (
          <div className="relative overflow-hidden max-h-[480px]">
            <div className=" w-[400px] 2xl:w-[760px] flex flex-col absolute top-[20%] left-[15%] z-40 text-white font-bold text-2xl lg:text-5xl text-shadow">
              <TypingText />
              <div className="pt-2">
                <div className="bg-yellow-500 w-3/5 h-[5px] rounded-lg"></div>
              </div>
              <div className="py-2 tracking-wide">Made Simple</div>
              <div className="flex gap-2 xl:py-4">
                <Link href={`/get-quotes`}>
                  <a className="flex flex-col items-center px-4 py-2 text-xs font-bold transition duration-200 border-2 border-yellow-500 shadow-md cursor-pointer md:text-sm hover:bg-yellow-500 rounded-xl">
                    <span className="text-xs md:text-xl">Get Quotes</span>
                  </a>
                </Link>
                <Link href={`/contact`}>
                  <a className="flex flex-col items-center px-4 py-2 text-xs font-bold transition duration-200 border-2 border-yellow-500 shadow-md cursor-pointer md:text-sm hover:bg-yellow-500 rounded-xl">
                    <span className="text-xs md:text-xl">
                      Contact An Advisor
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            {/* <div className="absolute top-[-50px] right-[14px] z-40 h-[200px] w-[400px]">
              <Image
                src="/UWIBRIS-White.png"
                alt="logo"
                layout="fill"
                objectFit="contain"
              />
            </div> */}
            <div className="absolute top-0 z-30 w-full h-full bg-zinc-900/70"></div>
            <video
              className="z-30 flex justify-center w-full"
              autoPlay
              muted
              loop
              playsInline
              poster
            >
              <source src="/stock-video.mp4" type="video/mp4" />
            </video>
          </div>
        ) : null}
        <div className="relative flex flex-col w-full h-full p-4 xl:w-3/4 xl:mx-auto">
          <CarriersContainer carriers={carriers} />
          <div className="py-4">
            <div className="flex flex-col items-center justify-center w-full gap-2 mb-2 font-semibold text-center">
              <div className="tracking-widest uppercase ">
                See what our clients are saying
              </div>
              <a
                target="_blank"
                rel="noreferrer"
                href="http://UWIBRiskInsuranceSolutions.rocketresponses.com/review_us/rs74UQg5yobEwrSfv1KJAQ"
              >
                <div className="px-2 text-white bg-yellow-500 rounded-md shadow-md">
                  Leave us a Review
                </div>
              </a>
            </div>
            <div className="z-40 flex flex-col flex-wrap items-center justify-center w-full space-y-2 2xl:flex-nowrap lg:flex-row lg:space-y-0 lg:space-x-2">
              {testemonials?.slice(3, 7).map((card, i) => (
                <TestemonialPageCard key={card.id} testemonial={card} />
              ))}
            </div>
          </div>
          <BlogContainer posts={posts} />
        </div>
      </div>
    </Base>
  );
}

// Fetch data at build time
export async function getServerSideProps({ params }) {
  const landing = await getLanding();
  const officeLocations = await getOfficeLocations();
  const carriers = await getCarrierInfo();
  const posts = await getRecentBlogPosts();
  const testemonials = await getTestemonials();

  return {
    props: {
      landing,
      officeLocations,
      carriers,
      testemonials,
      posts,
    },
  };
}
