'use client';
import Profile from "@/src/components/User/Profile";
import Calendar from "@/src/components/User/Calendar";
// import Bookings from "@/src/components/User/Bookings";
import { useState } from "react";
import NotificationFull from "@/src/components/User/NotificationFull";
import EditProfile from "@/src/components/User/EditProfile";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("notification");
  const primaryColor = "border-pandit"; // Adjust this to your primary color
  const isPandit = true; // Example: Replace with dynamic role fetching

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white shadow-lg">
        <nav className="flex flex-col items-start ps-4 space-y-4 mt-20">
        <button
            onClick={() => setActiveTab("notification")}
            className={`w-full text-left ps-4 py-2 border-r-4 transition-all duration-300 ${
              activeTab === "notification"
                ? `${primaryColor} bg-orange-100 text-pandit`
                : "text-slate-400 border-transparent hover:border-pandit hover:bg-orange-100"
            }`}
          >
            All Notifications
          </button>
          <button
            onClick={() => setActiveTab("Editprofile")}
            className={`w-full text-left ps-4 py-2 border-r-4 transition-all duration-300 ${
              activeTab === "Editprofile"
                ? `${primaryColor} bg-orange-100 text-pandit`
                : "text-slate-400 border-transparent hover:border-pandit hover:bg-orange-100"
            }`}
          >
           Edit  Profile 
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`w-full text-left ps-4 py-2 border-r-4 transition-all duration-300 ${
              activeTab === "bookings"
                ? `${primaryColor} bg-orange-100 text-pandit`
                : "text-slate-400 border-transparent hover:border-pandit hover:bg-orange-100"
            }`}
          >
          Your Analytics
          </button>
       
          {isPandit && (
            <button
              onClick={() => setActiveTab("panditBookings")}
              className={`w-full text-left ps-4 py-2 border-r-4 transition-all duration-300 ${
                activeTab === "panditBookings"
                  ? `${primaryColor} bg-orange-100 text-pandit`
                  : "text-slate-400 border-transparent hover:border-pandit hover:bg-orange-100"
              }`}
            >
            See your Bookings
            </button>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {activeTab === "Editprofile" && <EditProfile />}
        {/* {activeTab === "bookings" &&<Bookings />} */}
        {activeTab === "notification" && <NotificationFull/>}
        {activeTab === "panditBookings" && isPandit && (
          <div>
            <h1 className="text-xl font-bold">Manage Pandit Bookings</h1>
            <p>Content for pandit bookings goes here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Sidebar;
