"use client"
import React from "react";
import { UserAuth } from "../context/AuthContext";

const Page = () => {
  const { user, googleSignIn, logOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen subfont font-semibold">
      <div className="flex flex-col items-center justify-center m-6">
        <div className="text-white text-lg m-5 mb-20">JOURNEY OF MULTIPLE REWARDS BEGINS HERE!!!!!</div>

        {!user ? (
          <div className="w-1/3 flex flex-col items-center justify-evenly text-white mt-6 h-full">
            <div className="font-bold text-2xl mt-4">Sign up/ Log in</div>
            <div className="mb-10 mt-3">choose a sign up method</div>
            <button onClick={handleSignIn} className="border border-white rounded-lg p-3 m-2 w-4/5 bg-[#425568] flex items-center justify-center">
              <img src="google.png" className="w-6 h-6 mr-3" alt="Google Logo" />
              <p>Sign up with Google</p>
            </button>
          </div>
        ) : (
          <div className="w-1/3 flex flex-col items-center justify-evenly text-white mt-6 h-full">
            <div className="font-bold text-2xl mt-4"></div>
            <div className="mb-10 mt-3">let's Gooo!!!</div>

            <a href="/DashBoard" className="border border-white rounded-lg p-3 m-2 w-4/5 bg-[#425568] flex items-center justify-center">
              GO TO DASHBOARD
            </a>
            <a href="/catagory" className="border border-white rounded-lg p-3 m-2 w-4/5 bg-[#425568] flex items-center justify-center">
              GO TO REVIEWS
            </a>
            <a href="/MarketPlace" className="border border-white rounded-lg p-3 m-2 w-4/5 bg-[#425568] flex items-center justify-center">
              GO TO MARKETPLACE
            </a>
            <a href="/PostReview" className="border border-white rounded-lg p-3 m-2 w-4/5 bg-[#425568] flex items-center justify-center">
              POST REVIEW EARN REWARDS
            </a>
            
            {user.email === "rndreward@gmail.com" && (
              <a href="/Admin" className="border border-white rounded-lg p-3 m-2 w-4/5 bg-[#425568] flex items-center justify-center">
                GO TO ADMIN PAGE
              </a>
            )}

            <button onClick={handleSignOut} className="border border-white rounded-lg p-3 m-2 w-4/5 bg-[#425568] flex items-center justify-center">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
