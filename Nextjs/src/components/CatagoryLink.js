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
    <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative w-64 h-32 transition-all duration-300 ease-in-out transform rounded-xl cursor-pointer overflow-hidden"
          onClick={() => handleNavigation(category.path)}
        >
          <div className="p-2 flex flex-col items-center justify-center h-full w-full">
            <div className="relative flex items-center justify-center border border-white w-11/12 h-11/12 text-2xl mt-4 font-bold text-white subfont-bold p-5 transition-all duration-300 ease-in-out hover:tracking-widest">
              <span className="block">
                {category.name.includes(' ')
                  ? category.name.split(' ').map((word, i) => (
                      <div key={i}>{word}</div>
                    ))
                  : category.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryLink;
