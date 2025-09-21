"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/src/components/ui/animated-modal";
import PanditProfile from "./PanditProfile";
import { useEffect, useState } from "react";
import $axios from "@/src/lib/axios.instance";
import { toast } from "@/hooks/use-toast";

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

interface AvailablePanditCardProps {
  pandit: Pandit;
  bookingId: string;
}

function AvailablePanditCard({ pandit, bookingId }: AvailablePanditCardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = async (panditId: string, bookingId: string) => {
    setIsLoading(true);

    console.log("Pandit ID and Booking ID:", panditId, bookingId);

    if (!bookingId || !panditId) {
      setActionError("Missing booking or pandit ID.");
      setIsLoading(false);
      return;
    }

    const formData = {
      bookingId: bookingId,
      panditId: panditId,
    };

    setActionError("");
    const token = localStorage.getItem("token_id");

    try {
      const response = await $axios.post(
        "/api/v1/booking/bookings/accepted-pandits/choosePandit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response is", response);

      toast({
        title: "You have successfully accepted a pandit",
        className: "bg-green-100 text-success",
      });
      setReload((prev) => !prev);
    } catch (err) {
      console.log("Error occurred:", err);

      const errorMessage =
        (err as any)?.response?.data?.message || "Something went wrong";
      toast({
        title: errorMessage,
        className: "bg-red-100 text-danger",
      });
      setReload((prev) => !prev);
    } finally {
      setIsLoading(false);
    }
  };

  // Star Rating Component
  const StarRating = ({ rating = 4.5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            );
          } else {
            return (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            );
          }
        })}
        <span className="text-xs sm:text-sm text-gray-600 ml-1">
          ({rating})
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
        {/* Profile Section */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative flex-shrink-0">
            <img
              src={pandit?.avatar || "/img/default-avatar.png"}
              alt={`${pandit?.firstName} ${pandit?.lastName}`}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          <div className="flex-1 min-w-0">
            {/* Name and Rating */}
            <div className="space-y-1 sm:space-y-2">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
                {pandit?.firstName} {pandit?.lastName}
              </h3>
              <StarRating />
            </div>

            {/* Email */}
            <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">
              {pandit.email}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm text-gray-700 font-medium">
              Location:
            </p>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              {pandit?.kypDetails?.temporaryAddress?.tolAddress},{" "}
              {pandit?.kypDetails?.temporaryAddress?.municipality}
            </p>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="border-t border-gray-100 p-4 sm:p-5 bg-gray-50 space-y-3">
        {/* View Profile Button */}
        <Modal>
          <ModalTrigger className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View Profile
          </ModalTrigger>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <ModalBody>
              <ModalContent>
                <PanditProfile pandit={pandit} />
              </ModalContent>
            </ModalBody>
          </div>
        </Modal>

        {/* Accept Button */}
        <button
          onClick={() => handleAccept(pandit._id, bookingId)}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              <span className="text-sm sm:text-base">Accepting...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm sm:text-base">Accept Pandit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default AvailablePanditCard;
