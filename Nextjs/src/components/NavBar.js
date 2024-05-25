// components/Navbar.js
"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';



const Navbar = () => {
 
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeScrolled = scrollTop > 0;
      setIsScrolled(shouldBeScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`bg-black p-2 ${isScrolled ? 'fixed top-0 left-0 w-full z-50' : ''}`}>
      <div className="container mx-auto flex justify-center items-center">
        <div className="space-x-2 md:space-x-10 text-[12px] md:text-[18px]">
          <Link href="/" className="text-white hover:tracking-[4px] transition duration-300 hover:text-gray-300 subfont-medium tracking-[0.5px]">HOME</Link>
          <Link href="/AboutUs" className="text-white hover:tracking-[4px] transition duration-300 hover:text-gray-300 subfont-medium tracking-[0.5px]">ABOUT US</Link>
          <Link href="/catagory" className="text-white hover:tracking-[4px] transition duration-300 hover:text-gray-300 subfont-medium tracking-[0.5px]">CATEGORY</Link>
          <Link href="/MarketPlace" className="text-white hover:tracking-[4px] transition duration-300 hover:text-gray-300 subfont-medium tracking-[0.5px]">MARKETPLACE</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;