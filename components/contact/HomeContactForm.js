import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { getPage, getTeam } from "../../services";
import { useEffect } from "react";
import { useRef } from "react";
import Map from "./Map";
import Link from "next/link";

function HomeContactForm() {
  const [page, setPage] = useState(0);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedLineofBusiness, setSelectedLineofBusiness] = useState(null);
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [estimatedRevenue, setEstimatedRevenue] = useState("");
  const [contactData, setContactData] = useState(null);
  const [team, setTeam] = useState(null);

  const [plAssets, setPlAssets] = useState(null);

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const handler = async () => {
      const data = await getPage("contact");
      const tm = await getTeam();
      const form = data?.forms[0].fields;
      setContactData(form);
      setTeam(tm?.teamMembers);
    };
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    handler();
    return () => {};
  }, []);

  const changePage = (direction) => {
    const value = direction == "forward" ? 1 : -1;
    const newPage = page + value;
    const finalPageValue =
      newPage >= 0 && newPage <= contactData?.length ? newPage : 0;
    setPage(finalPageValue);
  };

  const mapCallback = (e) => {
    const isPresent = selectedStates.includes(e);
    let newStates;
    if (isPresent) {
      newStates = selectedStates.filter((state) => state !== e);
    } else {
      newStates = [...selectedStates, e];
    }
    setSelectedStates(newStates);
  };

  const changeLine = (lin) => {
    setSelectedLineofBusiness(lin);
    changePage("forward");
  };

  const plQ1 = (e) => {
    setPlAssets(e);
    changePage("forward");
  };

  const industryOptions = contactData?.find((x) => x.name == "Industry");

  const jesseObj = team?.filter((x) => x.name == "Jesse Nielsen");

  return (
    <div
      className={`relative flex flex-col w-full h-[470px] transition duration-200 ease-out ${
        page > 0 || selectedStates.length > 0
          ? `rounded-md shadow-lg bg-zinc-800/70 backdrop-blur-sm`
          : `bg-transparent`
      }`}
    >
      <div className="relative flex flex-col w-full h-full p-4 ">
        {page == 0 && (
          <div
            className={`${
              selectedStates.length == 0
                ? " 2xl:top-[-25px] 2xl:right-[25px]  2xl:text-right"
                : "bottom-[20px] left-[20px]"
            } absolute transition duration-200`}
          >
            <div
              className={`font-bold  text-xl text-[#eab308] uppercase tracking-tight text-shadow`}
            >
              Let us help you
            </div>
            <div className={`font-bold  text-lg text-white text-shadow`}>
              Tell us where you&apos;re located
            </div>
          </div>
        )}

        {page == 0 && (
          <Map mapCallback={mapCallback} selectedStates={selectedStates} />
        )}
        {page == 1 && (
          <div className="flex flex-col justify-center w-full h-full text-white">
            <div className="flex items-center justify-center w-full my-8 text-2xl font-bold text-center">
              Are you looking for Personal Insurance or Business Insurance?
            </div>
            <div className="flex items-center justify-center w-full gap-4">
              <button
                className={`min-w-[150px] p-2 rounded-md  font-bold border-[2px] border-[#eab308]  transition duration-200  ${
                  selectedLineofBusiness == `Personal Insurance`
                    ? "bg-[#eab308] text-shadow"
                    : "hover:bg-[#eab308] bg-transparent"
                }`}
                onClick={() => changeLine(`Personal Insurance`)}
              >
                Personal Insurance
              </button>
              <button
                className={`min-w-[150px] p-2 rounded-md  font-bold border-[2px] border-[#eab308]  transition duration-200  ${
                  selectedLineofBusiness == `Business Insurance`
                    ? "bg-[#eab308] text-shadow"
                    : "hover:bg-[#eab308] bg-transparent"
                }`}
                onClick={() => changeLine(`Business Insurance`)}
              >
                Business Insurance
              </button>
            </div>
          </div>
        )}
        {page == 2 && selectedLineofBusiness == "Personal Insurance" && (
          <div className="flex flex-col justify-center w-full h-full text-white">
            <div className="flex items-center justify-center w-full my-8 text-2xl font-bold text-center">
              Do your liquid assets exceed $3,000,000?
            </div>
            <div className="flex items-center justify-center w-full gap-4">
              <button
                className={`min-w-[150px] p-2 rounded-md  font-bold border-[2px] border-[#eab308]  transition duration-200  ${
                  plAssets == `Yes`
                    ? "bg-[#eab308] text-shadow"
                    : "hover:bg-[#eab308] bg-transparent"
                }`}
                onClick={() => plQ1(`Yes`)}
              >
                Yes
              </button>
              <button
                className={`min-w-[150px] p-2 rounded-md  font-bold border-[2px] border-[#eab308]  transition duration-200  ${
                  plAssets == `No`
                    ? "bg-[#eab308] text-shadow"
                    : "hover:bg-[#eab308] bg-transparent"
                }`}
                onClick={() => plQ1(`No`)}
              >
                No
              </button>
            </div>
          </div>
        )}
        {page == 3 &&
          selectedLineofBusiness == "Personal Insurance" &&
          plAssets == "Yes" && (
            <div className="flex flex-col justify-center w-full h-full text-white">
              <div className="flex items-center justify-center w-full mb-2">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold">Jesse Nielsen</div>
                  <div className="font-bold ">Account Executive</div>
                  <div className="relative w-[150px] h-[150px] overflow-hidden rounded-lg shadow-lg my-4">
                    <motion.img
                      className="object-cover w-full h-full"
                      src={jesseObj[0].photo.url}
                      alt=""
                      initial={false}
                    />
                  </div>
                  <div className="flex w-[400px] px-4 text-center">
                    With years of experience in insurance, Jesse Nielsen is the
                    perfect asset to help you navigate what insurance you need
                    for your Home and Auto.
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link href={`#`}>
                      <button
                        className={`bg-[#eab308] text-shadow min-w-[250px] p-2 rounded-md  font-bold border-[2px] border-[#eab308]  transition duration-200 `}
                      >
                        Schedule a Meeting
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        {page == 3 &&
          selectedLineofBusiness == "Personal Insurance" &&
          plAssets == "No" && (
            <div className="flex flex-col justify-center w-full h-full text-white">
              <div className="flex items-center justify-center w-full my-8 text-2xl font-bold text-center">
                Follow the link below to receive a quote for your Home and Auto
                Insurance
              </div>
              <div className="flex items-center justify-center w-full">
                <Link href={`/personal-quote`}>
                  <button
                    className={`bg-[#eab308] text-shadow min-w-[150px] p-2 rounded-md  font-bold border-[2px] border-[#eab308]  transition duration-200 `}
                  >
                    Get Quote Now
                  </button>
                </Link>
              </div>
            </div>
          )}
        {page == 2 && selectedLineofBusiness == "Business Insurance" && (
          <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-white">
            <div className="flex items-center justify-center w-full gap-4">
              <div className="relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4">
                <motion.img
                  className="object-cover w-full h-full"
                  src={jesseObj[0].photo.url}
                  alt=""
                  initial={false}
                />
              </div>
              <div className="relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4">
                <motion.img
                  className="object-cover w-full h-full"
                  src={jesseObj[0].photo.url}
                  alt=""
                  initial={false}
                />
              </div>
              <div className="relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4">
                <motion.img
                  className="object-cover w-full h-full"
                  src={jesseObj[0].photo.url}
                  alt=""
                  initial={false}
                />
              </div>
              <div className="relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4">
                <motion.img
                  className="object-cover w-full h-full"
                  src={jesseObj[0].photo.url}
                  alt=""
                  initial={false}
                />
              </div>
              <div className="relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4">
                <motion.img
                  className="object-cover w-full h-full"
                  src={jesseObj[0].photo.url}
                  alt=""
                  initial={false}
                />
              </div>
            </div>
            <div className="w-full mb-2 font-bold text-center 2xl:w-1/2">
              Please answer a few questions so we can determine which of our
              Account Executives are best fit for your needs
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="font-semibold">
                What industry is your business in?
              </div>
              <select
                id={0}
                type=""
                className="w-1/2 p-2 rounded-lg form-input bg-zinc-400/20"
                onChange={(e) => setSelectedIndustry(e.target.value)}
                value={selectedIndustry}
              >
                {industryOptions.formOptions.map(
                  ({ option, ...opt }, index) => (
                    <option
                      className="text-white bg-zinc-700"
                      key={index}
                      {...opt}
                    >
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="font-semibold">
                How many people does your business employ?
              </div>
              <input
                id={1}
                type="number"
                className="w-1/2 p-2 rounded-lg form-input bg-zinc-400/20"
                onChange={(e) => setNumberOfEmployees(e.target.value)}
                value={numberOfEmployees}
              />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <div className="font-semibold">
                What is your business&apos;s estimated annual revenue?
              </div>
              <input
                id={2}
                type="number"
                className="w-1/2 p-2 rounded-lg form-input bg-zinc-400/20"
                onChange={(e) => setEstimatedRevenue(e.target.value)}
                value={estimatedRevenue}
              />
            </div>
          </div>
        )}
      </div>
      {selectedStates.length > 0 && (
        <div className="absolute bottom-0 flex items-center justify-between w-full p-4">
          <button
            className={`p-2 w-[100px] text-white shadow-lg rounded-lg blue-button-gradient ${
              page == 0 ? `hidden` : ""
            }`}
            onClick={() => changePage("back")}
          >
            Back
          </button>
          <div className="flex justify-end w-full">
            <button
              className={`p-2 w-[100px] text-white shadow-lg rounded-lg blue-button-gradient ${
                page == contactData?.length ||
                (page == 3 && selectedLineofBusiness == "Personal Insurance") ||
                page == 1 ||
                (page == 2 && selectedLineofBusiness == "Personal Insurance")
                  ? `hidden`
                  : ""
              }`}
              onClick={() => changePage("forward")}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeContactForm;
