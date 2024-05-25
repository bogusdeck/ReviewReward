"use client";
import { useEffect, useState } from 'react';
import ReviewCard from '@/src/components/ReviewCard';
import Sidebar from '@/src/components/SideBar';
import { UserAuth } from '../context/AuthContext';
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BrandSwiper from '@/src/components/BrandSwiper';
import { Button } from 'antd';

const Dashboard = () => {
  const { user } = UserAuth(); // Access user object from the context
  const [review, setReview] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (user) {
        const userEmail = user.email;
        const reviewsData=[]
        const temp = [];
        const q = query(collection(db, "reviews"), where("userEmail", "==", userEmail));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          reviewsData.push({ docId: doc.id, ...doc.data() });
        });
        setReview(reviewsData);
        console.log(review);
      }
    };

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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div className="text-white flex">
      <div className="container mx-auto px-4 py-8">
        {userData.length > 0 && (
          <div>
            <div className="flex flex-col items-center mb-8 mt-2">
              <img src={userData[0]?.photoURL} alt={userData[0]?.displayName} className="w-48 h-48 rounded-full mb-4 shadow-lg" />
              <h1 className="text-3xl font-semibold">{userData[0]?.displayName}</h1>
              <p className="mb-2">{userData[0]?.email}</p>
              {userData[0]?.reviewPoints && <p className="text-gray-400">Review Points: {userData[0]?.reviewPoints}</p>}
              <Button href='/PostReview' className="mt-2 subfont-medium bg-white bg-opacity-0 text-blue-800 border-none text-xl">Post Reviews!</Button>
            </div>
            {user.email === "rndreward@gmail.com" && (
              <div>
                <a
                  href="/Admin"
                  className="inline-block text-white bg-[#425568] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  GO TO ADMIN PAGE
                </a>
                <a
                  href="https://console.firebase.google.com/project/rreward-a82b8/overview"
                  className="inline-block text-white bg-[#425568] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  GO TO CONSOLE
                </a>
              </div>
            )}
            <h1 className="text-3xl font-semibold mb-4">Your Reviews</h1>
            <Swiper
               slidesPerView={1} // Set initial slides per view for mobile
               spaceBetween={10}
               loop={true}
               autoplay={{
                 delay: 3000,
                 disableOnInteraction: false,
               }}
               navigation={true}
               modules={[Navigation, Autoplay]}
               breakpoints={{
                 640: {
                   slidesPerView: 2,
                 },
                 768: {
                   slidesPerView: 3,
                 },
                 1024: {
                   slidesPerView: 3,
                 },
               }}
            >
              {review.map((reviewData, index) => (
                <SwiperSlide key={index}>
                  <ReviewCard review={reviewData} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className=''>
  <h1 className="text-3xl font-semibold mb-4 mt-8">Redeemed rewards</h1>
  <Swiper
     slidesPerView={1} // Set initial slides per view for mobile
     spaceBetween={10}
     loop={true}
     autoplay={{
       delay: 3000,
       disableOnInteraction: false,
     }}
     navigation={true}
     modules={[Navigation, Autoplay]}
     breakpoints={{
       640: {
         slidesPerView: 2,
       },
       768: {
         slidesPerView: 3,
       },
       1024: {
         slidesPerView: 3,
       },
     }}
  >
    {userData[0]?.redeemedRewards.map((brand, index) => (
      <SwiperSlide key={index}>
        <BrandSwiper brand={brand} />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

          </div>
        )}
      </div>
      <Sidebar user={user} />
    </div>
  );
};

export default Dashboard;
