"use client";
import React, { useState, useContext, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, query, where, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from "../context/AuthContext";

async function addDataToFireStore(
  productname,
  category,
  brand,
  purchaseDate,
  purchasePrice,
  productReview,
  images,
  userEmail,
  shoppingLink,
) {
  try {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const storageRef = ref(storage, "images/" + image.name);
        await uploadBytes(storageRef, image);
        return getDownloadURL(storageRef);
      })
    );

    const docRef = await addDoc(collection(db, "reviews"), {
      productname: productname,
      category: category,
      brand: brand,
      purchaseDate: purchaseDate,
      purchasePrice: purchasePrice,
      productReview: productReview,
      images: imageUrls,
      userEmail: userEmail,
      reviewPoint: 100,
      shoppingLink: shoppingLink || "", // If not provided, set it to empty string
      reviewPostedDate: new Date()
    });

    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document:", error);
    return false;
  }
}

async function fetchUserData(user, setUserData) {
  try {
    console.log(user);
    console.log(user.email);
    if (!user || !user.email) {
      console.log("User not found or email not available.");
      return;
    }

    const userEmail = user.email;
    const temp = [];
    const q = query(collection(db, "users"), where("email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    console.log("Number of documents retrieved:", querySnapshot.size);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      temp.push(doc.data());
    });

    console.log("Temp array:", temp);
    setUserData(temp);
    console.log(temp);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}


const PostReview = () => {
  const [message, setMessage] = useState("");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [productReview, setProductReview] = useState("");
  const [images, setImages] = useState([]);
  const [shoppingLink, setShoppingLink] = useState("");
  const { user } = UserAuth();
  const [userData, setUserData] = useState([]);

  // Brand options object
  const brandOptions = {
    Smartphone: [
      "APPLE",
      "SAMSUNG",
      "ONEPLUS",
      "REALME",
      "OPPO",
      "VIVO",
      "REDMI",
      "HONOR",
    ],
    Laptops: ["ASUS/ROG", "HP", "ACER", "MSI", "SAMSUNG", "DELL"],
    Smartwatches: ["BOAT", "APPLE", "AMAZEFIT", "SAMSUNG", "ONEPLUS", "HAMMER"],
    Headphones: ["Brand10", "Brand11", "Brand12"],
    HomeAppliances: ["Brand13", "Brand14", "Brand15"],
    ComputerPeripheral: ["Brand16", "Brand17", "Brand18"],
  };

  // Submit form handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("purchaseDate", purchaseDate);
    formData.append("purchasePrice", purchasePrice);
    formData.append("productReview", productReview);
    formData.append("shoppingLink", shoppingLink);

    try {
      const response = await fetch("https://reviewreward-production.up.railway.app/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          category,
          brand,
          purchaseDate,
          purchasePrice,
          productReview,
          shoppingLink,
        }),
      });

    const handleResponse = async (response) => {
      if (response.ok) {
        const data = await response.json();

        if (data.message === "Original") {
          const userEmail = user.email;

          const added = await addDataToFireStore(
            productName,
            category,
            brand,
            purchaseDate,
            purchasePrice,
            productReview,
            images,
            userEmail,
            shoppingLink
          );

          if (added) {
            setProductName("");
            setCategory("");
            setBrand("");
            setPurchaseDate("");
            setPurchasePrice("");
            setProductReview("");
            setImages([]);
            setShoppingLink("");

            alert("Data added to Firestore DB!!!");

            // Update user's review points
            const q = query(collection(db, "users"), where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              const doc = querySnapshot.docs[0];
              const docRef = doc.ref;
              const currentReviewPoints = doc.data().reviewPoints;
              await updateDoc(docRef, {
                reviewPoints: currentReviewPoints + 1000,
              });
              console.log("Review submitted successfully!!!!!");
            } else {
              console.log("No documents found with the provided email.");
            }
          }
          fetchUserData(user, setUserData);
        } else {
          alert("Review is not original.");
        }
        console.log("Review submitted successfully!!");
      } else {
        console.error("Failed to submit review");
      }
    };
   
    await handleResponse(response);
  } catch (error) {
    console.error("Error:", error);
  }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Fetch user data
  useEffect(() => {
    fetchUserData(user, setUserData);
  }, [user]);

  return (
    <div className="">
      <div className="">  
      <form onSubmit={handleSubmit} className="max-w-4xl p-6 mx-auto rounded-md shadow-md dark:bg-gray-800 mt-20">
  <h2 className="text-xl font-bold text-white capitalize dark:text-white text-center mb-4">Product Review</h2>
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
    <div>
      <label htmlFor="productname" className="text-white dark:text-gray-200 block mb-1">Product Name</label>
      <input
        type="text"
        id="productname"
        className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="productcategory" className="text-white dark:text-gray-200 block mb-1">Product Category</label>
      <select
        id="productcategory"
        className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        required
      >
        <option value="">Select</option>
        <option value="Smartphone">Smartphone</option>
        <option value="Laptops">Laptops</option>
        <option value="Smartwatches">Smartwatches</option>
        <option value="Headphones">Headphones</option>
        <option value="Home Appliances">Home Appliances</option>
        <option value="Computer Peripheral">Computer Peripheral</option>
      </select>
    </div>
    {category && (
      <div>
        <label htmlFor="productbrand" className="text-white dark:text-gray-200 block mb-1">Product Brand</label>
        <select
          id="productbrand"
          className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          required
        >
          <option value="">Select</option>
          {brandOptions[category].map((brandOption, index) => (
            <option key={index} value={brandOption}>{brandOption}</option>
          ))}
        </select>
      </div>
    )}
    <div>
      <label htmlFor="purchasedate" className="text-white dark:text-gray-200 block mb-1">Purchase Date</label>
      <input
        type="date"
        id="purchasedate"
        className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        value={purchaseDate}
        onChange={(e) => setPurchaseDate(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="proprice" className="text-white dark:text-gray-200 block mb-1">Purchased Price</label>
      <input
        type="number"
        id="proprice"
        className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        placeholder="Purchased Price"
        value={purchasePrice}
        onChange={(e) => setPurchasePrice(e.target.value)}
        required
      />
    </div>
    <div>
      <label htmlFor="shoppinglink" className="text-white dark:text-gray-200 block mb-1">Shopping Link</label>
      <input
        type="url"
        id="shoppinglink"
        className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        placeholder="Shopping Link"
        value={shoppingLink}
        onChange={(e) => setShoppingLink(e.target.value)}
      />
    </div>
    <div className="col-span-2">
      <label htmlFor="proreview" className="block text-white text-sm font-bold mb-1 text-center">Product Review</label>
      <textarea
        rows={5}
        id="proreview"
        className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        placeholder="Product Review"
        value={productReview}
        onChange={(e) => setProductReview(e.target.value)}
        required
      ></textarea>
    </div>
    <div className="col-span-2">
      <label htmlFor="productimage" className="block text-white text-sm font-bold mb-1 text-center">Product Image</label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
              <span className="">Upload a file</span>
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
        className="bg-blue-500 text-white rounded-md p-2 text-sm text-center m-2"
      >
        Post Review
      </button>
    </div>
  </div>
</form>
        {message && <p className="bg-black text-white m-4 p-4"> {message} </p>}
      </div>
    </div>
  );
};

export default PostReview;
