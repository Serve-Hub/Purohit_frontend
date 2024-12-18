import React, { createContext, useState } from "react";
import axios from "axios";

// Define the type for the context
type PoojaContextType = {
  token: string | null;
  getPooja: () => Promise<any>;
};

// Create the context with the appropriate type
export const PoojaContext = createContext<PoojaContextType | null>(null);

// Define the provider component
function PoojaProvider({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token_id");

  interface PoojaFilters {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    minDuration?: number;
    maxDuration?: number;
  }
  // Function to fetch puja data
  const getPooja = async (filters:PoojaFilters = {}) => {
    console.log("Fetching puja data from PoojaContext...");
    console.log("Token:", token);

    const {
        page = 1,
        limit = 4,
        category = "",
        minPrice = 0,
        maxPrice = Infinity,
        minDuration = 0,
        maxDuration = Infinity,
      } =filters

      console.log("filter in getPooja",maxPrice)
    try {
      const res = await axios.get(
        "https://purohit-backend.onrender.com/api/v1/admin/getPujas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            limit,
            category,
            minPrice,
            maxPrice,
            minDuration,
            maxDuration,
          },
        }
      );
      console.log("Puja data retrieved:", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching puja data:", error);
      return null; // Return null or an empty value if there's an error
    }
  };

  // Context value
  const contextValue = { token, getPooja };
console.log("context value is ",contextValue)
  return (
    <PoojaContext.Provider value={contextValue}>
      {children}
    </PoojaContext.Provider>
  );
}

export default PoojaProvider;
