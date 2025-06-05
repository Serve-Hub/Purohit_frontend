'use client';
import React, { useEffect, useState } from "react";
import $axios from "@/src/lib/axios.instance";


// const DataStatsOne: React.FC<dataStats> = () => {
const DataStatsOne = () => {

  const [panditUsers, setPanditUsers] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [users, setUsers] = useState(0);

  const fetchPanditUsers = async () => {
    try {
      const response = await $axios.get("/api/v1/admin/getAllPanditUsers");
      console.log("pandit users is",response)
      setPanditUsers(response.data.data.panditCount);
      setUsers(response.data.data.UserCount)
    } catch (error) {
      console.error("Failed to fetch pandit users:", error);
    }
  };

  // Fetch top 5 pandits

  // Fetch top 5 pujas


  // Fetch total bookings
   // Fetch total bookings
    const fetchTotalBookings = async () => {
      try {
        const response = await $axios.get("/api/v1/admin/getTotalBookings");
        console.log("total response is",response)
        setTotalBookings(response.data.data.totalBookings); // Save the total bookings
      } catch (err) {
        console.error("Failed to fetch total bookings:", err);
      } finally {
      }
    };

    const dataStatsList = [
      // {
      //   icon: (
      //     <svg
      //       width="26"
      //       height="26"
      //       viewBox="0 0 26 26"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M10.5626 13.0002C10.5626 11.654 11.6539 10.5627 13.0001 10.5627C14.3463 10.5627 15.4376 11.654 15.4376 13.0002C15.4376 14.3464 14.3463 15.4377 13.0001 15.4377C11.6539 15.4377 10.5626 14.3464 10.5626 13.0002Z"
      //         fill="white"
      //       />
      //       <path
      //         fillRule="evenodd"
      //         clipRule="evenodd"
      //         d="M2.16675 13.0002C2.16675 14.7762 2.62713 15.3743 3.54788 16.5705C5.38638 18.959 8.4697 21.6668 13.0001 21.6668C17.5305 21.6668 20.6138 18.959 22.4523 16.5705C23.373 15.3743 23.8334 14.7762 23.8334 13.0002C23.8334 11.2242 23.373 10.6261 22.4523 9.42985C20.6138 7.04135 17.5305 4.3335 13.0001 4.3335C8.4697 4.3335 5.38638 7.04135 3.54788 9.42985C2.62713 10.6261 2.16675 11.2242 2.16675 13.0002ZM13.0001 8.93766C10.7564 8.93766 8.93758 10.7565 8.93758 13.0002C8.93758 15.2438 10.7564 17.0627 13.0001 17.0627C15.2437 17.0627 17.0626 15.2438 17.0626 13.0002C17.0626 10.7565 15.2437 8.93766 13.0001 8.93766Z"
      //         fill="white"
      //       />
      //     </svg>
      //   ),
      //   color: "#3FD97F",
      //   title: "Total Views",
      //   value: "3.456K",
      //   growthRate: 0.43,
      // },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
          <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
        </svg>
        
        ),
        color: "#FF9C55",
        title: "Total pandits",
        value: `${panditUsers}`,
        // growthRate: 4.35,
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
          <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
        </svg>
        
        ),
        color: "#8155FF",
        title: "Total Bookings",
        value: `${totalBookings}`,
        // growthRate: 2.59,
      },
      {
        icon: (
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="9.75106"
              cy="6.49984"
              rx="4.33333"
              ry="4.33333"
              fill="white"
            />
            <ellipse
              cx="9.75106"
              cy="18.4178"
              rx="7.58333"
              ry="4.33333"
              fill="white"
            />
            <path
              d="M22.7496 18.4173C22.7496 20.2123 20.5445 21.6673 17.8521 21.6673C18.6453 20.8003 19.1907 19.712 19.1907 18.4189C19.1907 17.1242 18.644 16.0349 17.8493 15.1674C20.5417 15.1674 22.7496 16.6224 22.7496 18.4173Z"
              fill="white"
            />
            <path
              d="M19.4996 6.50098C19.4996 8.2959 18.0446 9.75098 16.2496 9.75098C15.8582 9.75098 15.483 9.68179 15.1355 9.55498C15.648 8.65355 15.9407 7.61084 15.9407 6.49977C15.9407 5.38952 15.6484 4.34753 15.1366 3.44656C15.4838 3.32001 15.8587 3.25098 16.2496 3.25098C18.0446 3.25098 19.4996 4.70605 19.4996 6.50098Z"
              fill="white"
            />
          </svg>
        ),
        color: "#18BFFF",
        title: "Total Users",
        value: `${users}`
        // growthRate: -0.95,
      },
    ];

  useEffect(() => {
    fetchPanditUsers();
    // fetchTop5Pandits();
    // fetchTop5Pujas();
    fetchTotalBookings();
  }, []);


  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {dataStatsList.map((item, index) => (
          <div
            key={index}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-14.5 w-14.5 items-center justify-center rounded-full"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <h4 className="mb-1.5 text-heading-6 font-bold text-dark dark:text-white">
                  {item.value}
                </h4>
                <span className="text-body-sm font-medium">{item.title}</span>
              </div>

              {/* <span
                className={`flex items-center gap-1.5 text-body-sm font-medium ${
                  item.growthRate > 0 ? "text-green" : "text-red"
                }`}
              >
                {item.growthRate}%
                {item.growthRate > 0 ? (
                  <svg
                    className="fill-current"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.35716 2.3925L0.908974 5.745L5.0443e-07 4.86125L5 -5.1656e-07L10 4.86125L9.09103 5.745L5.64284 2.3925L5.64284 10L4.35716 10L4.35716 2.3925Z"
                      fill=""
                    />
                  </svg>
                ) : (
                  <svg
                    className="fill-current"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.64284 7.6075L9.09102 4.255L10 5.13875L5 10L-8.98488e-07 5.13875L0.908973 4.255L4.35716 7.6075L4.35716 7.6183e-07L5.64284 9.86625e-07L5.64284 7.6075Z"
                      fill=""
                    />
                  </svg>
                )}
              </span> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataStatsOne;
