"use client"
import dynamic from 'next/dynamic';
  
import { UserAuth } from '../context/AuthContext';

const CategoryLink = dynamic(() => import('../../components/CatagoryLink'), { ssr: false });

const Page = () => {
  
  const { user } = UserAuth();  

  
 

  return (
    <section className=" min-h-screen w-full subfont-bold">
      {user ? ( 
        <div className="py-2 sm:py-8 lg:py-10 relative z-40 subfont-bold flex items-center justify-center">
          <div className="px-4 mx-auto max-w-4xl sm:px-2 lg:px-4 relative font-sans bg">
            <div className="max-w-xl mx-auto text-center text-white">
              <p className="text-4xl subfont-bold tracking-widest text-white uppercase">
                Categories:
              </p>
            </div>
            <CategoryLink />
          </div>
        </div>
      ) : ( // If user is not logged in, display the login button
      <div className="flex justify-center h-screen items-center ">
      <p className="text-white">Login/Sign Up To View Reviews</p>
    <div className="flex justify-center h-screen items-center ">
  
     <a href="/Login" className="border border-white text-white rounded-lg p-3 m-2 bg-[#425568] flex items-center justify-center">
          Login/Signup
        </a>
    </div>
    </div>
      )}
    </section>
  );
};

export default Page;
