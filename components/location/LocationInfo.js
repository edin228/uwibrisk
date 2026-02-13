import React from "react";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineEnvironment,
} from "react-icons/ai";

function LocationInfo({ info }) {
  return (
    <div className="flex flex-col flex-1 shrink-0">
      <div className="flex uppercase font-bold tracking-widest">{info.state}</div>
      <div className="flex">
        <div className="flex items-center mr-4">
          <AiOutlineEnvironment />
        </div>
        <div className="flex flex-col">
          <div>{info.address}</div>
          <div className="flex">
            {`${info.city}, ${info.addressState} ${info.zipcode}`}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center mr-4">
          <AiOutlinePhone />
        </div>
        <div>{info.officeLocationPhone}</div>
      </div>
      <div className="flex">
        <div className="flex items-center mr-4">
          <AiOutlineMail />
        </div>
        <a href={`mailto:${info.officeLocationEmail}`}>Email Us</a>
      </div>
    </div>
  );
}

export default LocationInfo;
