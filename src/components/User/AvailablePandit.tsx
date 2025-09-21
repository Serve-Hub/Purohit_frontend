"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import $axios from "@/src/lib/axios.instance";
import AvailablePanditCard from "./AvailablePanditCard";

interface AvailablePanditProps {
  bookingId: string;
}

interface Pandit {
  _id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  kypDetails: {
    temporaryAddress: {
      tolAddress: string;
      municipality: string;
    };
  };
}

function AvailablePandit({ bookingId }: { bookingId: string }) {
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [recommendedPandits, setRecommendedPandits] = useState<Pandit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    const fetchPandits = async () => {
      const token = localStorage.getItem("token_id");
      try {
        const response = await $axios.get(
          `/api/v1/booking/bookings/${bookingId}/accepted-pandits`
        );
        console.log("response is", response);
        setPandits(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch available pandits");
        setLoading(false);
      }
    };

    const fetchRecommendedPandits = async () => {
      try {
        const response = await $axios.post(
          "https://purohit-ai.onrender.com/recommend_pandits",
          { booking_id: bookingId }
        );
        console.log("Ai response is", response);
        setRecommendedPandits(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch recommended pandits");
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchRecommendedPandits();
      fetchPandits();
    }
  }, [bookingId, pandits]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-t-transparent border-orange-500 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading pandits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <svg
            className="w-12 h-12 text-red-500 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {actionError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-600 text-sm font-medium">{actionError}</p>
          </div>
        </div>
      )}

      {/* Available Pandits Section */}
      <div>
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Available Pandits
          </h3>
          {pandits.length > 0 && (
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
              {pandits.length} available
            </span>
          )}
        </div>

        {pandits.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h4 className="text-lg font-medium text-gray-700 mb-2">
              No Pandits Available
            </h4>
            <p className="text-gray-500 text-sm sm:text-base">
              No pandits are currently available for this booking.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {pandits?.map((pandit) => (
              <AvailablePanditCard
                pandit={pandit}
                bookingId={bookingId}
                key={pandit._id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recommended Pandits Section */}
      <div className="border-t border-gray-200 pt-6 sm:pt-8">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Recommended Pandits
          </h3>
          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
            AI Powered
          </span>
        </div>

        {recommendedPandits.length === 0 ? (
          <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <svg
              className="w-12 h-12 text-yellow-400 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <h4 className="text-lg font-medium text-gray-700 mb-2">
              No Recommendations Available
            </h4>
            <p className="text-gray-500 text-sm sm:text-base">
              Our AI couldn't find specific recommendations at this moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {recommendedPandits?.map((pandit) => (
              <AvailablePanditCard
                pandit={pandit}
                bookingId={bookingId}
                key={`rec-${pandit._id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailablePandit;
