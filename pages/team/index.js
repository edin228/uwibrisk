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
      <div className="flex w-full lg:w-3/4 mx-auto flex-col p-2 space-y-4 lg:space-y-0 lg:gap-4 lg:py-4">
        <div className="flex w-full justify-center items-center uppercase tracking-widest text-2xl font-bold lg:text-3xl">
          Meet Our Team
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full my-4">
            <div className="tracking-wide font-bold text-2xl py-2">
              Management
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex w-full flex-wrap space-y-2 md:space-y-0 md:gap-4">
            {data.teamMembers
              .filter((x) => x.employeeCategory == "Management")
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
          <div className="flex flex-col w-full my-4">
            <div className="tracking-wide font-bold text-2xl py-2">
              Sales Team
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex w-full flex-wrap space-y-2 md:space-y-0 md:gap-4">
            {data.teamMembers
              .filter((x) => x.employeeCategory == "Sales")
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
          <div className="flex flex-col w-full my-4">
            <div className="tracking-wide font-bold text-2xl py-2">
              Client Services
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex w-full flex-wrap space-y-2 md:space-y-0 md:gap-4">
            {data.teamMembers
              .filter((x) => x.employeeCategory == "Service")
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
          <div className="flex flex-col w-full my-4">
            <div className="tracking-wide font-bold text-2xl py-2">
              Operations
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex w-full flex-wrap space-y-2 md:space-y-0 md:gap-4">
            {data.teamMembers
              .filter((x) => x.employeeCategory == "Operations")
              .map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
          </div>
          <div className="flex flex-col w-full my-4">
            <div className="tracking-wide font-bold text-2xl py-2">
              Pets
            </div>
            <div className="w-1/4 h-[5px] gold-gradient rounded-lg" />
          </div>
          <div className="flex w-full flex-wrap space-y-2 md:space-y-0 md:gap-4">
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
