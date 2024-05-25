"use client"
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../app/firebase";

const BrandSwiper = ({ brand }) => {
  const id = brand;
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = [];
        const q = query(collection(db, "brand"), where("__name__", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          brandsData.push({ docId: doc.id, ...doc.data() });
        });
        setBrandData(brandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, [id]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {brandData.map((brandItem) => (
        <div key={brandItem.docId}>
          <img
            src={brandItem.images[0]}
            alt={brandItem.brandName}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{brandItem.brandName}</h2>
            <p className="text-gray-700 h-24 overflow-hidden">
              {brandItem.brandDescription}
            </p>
            <div className="flex justify-end mt-4">
              <p className="text-gray-600">Review Points: {brandItem.brandPrice}</p>
            </div>
            <div className="flex justify-end mt-2">
              <p className="text-gray-600">End Date: {brandItem.brandDate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandSwiper;
