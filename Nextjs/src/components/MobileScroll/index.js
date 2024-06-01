import React, { useState } from "react";
import "../hehe.css";
import ScreenText from "./ScreenText";
import { Button } from "antd";
import Link from "next/link";

const scrollData = [
  {
    heading: "Hungry for Rewards?",
    description:
      "Simply login in our website from your browser using your gmail id",
    mobile_img:
      "Frame 1.png",
  },
  {
    heading: "begin your winning streak.",
    description:
      <a className="inline-flex mt-4" href="/PostReview">
        <span className="h-10 text-sm flex items-center justify-center uppercase font-semibold px-2 border border-white text-white  hover:bg-white hover:text-black transition duration-500 ease-in-out subfont">Post review</span>
        <span className="h-10 w-10 flex-shrink-0 flex items-center justify-center border border-l-0 border-white text-white hover:bg-white hover:text-black transition duration-500 ease-in-out">
          <svg aria-hidden="true" focusable="false" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" className="h-3 w-3 svg-inline--fa fa-chevron-right fa-w-8 fa-9x"><path fill="currentColor" d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" /></svg>
        </span>
      </a>,
    mobile_img:
      "Frame 2.png",
  },
  {
    heading: "for your eclectic taste.",
    description:
      "Grab the exciting rewards from the Marketplace ",
    mobile_img:
      "Frame 3.png",
  },
  {
    heading: "more cash in your pockets.",
    description:
      "Save those Extra Ruppee in your pocket",
    mobile_img:
      "Frame 4.png",
  },
];

const MobileScroll = () => {
  const [currentImg, setCurrentImg] = useState(0);
  return (
    <div className="mobile-scroll flex max-width">
      <div className="scroll-full-screen-wrapper">
        {scrollData.map((screen, i) => (
          <div key={i} className="scroll-full-screen">
            <ScreenText screen={screen} setCurrentImg={setCurrentImg} i={i} />
          </div>
        ))}

      </div>
      <div className="mobile-mockup-wrapper non-mobile">
        <div className="mobile-mockup ">
          <div className="mobile-mockup-screen flex absolute-center">
            <img
              src={scrollData[currentImg].mobile_img}
              className="mobile-screen-img slide-in-right "
              key={scrollData[currentImg].mobile_img}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileScroll;
