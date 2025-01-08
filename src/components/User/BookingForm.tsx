import React, { useState } from 'react';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

function BookingForm() {
  const provinces = {
    Province1: ["District1", "District2", "District3"],
    Province2: ["District4", "District5", "District6"],
    Province3: ["District7", "District8", "District9"],
  };

  const municipalities = {
    District1: ["Municipality1", "Municipality2"],
    District2: ["Municipality3", "Municipality4"],
    District3: ["Municipality5", "Municipality6"],
    District4: ["Municipality7", "Municipality8"],
    District5: ["Municipality9", "Municipality10"],
    District6: ["Municipality11", "Municipality12"],
    District7: ["Municipality13", "Municipality14"],
    District8: ["Municipality15", "Municipality16"],
    District9: ["Municipality17", "Municipality18"],
  };

  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [amPm, setAmPm] = useState('AM');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [tollAddress, setTollAddress] = useState('');

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setDistrict(''); // Reset district and municipality
    setMunicipality('');
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setMunicipality(''); // Reset municipality
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-pandit">Booking Form</h2>
      <div className="shadow border p-5 mb-5 bg-white rounded-lg">

      {/* Date Picker */}
      <div className="mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-pandit text-white" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="mb-4 flex items-center w-full">
        <label htmlFor="time" className="mr-2 ">Time</label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
       
      </div>
      </div>
      <div className="shadow border bg-white p-5 rounded-lg">

     
      {/* Dropdown for Province, Municipality, and District */}
      <div className="mb-4">
        <label htmlFor="province" className="block mb-1">Province</label>
        <select
          id="province"
          value={province}
          onChange={handleProvinceChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Province</option>
          {Object.keys(provinces).map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="district" className="block mb-1">District</label>
        <select
          id="district"
          value={district}
          onChange={handleDistrictChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={!province}
        >
          <option value="">Select District</option>
          {province &&
            provinces[province]?.map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="municipality" className="block mb-1">Municipality</label>
        <select
          id="municipality"
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          disabled={!district}
        >
          <option value="">Select Municipality</option>
          {district &&
            municipalities[district]?.map((mun) => (
              <option key={mun} value={mun}>
                {mun}
              </option>
            ))}
        </select>
      </div>

      {/* Toll Address */}
      <div className="mb-4">
        <label htmlFor="tollAddress" className="block mb-1">Toll Address</label>
        <input
          id="tollAddress"
          type="text"
          value={tollAddress}
          onChange={(e) => setTollAddress(e.target.value)}
          placeholder="Enter toll address"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      </div>

      {/* Submit Button */}
      <div className="p-4">
                <button
                  onClick={() => router.push(`/user/viewPuja/${puja._id}`)}
                  className="w-full px-4 py-2 bg-[#F25B2C] bg-opacity-70 text-white rounded-md hover:bg-pandit"
                >
                  Book Now
                </button>
              </div>
    </div>
  );
}

export default BookingForm;
