"use client"
import { useEffect, useState } from 'react';
import ReviewCard from '@/src/components/ReviewCard';
import Sidebar from '@/src/components/SideBar';
import { UserAuth } from '../context/AuthContext';
import { collection, addDoc, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { getDocs, doc, updateDoc } from "firebase/firestore";

const Dashboard = () => {
  
  const { user } = UserAuth(); // Access user object from the context
  const [review, setReview] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      if (user) {
        const userEmail = user.email;
        const temp = [];
        const q = query(collection(db, "reviews"), where("userEmail", "==", userEmail));

        const querySnapshot = await getDocs(q);
        console.log("Number of documents retrieved:", querySnapshot.size);
        
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          temp.push(doc.data());
        });

        console.log("Temp array:", temp);

        setReview(temp);
        console.log(review);
      }
    };
    const fetchUser = async () => {
      try {
        

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
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();

    fetchReviews();
  }, [user]);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
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
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user]);
  return (
    <div className="text-white flex">
      <div className="container mx-auto px-4 py-8">
        {user && (
          <div>
            <div className="flex flex-col items-center mb-8">
              <img src={user?.photoURL} alt={user.displayName} className="w-48 h-48 rounded-full mb-4 " />
              <h1 className="text-3xl font-semibold">{user.displayName}</h1>
              <p className=" mb-2">{user.email}</p>
              {user.reviewPoints && <p className="text-gray-600">Review Points: {user.reviewPoints}</p>}
            </div>
            <h1 className="text-3xl font-semibold mb-4">Your Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {review.map((reviewData, index) => (
                <ReviewCard key={index} review={reviewData} />
              ))}
            </div>
          </div>
        )}
      </div>
        <Sidebar user={user} />
    </div>
  );
};

export default Dashboard;