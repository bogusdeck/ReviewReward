"use client"
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReviewCard from '@/src/components/ReviewCard';
import BrandSwiper from '@/src/components/BrandSwiper';
import Sidebar from '@/src/components/SideBar';
import { UserAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const { user } = UserAuth(); // Access user object from the context
  const [review, setReview] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (user) {
        const userEmail = user.email;
        const reviewsData = [];
        const q = query(collection(db, "reviews"), where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          reviewsData.push({ docId: doc.id, ...doc.data() });
        });
        setReview(reviewsData);
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
        querySnapshot.forEach((doc) => {
          temp.push(doc.data());
        });
        setUserData(temp);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user]);

  const isReviewAvailable = review.length > 0;
  const isRedeemedRewardsEmpty = !userData[0]?.redeemedRewards || userData[0]?.redeemedRewards.length === 0;

  return (
    <div className="text-white flex">
      <div className="container mx-auto px-4 py-8">
        {user ? (
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
            { isReviewAvailable? (
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
            </Swiper>):(<div className="grid place-items-center">
  <p className="text-center text-white mt-10 mb-10">Post your first review and earn rewards</p>
  <a href="/PostReview" className="border border-white text-white rounded-lg p-3 bg-[#425568] hover:bg-blue-700">
    POST REVIEW
  </a>
</div>

          )}
            <div className=''>
  <h1 className="text-3xl font-semibold mb-4 mt-8">Redeemed rewards</h1>
  {isRedeemedRewardsEmpty ?(<div className="grid place-items-center">
  <p className="text-center text-white mt-10 mb-10">Redeem Exciting Rewards</p>
  <a href="/MarketPlace" className="border border-white text-white rounded-lg p-3 bg-[#425568]">
    MARKET PLACE
  </a>
</div>):(
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
  </Swiper>)
  }
</div>

          </div>
        )}
      </div>
      <Sidebar user={user} />
    </div>
        ) : (
          <div className="grid place-items-center min-h-screen">
          <p className="text-center text-white mt-10">Login/Singup To View DashBoard</p>
          <a href="/Login" className="border border-white text-white rounded-lg p-3 bg-[#425568]">
            Login/Signup
          </a>
        </div>
        )}
      </div>
      <Sidebar user={user} />
    </div>
  );
};

export default Dashboard;
