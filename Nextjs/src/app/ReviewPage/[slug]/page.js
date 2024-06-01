"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ReviewPage = ({ params }) => {
  const id = params.slug;
  const [review, setReview] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const q = query(collection(db, "reviews"), where("__name__", "==", String(id)));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setReview(docData);
        } else {
          console.log("No review found with ID:", id);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };

    fetchReview();
  }, [id]);

  return (
    <div className="review-page text-white flex flex-col items-center">
      <h2 className="text-3xl m-6 font-bold text-center">Review Details</h2>
      {review ? (
        <div className="review-details grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="m-3">
          {review.images && review.images.length > 0 && (
            <img
            className="w-full h-full rounded-xl object-cover"
            src={review.images[0]}
            alt={review.productName}
            />
          )}
          </div>
          <div className="flex flex-col items-start justify-start m-3 space-y-3">
            <p className="subfont-semibold text-[25px] md:text-[40px] md:text-left">{review.productname}</p>
            <p className="subfont-bold md:text-[20px]">{review.brand}</p>
            <p className="subfont md:text-[20px]">{review.category}</p>
            <p className="subfont-light border border-white p-2 text-[20px] md:text-[25px]">{review.productReview}</p>
            <p className="subfont md:text-[20px]"><span>Purchase Date:</span> {review.purchaseDate}</p>
            <p className="subfont md:text-[20px]"><span>Purchase Price:</span> ₹ {review.purchasePrice}</p>
            <p className="font-light text-[12px] md:text-[14px]">uploaded by {review.userEmail}</p>
          </div>
        </div>
      ) : (
        <p>Loading review...</p>
      )}
    </div>
  );
};

export default ReviewPage;
