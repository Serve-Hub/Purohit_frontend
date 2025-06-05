// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const MyCustomCalendar = () => {
//   const [value, setValue] = useState(new Date());

//   // Static date to highlight (e.g., 2025-01-20)
//   const staticDate = new Date("2025-01-20");

//   // Check if a date matches the static date
//   const isStaticDate = (date: Date) =>
//     date.toISOString().split("T")[0] === staticDate.toISOString().split("T")[0];

//   const handleDateChange = (date: Date) => {
//     setValue(date);
//     console.log("Selected date:", date);
//   };

//   return (
//     <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Custom Calendar</h2>
//       <Calendar
//         onChange={handleDateChange}
//         value={value}
//         defaultView="month" // Default to the month view
//         tileClassName={({ date }) =>
//           isStaticDate(date) ? "bg-blue-200 text-blue-800 font-bold rounded-full" : ""
//         } // Highlight static date
//         formatDay={(locale, date) =>
//           isStaticDate(date) ? `📅 ${date.getDate()}` : date.getDate()
//         } // Add an emoji to the static date
//         formatMonthYear={(locale, date) => `${date.toLocaleString(locale, { month: "long" })} ${date.getFullYear()}`}
//         formatShortWeekday={(locale, date) => date.toLocaleString(locale, { weekday: "short" })}
//       />
//     </div>
//   );
// };

// export default MyCustomCalendar;
