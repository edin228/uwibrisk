import Head from "next/head";
import React from "react";
import Base from "../../components/layout/Base";
import PetCard from "../../components/team/PetCard";
import TeamCard from "../../components/team/TeamCard";
import { getTeam } from "../../services";

function Team({ data }) {
  return (
    <Base template={"Team"}>
      <Head>
        <title>UWIBRisk Team</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-full p-2 mx-auto space-y-4 lg:w-3/4 lg:space-y-0 lg:gap-4 lg:py-4">
        <div className="flex items-center justify-center w-full text-2xl font-bold tracking-widest uppercase lg:text-3xl">
          Meet Our Team
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full my-4">
            <div className="py-2 text-2xl font-bold tracking-wide">
              Management
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex flex-wrap w-full space-y-2 md:space-y-0 md:gap-4">
            {data.teamMembers
              .filter((x) => x.employeeCategory == "Management")
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
          <div className="flex flex-col w-full my-4">
            <div className="py-2 text-2xl font-bold tracking-wide">
              Accounting and Operations Management
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex flex-wrap w-full space-y-2 md:space-y-0 md:gap-4">
            {data.teamMembers
              .filter((x) => x.employeeCategory == "AccountingOperationsManagement")
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
          <div className="flex flex-col w-full my-4">
            <div className="py-2 text-2xl font-bold tracking-wide">
              Sales Team
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex flex-wrap w-full space-y-2 md:space-y-0 md:gap-4">
            {data.teamMembers
              .filter((x) => x.employeeCategory == "Sales")
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
          <div className="flex flex-col w-full my-4">
            <div className="py-2 text-2xl font-bold tracking-wide">
              Client Services
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex flex-wrap w-full space-y-2 md:space-y-0 md:gap-4">
            {data.teamMembers
              .filter((x) => x.employeeCategory == "Service")
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
          <div className="flex flex-col w-full my-4">
            <div className="py-2 text-2xl font-bold tracking-wide">
              Operations
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex flex-wrap w-full space-y-2 md:space-y-0 md:gap-4">
            {data.teamMembers
              .filter((x) => x.employeeCategory == "Operations")
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
          <div className="flex flex-col w-full my-4">
            <div className="py-2 text-2xl font-bold tracking-wide">Pets</div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex flex-wrap w-full space-y-2 md:space-y-0 md:gap-4">
            {data.pets.map((member) => (
              <PetCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Team;

// Fetch data at build time
export async function getServerSideProps({ params }) {
  const data = await getTeam();

  return {
    props: { data },
  };
}
