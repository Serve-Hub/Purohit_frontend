import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import $axios from '@/src/lib/axios.instance';
import { toast } from "@/hooks/use-toast";



interface Review{
  rating?:number;
  reviewText?:string;
}

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

  const [hasReviewed, setHasReviewed] = useState<boolean | null>(null);
  const [hasReviewedData, setHasReviewedData] = useState<Review | null >({});
  const[submitLoading,setSubmitLoading]=useState(false);
  

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
    setSubmitLoading(true)
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
      toast({
        title:"Review added successfully",
        className:"bg-green-100 text-success"
      })
 
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title:"Failed to add review. Please try agai",
        className:"bg-red-100 text-danger"
      })

    }
    finally{
      setSubmitLoading(false);
    }
  };


  useEffect(() => {
    const checkReviewed = async () => {
      try {
        const response = await $axios.put(`/api/v1/review/checkReviewed/${bookingId}/${panditId}`)

        // if (!response.ok) {
        //   throw new Error(`Error: ${response.statusText}`);
        // }

       console.log("checkreviewd response",response)
        setHasReviewed(response.data.reviewed); 
        setHasReviewedData(response.data.data); 

        
      } catch (error) {
        console.error("Failed to check review status:", error);
      } 
    };

    checkReviewed();
  }, [panditId]);


  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Your Review</h2>
{hasReviewed ?(
  <>
  <div className="mb-6">
        <p className="font-semibold mb-2">Your Previous Rating</p>
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`w-8 h-8 ${star <= (hasReviewedData?.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
          {/* {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`w-8 h-8  ${star <= (hoverRating || userRating) ? 'text-black' : 'text-gray-300'}`}
              // onMouseEnter={() => handleRatingHover(star)}
              // onMouseLeave={() => handleRatingHover(0)}
              // onClick={() => handleRatingClick(star)}
            />
          ))} */}
        </div>
      </div>

      {/* Review Box */}
    
        <form
         className="mb-6">
          <label className="text-slate-400 mb-2">Review</label>
          <textarea
            // {...form.register('review')}
            className="p-2 w-full rounded border mb-4"
            rows={3}
            disabled
            value={hasReviewedData?.reviewText}
          />
          {/* {errors.review && <p className="text-red-500">{errors.review.message}</p>} */}

        </form>
     
  </>
):(
  <>
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

          <button type="submit" className="bg-black text-white py-2 px-3 rounded-lg flex items-center justify-center gap-2"
          disabled={submitLoading}
          >
            {submitLoading?(
              <>
              Please Wait 
<div className="w-4 h-4 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </>
            ):(<>
            Submit
              </>
            )}
          </button>
        </form>
      )}
  </>
)

}
      {/* Rating UI */}
      {/* <div className="mb-6">
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
      </div> */}

      {/* Review Box */}
      {/* {showReviewBox && ( */}
      {/* //   <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      //     <label className="text-slate-400 mb-2">Review</label>
      //     <textarea */}
      {/* //       {...form.register('review')}
      //       className="p-2 w-full rounded border mb-4"
      //       rows={3}
      //     />
      //     {errors.review && <p className="text-red-500">{errors.review.message}</p>}

      //     <button type="submit" className="bg-black text-white py-2 px-3 rounded-lg">
      //       Submit
      //     </button>
      //   </form> */}
      {/* // )} */}
    </div>
  );
}

export default AddReview;
