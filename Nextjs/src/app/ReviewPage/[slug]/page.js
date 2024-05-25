"use client"
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
      <h2 className="text-2xl subfont-bold mb-4 text-center">Review Details</h2>
      {review ? (
        <div className="review-details flex flex-col items-center">
          <p className="text-center"><strong>Brand:</strong> {review.brand}</p>
          <p className="text-center"><strong>Category:</strong> {review.category}</p>
          {review.images && review.images.length > 0 && (
            <img
              className="my-4 w-92 h-92 rounded-xl object-cover"
              src={review.images[0]}
              alt={review.productName}
            />
          )}
          <p className="subfont-light text-center"><strong>Product Review:</strong> {review.productReview}</p>
          <p className="subfont-light text-center"><strong>Product Name:</strong> {review.productName}</p>
          <p className="subfont-light text-center"><strong>Purchase Date:</strong> {review.purchaseDate}</p>
          <p className="subfont-light text-center"><strong>Purchase Price:</strong> ${review.purchasePrice}</p>
          <p className="subfont-light text-center"><strong>User Email:</strong> {review.userEmail}</p>
        </div>
      ) : (
        <p>Loading review...</p>
      )}
    </div>
  );
  
};

export default ReviewPage;
