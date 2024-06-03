import React, { useEffect, useState } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { storage } from "../firebase";

export default function SettingsPage() {
  const { user } = UserAuth();
  const [userData, setUserData] = useState([]);

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
    <div className="min-h-screen font-sans bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
        <h1 className="text-5xl font-bold px-8 py-8 text-white">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-3 bg-white rounded-lg shadow-md p-6 hover:bg-slate-600 hover:text-white">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            {userData.map((userDataItem, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={userDataItem.photoURL || "/userprofile.jpg"} 
                  alt="User Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-semibold">{userDataItem.name}</p>
                  <p className="text-gray-600">{userDataItem.email}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 hover:bg-slate-600 hover:text-white">
            <Link href="/ProfileSettings">
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <p className="text-gray-600">Profile settings</p>
            </Link>
          </div>

          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 hover:bg-slate-600 hover:text-white">
            <Link href="/PrivacySettings">
            <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
            <p className="text-gray-600">Privacy settings</p>
            </Link>
          </div>

          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 hover:bg-slate-600 hover:text-white">
            <Link href="/ChangePass">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <p className="text-gray-600">changed password</p>
            </Link>
          </div>

          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 hover:bg-slate-600 hover:text-white">
            <Link href="/YourActivity">
            <h2 className="text-xl font-bold mb-4">Your Activity</h2>
            <p className="text-gray-600">Your Activity</p>
            </Link>
          </div>

          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 hover:bg-slate-600 hover:text-white">
            <Link href="/OrderHistory">
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            <p className="text-gray-600">Order History</p>
            </Link>
          </div>

          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 hover:bg-slate-600 hover:text-white">
            <Link href="/CustomerCare">
            <h2 className="text-xl font-bold mb-4">Coustomer Care</h2>
            <p className="text-gray-600">Coustomer Care</p>
            </Link>
          </div>

          <div className="col-span-1 md:col-span-3 flex justify-end">
            <button
              onClick={handleSignOut}
              className="bg-[#FFAF45] hover:bg-[#E72929] text-black hover:text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
