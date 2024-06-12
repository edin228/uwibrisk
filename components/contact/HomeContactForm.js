import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { getPage, getTeam } from "../../services";
import { useEffect } from "react";
import { useRef } from "react";
import Map from "./Map";
import Link from "next/link";
import Dropdown from "../form/Dropdown";
import CurrencyInput from "react-currency-input-field";

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

  const jesseObj = team?.filter((x) => x.name == "Jesse Nielsen")[0];
  const danaObj = team?.filter((x) => x.name == "Dana Coates")[0];
  const ericObj = team?.filter((x) => x.name == "Eric Schirding")[0];
  const joshObj = team?.filter((x) => x.name == "Josh Acosta")[0];
  const nickObj = team?.filter((x) => x.name == "Nick Latshaw")[0];

  const producers = [jesseObj, danaObj, ericObj, joshObj, nickObj];

  const validAgent = (agent) => {
    let valid = true;
    const employeeCount = parseInt(numberOfEmployees, 10);
    const projectedSales = parseInt(estimatedRevenue, 10);

    switch (agent.name) {
      case "Jesse Nielsen":
        if (
          projectedSales > 5000000 ||
          projectedSales < 1000000 ||
          selectedIndustry === "Mfg/Wholesale/Import/Export" ||
          selectedIndustry === "Real Estate Investment" ||
          selectedIndustry === "Entertainment" ||
          selectedIndustry === "Security" ||
          employeeCount > 100
        ) {
          valid = false;
        }
        break;
      case "Dana Coates":
        if (
          projectedSales < 50000000 ||
          projectedSales < 1000000 ||
          selectedIndustry === "Municipal Insurance" ||
          selectedIndustry === "Agriculture" ||
          selectedIndustry === "Transportation/Automotive" ||
          selectedIndustry === "Contracting Trades" ||
          selectedIndustry === "Entertainment" ||
          selectedIndustry === "Retail" ||
          (selectedIndustry === "Restaurant/Coffee Bar" &&
            projectedSales < 10000000) ||
          employeeCount < 60
        ) {
          valid = false;
        }
        break;
      case "Eric Schirding":
        if (
          projectedSales < 1000000 ||
          selectedIndustry === "Municipal Insurance" ||
          selectedIndustry === "Agriculture" ||
          selectedIndustry === "Transportation/Automotive" ||
          selectedIndustry === "Contracting Trades" ||
          selectedIndustry === "Entertainment" ||
          selectedIndustry === "Security" ||
          (selectedIndustry === "Restaurant/Coffee Bar" &&
            projectedSales <= 10000000 &&
            projectedSales >= 2000000) ||
          (employeeCount < 10 &&
            selectedIndustry === "Restaurant/Coffee Bar") ||
          employeeCount < 20
        ) {
          valid = false;
        }
        break;
      case "Josh Acosta":
        if (
          projectedSales >= 50000000 ||
          projectedSales < 1000000 ||
          projectedSales <= 5000000 ||
          projectedSales > 10000000 ||
          (selectedIndustry === "Restaurant/Coffee Bar" &&
            projectedSales <= 10000000 &&
            projectedSales >= 2000000) ||
          selectedIndustry === "Entertainment" ||
          (employeeCount < 10 && selectedIndustry === "Restaurant/Coffee Bar")
        ) {
          valid = false;
        }
        break;
      case "Nick Latshaw":
        if (
          (projectedSales < 10000000 && selectedIndustry !== "Entertainment") ||
          selectedIndustry === "Real Estate Investment" ||
          selectedIndustry === "Software & Technology" ||
          selectedIndustry === "Medical" ||
          selectedIndustry === "Law" ||
          selectedIndustry === "Other Professional Services" ||
          selectedIndustry === "Retail" ||
          selectedIndustry === "Transportation/Automotive" ||
          selectedIndustry === "Security" ||
          selectedIndustry === "Restaurant/Coffee Bar" ||
          (employeeCount < 40 && selectedIndustry !== "Entertainment")
        ) {
          valid = false;
        }
        break;
    }

    return valid ? true : false;
  };

  const validAgentOption = (agent) => {
    let valid = true;
    const employeeCount = parseInt(numberOfEmployees, 10);
    const projectedSales = parseInt(estimatedRevenue, 10);

    switch (agent.name) {
      case "Jesse Nielsen":
        if (
          projectedSales > 5000000 ||
          projectedSales < 1000000 ||
          selectedIndustry === "Mfg/Wholesale/Import/Export" ||
          selectedIndustry === "Real Estate Investment" ||
          selectedIndustry === "Entertainment" ||
          selectedIndustry === "Security" ||
          employeeCount > 100
        ) {
          valid = false;
        }
        break;
      case "Dana Coates":
        if (
          projectedSales < 50000000 ||
          projectedSales < 1000000 ||
          selectedIndustry === "Transportation/Automotive" ||
          selectedIndustry === "Contracting Trades" ||
          selectedIndustry === "Entertainment" ||
          selectedIndustry === "Retail" ||
          employeeCount < 60
        ) {
          valid = false;
        }
        break;
      case "Eric Schirding":
        if (
          projectedSales < 1000000 ||
          selectedIndustry === "Transportation/Automotive" ||
          selectedIndustry === "Contracting Trades" ||
          selectedIndustry === "Entertainment" ||
          selectedIndustry === "Security" ||
          employeeCount < 20
        ) {
          valid = false;
        }
        break;
      case "Josh Acosta":
        if (
          projectedSales >= 50000000 ||
          projectedSales < 1000000 ||
          projectedSales <= 5000000 ||
          projectedSales > 10000000 ||
          selectedIndustry === "Entertainment"
        ) {
          valid = false;
        }
        break;
      case "Nick Latshaw":
        if (
          (projectedSales < 10000000 && selectedIndustry !== "Entertainment") ||
          selectedIndustry === "Real Estate Investment" ||
          selectedIndustry === "Software & Technology" ||
          selectedIndustry === "Medical" ||
          selectedIndustry === "Law" ||
          selectedIndustry === "Other Professional Services" ||
          selectedIndustry === "Retail" ||
          selectedIndustry === "Transportation/Automotive" ||
          selectedIndustry === "Security" ||
          (employeeCount < 40 && selectedIndustry !== "Entertainment")
        ) {
          valid = false;
        }
        break;
    }

    return valid ? true : false;
  };

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
                : "bottom-[60px] left-[20px]"
            } absolute transition duration-200`}
          >
            <div
              className={`${
                selectedStates.length == 0 ? `` : `text-[#eab308]`
              } font-bold  text-xl uppercase tracking-tight`}
            >
              We can help
            </div>
            <div
              className={`${
                selectedStates.length == 0 ? `` : `text-[#eab308]`
              } font-bold  text-xl  uppercase`}
            >
              What state are you in
            </div>
          </div>
        )}

        {page == 0 && (
          <Map mapCallback={mapCallback} selectedStates={selectedStates} />
        )}
        {page == 1 && (
          <div className="flex flex-col justify-center w-full h-full text-white">
            <div className="flex items-center justify-center w-full my-8 text-2xl font-bold text-center">
              Do you need Personal or Business Insurance?
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
                      src={jesseObj.photo.url}
                      alt=""
                      initial={false}
                    />
                  </div>
                  <div className="flex w-[400px] px-4 text-center">
                    Jesse Nielsen is the perfect asset to help navigate your
                    private client needs.
                  </div>
                  <div className="flex justify-center mt-4">
                    <Link  href={jesseObj.meetingLink ? jesseObj.meetingLink : "#"}>
                      <button
                        className={`bg-[#eab308] text-shadow min-w-[250px] p-2 rounded-md  font-bold border-[2px] border-[#eab308]  transition duration-200 `}
                      >
                        Schedule a Consultation
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
          <div className="flex flex-col items-center w-full h-full gap-4 text-white">
            <div className="flex items-center justify-center w-full gap-4">
              <div
                className={`${
                  validAgent(jesseObj) ? "visible" : "opacity-30"
                }  relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4`}
              >
                <motion.img
                  className="object-cover w-full h-full"
                  src={jesseObj.photo.url}
                  alt=""
                  initial={false}
                />
              </div>
              <div
                className={`${
                  validAgent(danaObj) ? "visible" : "opacity-30"
                } relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4`}
              >
                <motion.img
                  className="object-cover w-full h-full"
                  src={danaObj.photo.url}
                  alt=""
                  initial={false}
                />
              </div>
              <div
                className={`${
                  validAgent(ericObj) ? "visible" : "opacity-30"
                } relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4`}
              >
                <motion.img
                  className="object-cover w-full h-full"
                  src={ericObj.photo.url}
                  alt=""
                  initial={false}
                />
              </div>
              <div
                className={`${
                  validAgent(joshObj) ? "visible" : "opacity-30"
                } relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4`}
              >
                <motion.img
                  className="object-cover w-full h-full"
                  src={joshObj.photo.url}
                  alt=""
                  initial={false}
                />
              </div>
              <div
                className={`${
                  validAgent(nickObj) ? "visible" : "opacity-30"
                } relative w-[75px] h-[75px] overflow-hidden rounded-lg shadow-lg my-4`}
              >
                <motion.img
                  className="object-cover w-full h-full"
                  src={nickObj.photo.url}
                  alt=""
                  initial={false}
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full mb-2 font-bold text-center 2xl:text-3xl 2xl:w-3/4">
              <div>Now, lets match you with the right advisor</div>
            </div>
            <div className="flex items-center justify-center w-full gap-2">
              <div className="font-semibold 2xl:text-3xl">
                Select your industry
              </div>
              <select
                id={0}
                className="w-3/12 p-2 overflow-y-auto rounded-lg bg-zinc-400/20"
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
              {/* <Dropdown
                options={industryOptions.formOptions}
                onSelect={setSelectedIndustry}
                selectedValue={selectedIndustry}
              /> */}
            </div>
            <div className="flex items-center justify-center w-full gap-2">
              <div className="font-semibold 2xl:text-3xl">
                How many people do you employ?
              </div>
              <input
                id={1}
                type="number"
                className="w-2/12 p-2 rounded-lg form-input bg-zinc-400/20"
                onChange={(e) => setNumberOfEmployees(e.target.value)}
                value={numberOfEmployees}
              />
            </div>
            <div className="flex items-center justify-center w-full gap-2">
              <div className="font-semibold 2xl:text-3xl">
                Projected sales for the next 12 months?
              </div>
              <CurrencyInput
                id="input-example"
                prefix="$"
                name="input-name"
                placeholder=""
                defaultValue={1000000}
                decimalsLimit={2}
                className="w-2/12 p-2 rounded-lg form-input bg-zinc-400/20"
                onValueChange={(value, name) => setEstimatedRevenue(value)}
              />
            </div>
          </div>
        )}
        {page == 3 && selectedLineofBusiness == "Business Insurance" && (
          <div className="flex w-full overflow-x-auto text-white">
            {producers
              .filter((x) => validAgent(x))
              .map((prod) => (
                <div
                  key={prod.id}
                  className="flex flex-col justify-center w-full h-full text-white"
                >
                  <div className="flex items-center justify-center w-full mb-2">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold">{prod.name}</div>
                      <div className="font-bold ">Account Executive</div>
                      <div className="relative w-[150px] h-[150px] overflow-hidden rounded-lg shadow-lg my-4">
                        <motion.img
                          className="object-cover w-full h-full"
                          src={prod.photo.url}
                          alt=""
                          initial={false}
                        />
                      </div>
                      <div className="flex w-[400px] px-4 text-center">
                        {prod.miniBio ? prod.miniBio : ""}
                      </div>
                      <div className="flex justify-center mt-4">
                        <Link href={prod.meetingLink ? prod.meetingLink : "#"}>
                          <button
                            className={`bg-[#eab308] text-shadow min-w-[250px] p-2 rounded-md  font-bold border-[2px] border-[#eab308]  transition duration-200 `}
                          >
                            Schedule a Consultation
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                (page == 2 && selectedLineofBusiness == "Personal Insurance") ||
                (page == 2 &&
                  selectedLineofBusiness == "Business Insurance" &&
                  !selectedIndustry &&
                  !numberOfEmployees &&
                  !estimatedRevenue) ||
                (page == 3 && selectedLineofBusiness == "Business Insurance")
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
