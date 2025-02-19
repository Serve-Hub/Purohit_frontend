import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import $axios from '@/src/lib/axios.instance';
// Define the Zod schema
const reviewSchema = z.object({
  review: z.string().optional(),
  rating: z.number().optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

function AddReview({ panditId, pujaId, bookingId }: { panditId: string, pujaId: string, bookingId: string }) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: '',
      rating: 0,
    },
  });

  const { handleSubmit, formState: { errors }, control } = form;

  const [showReviewBox, setShowReviewBox] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Handle rating hover and click
  const handleRatingHover = (rating: number) => {
    setHoverRating(rating);
  };

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    setShowReviewBox(true);
  };

  // Submit function to hit the API
  const onSubmit = async (data: ReviewFormValues) => {
    
    try {
      const reviewData = {
        panditId,
        pujaId,
        bookingId,
        rating: userRating,
        reviewText: data.review || '',
      };
      console.log("data is ",reviewData)

      // Call API with review data
      const response = await $axios.post('/api/v1/review/addReview', reviewData);
      console.log('Review added successfully:', response.data);
      alert('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review. Please try again.');
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Rating UI */}
      <div className="mb-6">
        <p className="font-semibold mb-2">Rate the pandit:</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`w-8 h-8 cursor-pointer ${star <= (hoverRating || userRating) ? 'text-black' : 'text-gray-300'}`}
              onMouseEnter={() => handleRatingHover(star)}
              onMouseLeave={() => handleRatingHover(0)}
              onClick={() => handleRatingClick(star)}
            />
          ))}
        </div>
      </div>

      {/* Review Box */}
      {showReviewBox && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
          <label className="text-slate-400 mb-2">Review</label>
          <textarea
            {...form.register('review')}
            className="p-2 w-full rounded border mb-4"
            rows={3}
          />
          {errors.review && <p className="text-red-500">{errors.review.message}</p>}

          <button type="submit" className="bg-black text-white py-2 px-3 rounded-lg">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default AddReview;
