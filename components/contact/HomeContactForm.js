import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { getPage } from "../../services";
import { useEffect } from "react";
import { useRef } from "react";

function HomeContactForm() {
  const [page, setPage] = useState(0);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedLineofBusiness, setSelectedLineofBusiness] = useState(null);
  const [numberOfEmployees, setNumberOfEmployees] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [contactData, setContactData] = useState(null);
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    const handler = async () => {
      const data = await getPage("contact");
      const form = data?.forms[0].fields;
      setContactData(form);
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
      newPage >= 0 && newPage <= contactData.length ? newPage : 0;
    setPage(finalPageValue);
  };

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full p-4">
        <div>header</div>
        <div className="flex w-full h-full">content {page}</div>
      </div>
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
              page == contactData.length ? `hidden` : ""
            }`}
            onClick={() => changePage("forward")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeContactForm;
