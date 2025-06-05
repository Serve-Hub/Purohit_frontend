'use client';
import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaReply } from 'react-icons/fa';
import $axios from '../lib/axios.instance';


interface PanditProps{
  panditId:string;
panditDetails:any
}

const ReviewSection = ({ panditId,panditDetails }:PanditProps) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    totalReviews: 0,
    currentPage: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
const [averageRating,setAverageRating]=useState(panditDetails?.averageRating)
  // Fetch reviews from the API with pagination
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await $axios.put(`/api/v1/review/getPanditReviews/${panditId}`, {
            params: {
              page: pagination.currentPage,
              limit: 10,
            },
                })
                console.log("review is ",response)        
        
        setReviews(response.data.data.reviews);
        setPagination(response.data.data.pagination);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [panditId, pagination]);

  // const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // const handleLike = (id: number) => {
  //   setReviews(reviews.map(review =>
  //     review.id === id ? { ...review, likes: review.likes + 1 } : review
  //   ));
  // };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Customer Reviews</h2>

      <div className="flex items-center mb-6">
        <div className="mr-4">
        {averageRating ? (
  <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
) : (
  <p className="text-3xl font-bold">No ratings yet</p>
)}          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`w-6 h-6 ${star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          
          <p className="text-sm text-gray-500">
            {/* {reviews.length} */}
            {panditDetails?.totalReviews}
            </p>
           
        </div>
        <div className="flex-grow">
  {[5, 4, 3, 2, 1].map((rating) => {
    // Calculate the number of reviews with the current rating
    const numReviewsForRating = reviews.filter((review) => review.rating === rating).length;
    // console.log("reviews for",rating,numReviewsForRating);
    // Calculate the percentage of reviews with this rating
    const widthPercentage = reviews.length === 0 ? 0 : (numReviewsForRating / reviews.length) * 100;
console.log("width",rating,widthPercentage)
    return (
      <div key={rating} className="flex items-center">
        <span className="w-4 text-sm">{rating}</span>
        <div className="w-full bg-gray-200 rounded-full h-2 ml-2">
          <div
            className=" h-2 rounded-full z-999  bg-yellow-400"
            style={{ width:`${widthPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  })}
</div>


      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2  gap-24">
              <div className="flex gap-3">

              <img
                src={review.user?.avatar}
                alt={`${review.user.firstName}'s avatar`}
                className="w-10 h-10 rounded-full mr-3 border-2 border-gray-300"
              />
              <div>
                <p className="font-semibold">{review.user.firstName} {review.user.lastName} </p>
                <div className="flex justify-center items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>

              </div>
              </div>
            <p className="text-gray-700 mb-2">{review.reviewText}</p>
            </div>
            {/* <div className="flex items-center text-sm text-gray-500">
              <button
                onClick={() => handleLike(review.id)}
                className="flex items-center mr-4 hover:text-blue-500"
              >
                <FaThumbsUp className="mr-1" /> {review.likes}
              </button>
              <button className="flex items-center hover:text-blue-500">
                <FaReply className="mr-1" /> Reply
              </button>
            </div> */}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={!pagination.hasPrevPage}
          className="text-gray-500 hover:text-blue-500 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={!pagination.hasNextPage}
          className="text-gray-500 hover:text-blue-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
