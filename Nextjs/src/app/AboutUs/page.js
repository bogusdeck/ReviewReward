import React from 'react'

const page = () => {
  return (
    <div className="w-screen min-h-screen text-white ">
        <div class="container my-12 py-12 mx-auto px-4 md:px-6 lg:px-12">

    <section class="mb-20 text-white text-center">
        <h3 class="text-5xl mb-12 subfont-bold ">About us
        </h3>
        <div class="flex flex-wrap">
        <div class="mb-6 lg:mb-0 flex-initial shrink w-full lg:w-5/12 lg:pr-3">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7000.215048360535!2d77.327229!3d28.68643!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbac1bf7ef39%3A0x27c183fb074b7265!2sDilshad%20Colony%2C%20Delhi%2C%20110095!5e0!3m2!1sen!2sin!4v1710622284899!5m2!1sen!2sin"
            class=" md:h-full w-full border-0 rounded-md" allowfullscreen="" loading="lazy"></iframe>
        </div>
        <div class="flex-initial shrink w-full lg:w-7/12 lg:pl-3"> 

        <div class="form-control block w-full px-3 py-1.5 subfont-medium bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-3xl">For User</div>

        <div class="form-control block w-full px-3 py-1.5 text-base subfont-light bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">Welcome to ReviewReward! We believe in the power of honest feedback. Share your authentic reviews and earn claimable reward points for every contribution. Whether you're reviewing products, services, or experiences, your opinion matters. Join our community of users dedicated to transparency and get rewarded for your valuable insights. Start earning points today and enjoy the benefits of being a part of ReviewReward!</div>

        <div class="form-control block w-full px-3 py-1.5 subfont-medium bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-3xl">For Brands</div>

        <div class="form-control block w-full px-3 py-1.5 text-base  subfont-light   bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">Welcome to ReviewReward, where honesty is rewarded! As a brand on our platform, you have the opportunity to engage with users by offering incentives for their honest opinions about your products. Gain valuable insights while building trust and loyalty with your audience. Join us in fostering genuine feedback and rewarding authenticity. Let's collaborate to create meaningful connections and elevate consumer experiences together.</div>
        
        <div class="container px-6 py-12 mx-auto">
            <div>
                <p class="subfont-bold text-blue-500 dark:text-blue-400 ">Contact us</p>

                <h1 class="mt-2 text-2xl subfont-black  md:text-3xltext-white ">Get in touch</h1>

                <p class="mt-3 subfont-light ">Mail us for more Queries.</p>
            </div>

            <div class="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <span class="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </span>

                    <h2 class="mt-4 text-lg subfont-semibold  text-white">Email</h2>
                    <p class="mt-2 text-white subfont-semibold dark:text-gray-400">We would love to help</p>
                    <p class="mt-2 text-blue-500 dark:text-blue-400 subfont-semibold ">rndreward@gmail.com</p>
                </div>

                <div>
                    <span class="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                    </span>

                    <h2 class="mt-4 text-lg subfont-semibold text-white">Office</h2>
                    <p class="mt-2 text-white subfont-semibold ">You can also visit</p>
                    <p class="mt-2 text-blue-500 dark:text-blue-400 subfont-semibold ">Dilshad Colony ,दिलशाद कॉलोनी Delhi, 110095</p>
                </div>

                <div>
                    <span class="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                    </span>

                    <h2 class="mt-4 text-lg subfont-semibold  text-white">Phone</h2>
                    <p class="mt-2 text-white subfont-semibold ">Mon-Fri from 9am to 6pm.</p>
                    <p class="mt-2 text-blue-500 subfont-semibold ">+91-8957392057</p>
                </div>
            </div>
        </div>
            </div>
            </div>
    </section>

    </div>
    </div>
    
  )
}

export default page