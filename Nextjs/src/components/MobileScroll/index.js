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
      <Link href="/PostReview">
        <Button className="text-white bg-black hover:bg-gray-950 px-3 py-1  subfont border-none text-xl">
        "Upload a review!",
        </Button>
      </Link>,
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
