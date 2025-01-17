import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";

// Define the schema using Zod
const bookingSchema = z.object({
  date: z.date().nullable().refine((val) => val !== null, "Date is required"),
  time: z.string().nonempty("Time is required"),
  province: z.string().nonempty("Province is required"),
  district: z.string().nonempty("District is required"),
  municipality: z.string().nonempty("Municipality is required"),
  tollAddress: z.string().nonempty("Toll address is required"),
});

const BookingForm = () => {
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

  const [socket, setSocket] = useState(null);

  // Establish WebSocket connection
  useEffect(() => {
    const ws = new WebSocket("ws://your-websocket-url");
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      date: null,
      time: "",
      province: "",
      district: "",
      municipality: "",
      tollAddress: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      alert("Booking request sent!");
    } else {
      alert("WebSocket connection is not open.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-pandit">Booking Form</h2>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="shadow border p-5 mb-5 bg-white rounded-lg">
            {/* Date Picker */}
            <FormField
              control={control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pick a date</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-pandit text-white"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage>{errors.date?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* Time Picker */}
            <FormField
              control={control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <input
                      type="time"
                      {...field}
                      className="border border-gray-300 rounded px-3 py-2"
                    />
                  </FormControl>
                  <FormMessage>{errors.time?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="shadow border bg-white p-5 rounded-lg">
            {/* Province Dropdown */}
            <FormField
              control={control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        form.setValue("district", "");
                        form.setValue("municipality", "");
                      }}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">Select Province</option>
                      {Object.keys(provinces).map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage>{errors.province?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* District Dropdown */}
            <FormField
              control={control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        form.setValue("municipality", "");
                      }}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      disabled={!form.getValues("province")}
                    >
                      <option value="">Select District</option>
                      {provinces[form.getValues("province")]?.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage>{errors.district?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* Municipality Dropdown */}
            <FormField
              control={control}
              name="municipality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipality</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      disabled={!form.getValues("district")}
                    >
                      <option value="">Select Municipality</option>
                      {municipalities[form.getValues("district")]?.map(
                        (mun) => (
                          <option key={mun} value={mun}>
                            {mun}
                          </option>
                        )
                      )}
                    </select>
                  </FormControl>
                  <FormMessage>{errors.municipality?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* Toll Address */}
            <FormField
              control={control}
              name="tollAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Toll Address</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      placeholder="Enter toll address"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </FormControl>
                  <FormMessage>{errors.tollAddress?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="p-4">
            <Button type="submit" className="w-full bg-[#F25B2C] text-white">
              Book Now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
