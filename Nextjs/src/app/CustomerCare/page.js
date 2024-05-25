import react from 'react';

export default function CustomerCarePage(){
  return (
    <div className="relative h-full overflow-hidden text-[#F8F4EC]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="landingbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 mx-auto w-80 justify-center rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl subfont-bold ">
            Customer Care Page
          </h2>
        </div>
        <form className="mt-8 space-y-6 subfont-medium" >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="issue" className="sr-only">
                Describe the issue
              </label>
              <textarea
                id="issue"
                name="issue"
                rows={5}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Describe the issue..."
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-900 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="mt-8 font font-sans">
            <h2 className="text-2xl font-bold font-sans mb-4">Customer Care</h2>
            <p className="text-lg mb-2">For any inquiries or assistance, please contact our customer support team:</p>
            <p className="text-lg mb-2">Email: rndreward@gmail.com</p>
            <p className="text-lg mb-2">Phone: +91-8957392057</p>
            <p className="text-lg">Working Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
        </div>
      </div>
    </div>
  );
};

