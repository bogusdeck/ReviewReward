"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimationComponent from "../components/AnimationComponent";
import MobileScroll from "../components/MobileScroll";
import BrandsLove from "../components/brandsLove/page";
import { Button } from "antd";



const Page = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const paragraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <>
      <div className=" relative w-screen h-[calc(100vh-6rem)] text-white flex flex-col items-center justify-center text-center bg-cover">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="landingbg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="bg-opacity-25  rounded-xl pb-5 backdrop-filter backdrop-blur-none">
          <div className="myfont text-center text-[42px] md:text-[72px] lg:text-[114px]">
            <div>Give Review</div>
            <div>Earn Rewards</div>
          </div>
          <div className="subfont mt-5">
            <div className="text-[16px] md:text-lg lg:text-xl  tracking-[0.5px]">
              Every REVIEW you post comes with exciting Prizes
            </div>
            <div className="text-[16px] md:text-lg lg:text-xl text-white tracking-[0.5px]">
              So What's stopping you
            </div>
          </div>
        </div>
      </div>



      <MobileScroll />


      <div className="relative w-screen min-h-screen text-white flex flex-col items-center justify-center text-center bg-cover">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="rewards.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className=" bg-[url('/public/rewards.mp4')] rounded-xl pb-5 backdrop-filter backdrop-blur-none">
          <div className="myfont mb-4 text-white text-3xl md:text-4xl lg:text-8xl tracking-wider ">
            REWARDS FOR <br />
            EVERY REVIEW
          </div>
          <div className="flex items-center justify-center">
            <div className="subfont w-2/3 text-center text-[12px] md:text-[16px] lg:text-[18px] font-bold">
              Compose a detailed review outlining your experience with the
              product, covering its performance, durability, ease of use, and
              any other pertinent factors. Offer genuine insights to aid
              potential buyers in making informed decisions.
            </div>
          </div>
        </div>
      </div>

      <section className="relative w-screen min-h-screen text-white flex flex-col items-center justify-center text-center bg-cover bg-black">
        <div>
          <AnimationComponent />
        </div>
      </section>

      <section className="bg-[url('https://web-images.credcdn.in/v2/_next/assets/images/landing/desktop/cta-fold-final.png')] w-screen bg-cover min-h-screen flex">
        <div className="grid grid-cols-2">
        <div col-span-1="true">.</div>


          <div className="col-span-1 flex flex-col items-center justify-center text-end w-11/12">
            <div className="subfont">
              <h2 className="mb-4 text-[22px] md:text-[26px] lg:text-[30px] font-bold text-black md:text-white">
                Helping users for better shopping and product experience
                <span className="font-extrabold"></span>
              </h2>
            </div>
            <div className="subfont">
              <p className="mb-4 font-light text-[14px] md:text-[18px] lg:text-[22px] text-black md:text-white">
                Exciting rewards for every review you post. Reward Review makes
                the service provider understand the customers and the response
                of the users on the products.
              </p>
            </div>
            
            <div className="subfont flex items-end justify-end text-end">
            <a href="/AboutUs" className="subfont text-blue-600 hover:text-blue-80  text-[14px] md:text-[18px] lg:text-[22px]">Learn more</a>
            </div>

            <Button href="/PostReview" className="subfont flex items-end justify-end text-end bg-black text-white mt-2 border-none">Post Review!</Button>

          </div>
        </div>

      </section>
      {/* <section className="bg-[url('https://web-images.credcdn.in/v2/_next/assets/images/landing/desktop/cta-fold-final.png')] w-screen min-h-screen flex flex-col gap-16 items-center justify-center text-center ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg sm:text-lg text-white">
            <div className="subfont">
              <h2 className="mb-4 text-4xl font-bold text-white">
                Helping users for better shopping and product experience
                <span className="font-extrabold"></span>
              </h2>
            </div>
            <div className="subfont">
              <p className="mb-4 font-light">
                Exciting rewards for every review you post. Reward Review makes
                the service provider understand the customers and the response
                of the users on the products.
              </p>
            </div>
            <div className="subfont">
              <a
                href="/AboutUs"
                className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
              >
                Learn more
                <svg
                  className="ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>  */}
      <section>
        <BrandsLove />
      </section>
    </>
  );
};

export default Page;
