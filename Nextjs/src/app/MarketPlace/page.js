"use client";
// Import React and necessary components
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory hook for redirection
import BrandCard from "@/src/components/BrandCard";
import { UserAuth } from '../context/AuthContext';
import { addDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { getDocs, collection, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        const redeemedRewards = doc.data().redeemedRewards || [];

        if (currentReviewPoints > brandPrice) {
          await updateDoc(docRef, {
            reviewPoints: currentReviewPoints - brandPrice,
            redeemedRewards: [...redeemedRewards, brandId]
          });
          toast.success("Review points deducted successfully and brand added to redeemed rewards!!");

        } else {
          toast.error("Not Enough Review Points Available!!!");
        }

        return true;
      } else {
        console.log("No documents found with the provided email.");
        return false;
      }
    } catch (error) {
      console.error("Error redeeming brand:", error);
      return false;
    }
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const currentBrands = brands.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <ToastContainer />
      {user ? ( // Check if user is logged in
        <div>
          <div className="text-3xl subfont-bold text-white text-center mt-4 mb-1 p-4">
            Marketplace
          </div>
          <div className="flex items-center justify-center">
            <div className="w-11/12">
              <div className="grid grid-cols-3 gap-4 subfont-medium mb-5">
                {currentBrands.map((brand) => (
                  <BrandCard key={brand.docId} brand={brand} onRedeem={handleRedeem} />
                ))}
              </div>
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
      ) : (
        <div className="flex justify-center h-screen items-center subfont-bold ">
          <p className="text-white">Login/Sign Up To Unlock Amazing Rewards!!</p>
        <div className="flex justify-center h-screen items-center ">
      
         <a href="/Login" className="border border-white text-white rounded-lg p-3 m-2 bg-[#425568] flex items-center justify-center">
              Login/Signup
            </a>
        </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
