import React from "react";

import { UserAuth } from "../app/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/whiteonblack.png"

const Header = () => {
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
    <header className="bg-black text-white body-font">
      <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center justify-center">
        <a className="flex items-center h-full hover:text-gray-700 ">
          {/* <img
            className="m-auto "
            src="whiteonblack.png"
            alt="Logo"
            width={50}
          /> */}
          <Image src={Logo}
          height={50}
          />
          <div className="flex flex-wrap align-content-evenly mt-1">
            <span className="subfont-bold text-[23px] ">ReviewReward</span>
          </div>
        </a>

        <div className="flex flex-1 justify-end items-center space-x-4 mr-3">
          
          {user ? (
            <div className="flex items-center">
              <Link href="/DashBoard">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.photoURL}
                  alt="User"
                />
              </Link>
              <span className="ml-2 subfont-light pr-3">{user.displayName}</span>
              <button
                onClick={handleSignOut}
                className="subfont-light"
              >
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.25"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
              </button>
            </div>
          ) : (
            
            <Link href="/Login" className="subfont-light">
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
