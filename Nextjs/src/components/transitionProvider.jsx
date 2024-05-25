"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./NavBar";

const TransitionProvider = ({ children }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className=" bg-[#18181b]"
      >
        {/* <motion.div
          className="h-screen w-screen fixed bg-[#18181b]"
          animate={{ height: "0vh" }}
          exit={{ height: "100vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        /> */}
        {/* <motion.div
          className="fixed insert-0 flex text-white text-8xl cursor-default z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {pathName.substring(1)}
        </motion.div> */}
        {/* <motion.div
          className="h-screen w-screen fixedbg-[#18181b] rounded-t-[100px] bottom-0 left-0 right-0 z-30"
          initial={{ height: "100vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        /> */}
       <div className="relative"><Header/><Navbar/>{children}<Footer/></div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;