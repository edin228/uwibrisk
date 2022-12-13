import React, { useEffect, useState } from 'react'
import { getOfficeLocations } from '../services'
import LocationInfo from './location/LocationInfo'

function Footer() {
  const [locations, setLocations] = useState(null)
  
  useEffect(() => {
    let isCancelled = false
    const handleChange = async () => {
      if (!isCancelled) {
        fetchData()
      }
    }
    handleChange()
    return () => {
      isCancelled = true
    }
  }, [])

  const fetchData = async () => {
    const res = await getOfficeLocations();
    setLocations(res)
  }

  return (
    <div className="flex flex-col w-full h-full rounded-t-md bg-slate-100 min-h-[20vh]">
      <div className="p-4 text-3xl font-bold tracking-widest uppercase">
        Contact Us
      </div>
      <div className="flex flex-col w-full gap-4 p-4 lg:flex-row">
        {
          locations?.map( location => (
            <LocationInfo key={location.id} info={location} /> 
          ))
        }
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center px-4 lg:justify-between bg-slate-200 w-full min-h-[40px]">
        <div className="font-bold">
          © 2022 uwib. All rights reserved.
        </div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <a className="text-xs uppercase" href={"/terms-of-use"}>Terms and Conditions</a>
          <a className="text-xs uppercase" href={"/privacy-policy"}>Privacy</a>
          <a className="text-xs uppercase" href={"/licenses"}>State Licenses</a>
          <a className="text-xs uppercase" href={"/compensation-disclosure"}>Compensation Disclosure</a>
        </div>
      </div>
    </div>
  )
}

export default Footer