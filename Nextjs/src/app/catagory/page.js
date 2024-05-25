import dynamic from 'next/dynamic';

const CategoryLink = dynamic(() => import('../../components/CatagoryLink'), { ssr: false });

const Page = () => {
  return (
    <section className="bg-black min-h-screen w-full subfont-bold">
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
    </section>
  );
};

export default Page;
