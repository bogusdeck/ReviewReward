import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ReviewPage = () => {
  const { id } = useParams(); 
  const [review, setReview] = useState(null); 

  useEffect(() => {
    // Fetch review data from Firestore
    const fetchReview = async () => {
      try {
        const q = query(collection(db, "review"), where(doc.id, "==", id));
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
    <div className="review-page">
      <h2 className="text-2xl font-bold mb-4">Review Details</h2>
      {review ? (
        <div className="review-details">
          <p><strong>Brand:</strong> {review.brand}</p>
          <p><strong>Category:</strong> {review.category}</p>
          <img src={review.images[0]} alt={review.productName} />
          <p><strong>Product Review:</strong> {review.productReview}</p>
          <p><strong>Product Name:</strong> {review.productName}</p>
          <p><strong>Purchase Date:</strong> {review.purchaseDate}</p>
          <p><strong>Purchase Price:</strong> ${review.purchasePrice}</p>
          <p><strong>User Email:</strong> {review.userEmail}</p>
        </div>
      ) : (
        <p>Loading review...</p>
      )}
    </div>
  );
};

export default ReviewPage;
