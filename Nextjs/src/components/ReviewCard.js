"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";

const ReviewCard = ({ review }) => {
  const router = useRouter();
  
  const handleClick = () => {
    // Redirect to the review page with the review ID as a URL parameter
    router.push(`/ReviewPage/${review.docId}`);
  };

  if (!review) {
    return <div>Error: Review data is undefined</div>;
  }

  const { brand, category, images, productReview, productName, purchaseDate, purchasePrice, userEmail, shoppingLink } = review;

  console.log("ReviewCard received review:", review); // Log the review data

  return (
    <div className="bg-white rounded-lg shadow-md p-6" onClick={handleClick}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">{productName}</h2>
          <p className="text-gray-500">{category} - {brand}</p>
        </div>
        <p className="text-gray-500">{purchaseDate}</p>
      </div>
      {images && images.length > 0 && (
        <img src={images[0]} alt={productName} className=" h-[280px] mb-4 object-cover" />
      )}
      <p className="text-gray-600 mb-4 truncate">{productReview}</p>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{userEmail}</p>
          <p className="text-gray-500">{purchasePrice}</p>
          {shoppingLink && (
            <Link href={shoppingLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Shopping Link
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
