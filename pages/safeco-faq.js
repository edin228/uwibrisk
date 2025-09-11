/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Base from "../components/layout/Base";
import { motion } from "framer-motion";
import { getIcon } from "../utils/utils";
import Accordian from "../components/ui/Accordian";
import Image from "next/image";

function SafecoFAQ() {
  return (
    <Base title={"Safeco FAQ"} template={"SingleColumn"}>
      <div className="flex flex-col w-full items-center justify-center p-2">
        <div className="flex flex-col w-full md:w-1/2 bg-red h-full p-8 bg-white rounded-lg shadow-md">
          <div className="w-[300px] h-[200px] ml-[-40px]">
            <Image
              src="https://cdn.brinq.io/UWIBR/safeco4157.jpg"
              alt="safecologo"
              objectFit="contain"
              height={200}
              width={300}
            />
          </div>
          <div className="px-4 text-[2.2rem] font-bold">Safeco FAQ</div>
          <div className="p-4 text-md md:text-[1.2rem]">
            We know you may have questions about Safeco’s recent decision, so
            we’ve put together this quick FAQ to give you clarity and peace of
            mind. If you don’t see your question here, please reach out - our
            team is ready to help.
          </div>
          <Accordian
            question={`Why is Safeco not renewing my policies?`}
            answer={`Safeco has made a business decision to reduce the number of policies they write and renew. This decision is not based on your account history or claims - it is simply their internal strategy.`}
          />
          <Accordian
            question={`When will my coverage end?`}
            answer={`Your current Safeco coverage remains in place until your policy expiration date. We will present you with new options at least 30 days before that date to ensure a smooth transition.`}
          />
          <Accordian
            question={`Do I need to do anything right now?`}
            answer={`No action is needed at this time. Our team is already preparing alternatives and will reach out with recommendations tailored to your needs.`}
          />
          <Accordian
            question={`Will my new coverage cost more?`}
            answer={`Premiums across California have been rising, but our priority is to keep your coverage strong and competitive. We will shop several trusted A rated companies and present you with all of your options so that you can make an informed decision.`}
          />
          <Accordian
            question={`Which carriers will you work with for me?`}
            answer={`We partner with respected A rated companies such as Mercury, Travelers, and Hartford, along with many other trusted carriers. Our recommendations will be based on what best fits your situation.`}
          />
          <Accordian
            question={`What should I do if I have changes coming up (new driver, vehicle, address, business change)?`}
            answer={`Please tell us as soon as possible. These details help us secure the best coverage and pricing for your new policy.`}
          />
        </div>
      </div>
    </Base>
  );
}

export default SafecoFAQ;
