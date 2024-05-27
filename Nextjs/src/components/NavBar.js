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
          <div className="inline-block">
            <Link href="/" className="group relative">
              <span className="block text-white transition-all duration-300 subfont-medium tracking-[0.5px] group-hover:tracking-[4px] group-hover:text-gray-300">
                HOME
              </span>
            </Link>
          </div>
          <div className="inline-block">
            <Link href="/AboutUs" className="group relative">
              <span className="block text-white transition-all duration-300 subfont-medium tracking-[0.5px] group-hover:tracking-[4px] group-hover:text-gray-300">
                ABOUT US
              </span>
            </Link>
          </div>
          <div className="inline-block">
            <Link href="/category" className="group relative">
              <span className="block text-white transition-all duration-300 subfont-medium tracking-[0.5px] group-hover:tracking-[4px] group-hover:text-gray-300">
                CATEGORY
              </span>
            </Link>
          </div>
          <div className="inline-block">
            <Link href="/MarketPlace" className="group relative">
              <span className="block text-white transition-all duration-300 subfont-medium tracking-[0.5px] group-hover:tracking-[4px] group-hover:text-gray-300">
                MARKETPLACE
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;