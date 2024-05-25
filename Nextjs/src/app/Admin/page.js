"use client";
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../context/AuthContext"; // Ensure you import UserAuth to get the current user context

async function addDataToFireStore(
  brandName,
  brandDescription,
  brandPrice,
  brandDate,
  images,
  couponCode
) {
  try {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const storageRef = ref(storage, "offers/" + image.name);
        await uploadBytes(storageRef, image);
        return getDownloadURL(storageRef);
      })
    );

    const docRef = await addDoc(collection(db, "brand"), {
      brandName: brandName,
      brandDescription: brandDescription,
      brandPrice: brandPrice,
      brandDate: brandDate,
      images: imageUrls,
      couponCode: couponCode // Added couponCode to the document
    });

    console.log("Document written with ID :", docRef.id);
    return true;
  } catch (error) {
    console.error("error adding document", error);
    return false;
  }
}

const Admin = () => {
  const { user } = UserAuth(); // Get the current user from context
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [brandPrice, setBrandPrice] = useState("");
  const [brandDate, setBrandDate] = useState("");
  const [images, setImages] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFireStore(
      brandName,
      brandDescription,
      brandPrice,
      brandDate,
      images,
      couponCode // Added couponCode to the function call
    );
    if (added) {
      setBrandName("");
      setBrandDescription("");
      setBrandPrice("");
      setBrandDate("");
      setImages([]);
      setCouponCode(""); // Reset coupon code field
      setMessage("Data added to Firestore DB!!");
    } else {
      setMessage("Failed to add data.");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  if (user?.email !== "rndreward@gmail.com") {
    return <div>Access Denied</div>; // Render this if user is not admin
  }

  return (
    <div className="">
      <div className="">  
        <form onSubmit={handleSubmit} className="max-w-4xl p-6 mx-auto rounded-md shadow-md dark:bg-gray-800 mt-20">
          <h2 className="text-xl font-bold text-white capitalize dark:text-white text-center mb-4">Add Offer</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="brandName" className="text-white dark:text-gray-200 block mb-1">Brand Name</label>
              <input
                type="text"
                id="brandName"
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Brand Name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="brandDescription" className="text-white dark:text-gray-200 block mb-1">Brand Description</label>
              <textarea
                id="brandDescription"
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Brand Description"
                value={brandDescription}
                onChange={(e) => setBrandDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="brandPrice" className="text-white dark:text-gray-200 block mb-1">Brand Price</label>
              <input
                type="number"
                id="brandPrice"
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Brand Price"
                value={brandPrice}
                onChange={(e) => setBrandPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="brandDate" className="text-white dark:text-gray-200 block mb-1">End Date</label>
              <input
                type="date"
                id="brandDate"
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                value={brandDate}
                onChange={(e) => setBrandDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="couponCode" className="text-white dark:text-gray-200 block mb-1">Coupon Code</label>
              <input
                type="text"
                id="couponCode"
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="brandImages" className="block text-white text-sm font-bold mb-1 text-center">Product Images</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        multiple
                        className="sr-only"
                        id="file-upload"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="bg-white border text-black rounded-md p-2 text-sm text-center m-2"
              >
                Add Offer
              </button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Admin;
