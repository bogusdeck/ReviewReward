import React from "react";

const BrandCard = ({ brand, onRedeem }) => {
  const handleRedeem = () => {
    // Trigger the redemption process
    onRedeem(brand.docId,brand.brandPrice); // Pass the brand ID to the parent component
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={brand.images[0]}
        alt={brand.brandName} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{brand.brandName}</h2>
        <p className="text-gray-700 h-24 overflow-hidden">{brand.brandDescription}</p>
        <div className="flex justify-end mt-4">
          <p className="text-gray-600">Review Points: {brand.brandPrice}</p>
        </div>
        <div className="flex justify-end mt-2">
          <p className="text-gray-600">End Date: {brand.brandDate}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handleRedeem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Redeem Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
