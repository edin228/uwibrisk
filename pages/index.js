import Head from "next/head";
import ActionsContainer from "../components/home/actions/ActionsContainer";
import BlogContainer from "../components/blog/BlogContainer";
import CarriersContainer from "../components/home/carriers/CarriersContainer";
import HeroContainer from "../components/home/hero/HeroContainer";
import Landing from "../components/home/landing/Landing";
import TestemonialContainer from "../components/home/testemonials/TestemonialContainer";
import Base from "../components/layout/Base";
import {
  getCarrierCarousel,
  getCarriers,
  getHomeActionButtons,
  getLanding,
  getOfficeLocations,
  getRecentBlogPosts,
  getTestemonials,
} from "../services";
import HomeContainer from "../components/home/v2/HomeContainer";
import { useEffect } from "react";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import TestemonialPageCard from "../components/home/testemonials/TestemonialPageCard";

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
  landing = null,
  officeLocations = null,
  carriers = null,
  posts = null,
  testemonials = null,
  homeButtons = null,
}) {
  const [insuranceList, setInsuranceList] = useState([
    "Business Insurance",
    "Personal Insurance",
    "Health Insurance",
    "Employee Benefits",
  ]);
  const [selectedInsuranceText, setselectedInsuranceText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const maxLength = insuranceList.length - 1;
      const getInsuranceText = () =>
        selectedInsuranceText < maxLength
          ? Number(selectedInsuranceText) + 1
          : 0;
      setselectedInsuranceText(getInsuranceText());
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedInsuranceText, insuranceList]);

  return (
    <Base template={"home"}>
      <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full space-y-4 lg:space-y-0 lg:gap-4 lg:pt-0 lg:pb-4">
        <div className="relative overflow-hidden max-h-[600px]">
          <div className="flex flex-col absolute top-[20%] left-[15%] z-40 text-white font-bold text-2xl lg:text-5xl">
            <TypingText />
            <div className="pt-2">
              <div className="bg-yellow-500 w-3/5 h-[5px] rounded-lg"></div>
            </div>
            <div className="py-2 tracking-wide">Made Simple</div>
            <div className="flex items-center xl:mt-8 xl:py-4 space-x-2 max-w-[200px]">
              {/* <div className="relative flex flex-1">
                <Link href={`/get-quotes`}>
                  <a className="w-[150px] xl:w-[180px] transition duration-200 hover:bg-yellow-500 flex flex-1 items-center justify-center rounded-xl cursor-pointer shadow-md border-yellow-500 border-2 text-white p-2 xl:p-4 font-bold text-sm xl:text-lg">
                    Start Building Your Portfolio
                  </a>
                </Link>
              </div> */}
              <div className="relative flex flex-1">
                <Link href={`/contact`}>
                  <a className="w-[140px] max-w-[140px] transition duration-200 hover:bg-yellow-500 flex rounded-xl cursor-pointer shadow-md font-bold border-2 border-yellow-500 text-sm flex-col items-center py-2">
                    <span className="my-0 leading-3 text-xl">Contact An </span>
                    <span className="leading-8 text-3xl">Advisor</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-full w-full bg-zinc-900/70 z-30 absolute top-0"></div>
          <video
            className="flex justify-center w-full z-30"
            autoPlay
            muted
            loop
            playsinline
            poster
          >
            <source
              src="https://www.relationinsurance.com/wp-content/uploads/brand_window_video-1.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        {/* <HomeContainer
          landing={landing}
          officeLocations={officeLocations}
          carriers={carriers}
          posts={posts}
          testemonials={testemonials}
          homeButtons={homeButtons}
        /> */}
        <div className="flex flex-col w-full xl:w-3/4 xl:mx-auto h-full">
          {/* <HeroContainer locations={officeLocations} /> */}
          <CarriersContainer carriers={carriers} />
          <div className="py-4">
            <div className="flex w-full justify-center text-center items-center uppercase tracking-widest font-semibold mb-2">
              See what our clients think
            </div>
            <div className="z-40 flex flex-col flex-wrap 2xl:flex-nowrap lg:flex-row w-full items-center justify-center space-y-2 lg:space-y-0 lg:space-x-2">
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
  const carriers = await getCarrierCarousel();
  const posts = await getRecentBlogPosts();
  const testemonials = await getTestemonials();
  const homeButtons = await getHomeActionButtons();

  return {
    props: {
      landing,
      officeLocations,
      carriers,
      testemonials,
      posts,
      homeButtons,
    },
  };
}
