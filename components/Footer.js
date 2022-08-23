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
      <div className="uppercase text-3xl tracking-widest font-bold p-4">
        Contact Us
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4 p-4">
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
        <div className="flex flex-col lg:flex-row gap-2">
          <div>Terms and Conditions</div>
          <div>Privacy</div>
          <div>State Licenses</div>
          <div>Compensation Disclosure</div>
        </div>
      </div>
    </div>
  )
}

export default Footer