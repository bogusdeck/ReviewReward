"use client";
import { useEffect, useState } from "react";
// Import necessary Firebase Firestore functions
import BrandCard from "@/src/components/BrandCard";
import { UserAuth } from '../context/AuthContext';
import { addDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { getDocs, collection, updateDoc } from "firebase/firestore"; // Correct import for Firestore functions

const itemsPerPage = 9;

const Marketplace = () => {
  const { user } = UserAuth(); // Access user object from the context

  const [brands, setBrandsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRedeem = async (brandId, brandPrice) => {
    try {
      const userEmail = user.email;
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const docRef = doc.ref;
        const currentReviewPoints = doc.data().reviewPoints;
        const redeemedRewards = doc.data().redeemedRewards || []; // Initialize the array if it doesn't exist

        // Deduct brandPrice from reviewPoints
        if (currentReviewPoints > brandPrice) {
          await updateDoc(docRef, {
            reviewPoints: currentReviewPoints - brandPrice,
            redeemedRewards: [...redeemedRewards, brandId] // Add brandId to redeemedRewards array
          });
        } else {
          alert("NOT ENOUGH REVIEW POINTS AVAILABLE!!!!");
        }

        console.log("Review points deducted successfully and brand added to redeemed rewards!!");
        return true; // Indicate success
      } else {
        console.log("No documents found with the provided email.");
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error redeeming brand:", error);
      return false; // Indicate failure
    }
  };

  const sortByPrice = () => {
    // Sort logic here
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandData = [];
        const querySnapshot = await getDocs(collection(db, "brand"));
        querySnapshot.forEach((doc) => {
          brandData.push({ docId: doc.id, ...doc.data() });
        });
        setBrandsData(brandData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(brands.length / itemsPerPage);

  // Get the brands for the current page
  const currentBrands = brands.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="text-3xl subfont-bold text-white text-center mt-4 mb-1 p-4">
        Marketplace
      </div>
      {/* <div className="flex items-end subfont-bold justify-end text-gray-500">
        <button onClick={sortByPrice} className="p-2 border subfont-medium rounded-md mr-2 hover:text-white hover:bg-blue-700 hover:font-bold">
          Sort
        </button>
        <button onClick={sortByPrice} className="p-2 border subfont-medium rounded-md mr-2  hover:text-white hover:bg-blue-700 hover:font-bold">
          Filter
        </button>
      </div> */}

      <div className="flex items-center justify-center">
        <div className="w-11/12">
          <div className="grid grid-cols-3 gap-4 subfont-medium mb-5">
            {currentBrands.map((brand) => (
              <BrandCard key={brand.docId} brand={brand} onRedeem={handleRedeem} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 pb-3">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 subfont-bold rounded-md mr-2 bg-blue-600 text-white hover:text-white hover:bg-blue-800 hover:font-bold"
            >
              Previous
            </button>
      
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 subfont-bold rounded-md ml-2 text-white bg-blue-600 hover:text-white hover:bg-blue-800 hover:font-bold"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
