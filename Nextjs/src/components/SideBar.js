// components/Sidebar.js
import Link from "next/link";
import { DiAptana } from "react-icons/di";

const Sidebar = () => {
    return (
      <div className=" text-white flex flex-col">
        {/* Sidebar content */}
        <div className="p-4 flex-grow ">
          <ul>
            <Link href="/Settings">
            <li className="py-2 cursor-pointer text-3xl">
              <DiAptana className="hover:text-red-600"/></li>
            </Link>
            {/* Add more menu items as needed */}
          </ul>
        </div>
        {/* Sidebar footer */}
  
      </div>
    );
  };
  
  export default Sidebar;
  