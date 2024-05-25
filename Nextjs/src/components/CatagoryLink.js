"use client";

import { useRouter } from 'next/navigation';

const categories = [
  { name: 'Mobiles', path: 'Smartphone' },
  { name: 'Audio', path: 'Headphone' },
  { name: 'Laptop', path: 'Laptops' },
  { name: 'Smartwatch', path: 'Smartwatchs' },
  { name: 'Computer Peripherals', path: 'ComputerPheripheral' },
  { name: 'Home Appliances', path: 'HomeAppliances' },
];

const CategoryLink = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(`/Reviews/${path}`);
  };

  return (
    <div className="grid grid-cols-1 gap-16 mt-12 sm:grid-cols-3 lg:mt-10 justify-items-center">
      {categories.map((category, index) => (
        <div
          key={index}
          className="w-fit h-fit transition-all duration-1000 rounded-xl cursor-pointer"
          onClick={() => handleNavigation(category.path)}
        >
          <div className="p-2 flex flex-col items-center justify-center h-fit w-fit">
            <div className="text-2xl mt-4 font-bold text-white subfont-bold hover:tracking-widest p-5">
              {category.name.includes(' ')
                ? category.name.split(' ').map((word, i) => (
                    <div key={i}>{word}</div>
                  ))
                : category.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryLink;
