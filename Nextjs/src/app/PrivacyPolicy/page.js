"use client"
import React, { useState } from 'react';

export default function PrivacyPolicy() {
  const [userExpanded, setUserExpanded] = useState(false);
  const [brandExpanded, setBrandExpanded] = useState(false);

  const toggleUser = () => {
    setUserExpanded(!userExpanded);
  };

  const toggleBrand = () => {
    setBrandExpanded(!brandExpanded);
  };

  return (
        <div className="w-screen h-screen] justify-center bg-cover">
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
            
            <div className="min-h-screen py-12 font-sans z-10 relative">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex justify-center mb-8">
                <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4 mt-6">
                    <img
                    className="w-30 h-30"
                    src="/Logo.png"
                    alt="Company Logo"
                    />
                </div>
                </div>
                <h1 className="text-5xl font-bold font-sans text-white mb-8 text-center">
                ReviewReward Privacy Policy
                </h1>
                <div className="p-6 mb-8">
                <h2
                    className="text-4xl text-white font-semibold cursor-pointer flex justify-between items-center transition-colors duration-100 ease-in-out"
                    onClick={toggleUser}
                >
                    Privacy Policy For Users
                    <span className="transform rotate-0">
                    {userExpanded ? '-' : '+'}
                    </span>
                </h2>
                <div
                    className={`mt-4 transition-all duration-300 ease-in-out ${
                    userExpanded ? 'block' : 'hidden'
                    }`}
                >
                    <h3 className="text-3xl font-semibold text-white">What data we collect:</h3>
                    <ul className="list-disc mt-2 text-xl text-white">
                        <li className="mt-2">Personal information such as name and email address for verification purposes.</li>
                        <li className="mt-2">The product being reviewed and any associated details provided by the user.</li>
                        <li className="mt-2">User-generated content including reviews, ratings, and comments.</li>
                        <li className="mt-2">Information about the device and browser used to access the website for optimization purposes.</li>
                        <li className="mt-2">Data related to user interactions with our website for analytical purposes, such as page views and clicks.</li>
                    </ul>
                    <h3 className="text-3xl font-semibold mt-4 text-white">
                    How we prevent data breaches:
                    </h3>
                    <ul className="list-disc text-white mt-2 text-xl">
                        <li className="mt-2">Encryption: We use encryption methods to secure personal information and user-generated content, ensuring that even if data is intercepted, it remains unreadable to unauthorized parties.</li>
                        <li className="mt-2">Access Control: Restricted access to sensitive data is maintained through secure login systems and role-based access control, limiting access to only authorized personnel.</li>
                        <li className="mt-2">Regular Audits and Updates: We conduct regular security audits and keep our systems up to date with the latest security patches and protocols to prevent vulnerabilities.</li>
                        <li className="mt-2">Secure Hosting: Our website is hosted on secure servers with industry-standard security measures, including firewalls and intrusion detection systems.</li>
                        <li className="mt-2">User Education: We educate our users about the importance of strong passwords, phishing prevention, and safe browsing practices to reduce the risk of data breaches resulting from user error.</li>
                    </ul>
                </div>
                </div>

                <div className=" p-6 mb-8 text-white">
                <h2
                    className="text-4xl font-semibold cursor-pointer flex justify-between items-center transition-colors duration-300 ease-in-out text-white"
                    onClick={toggleBrand}
                >
                    Privacy Policy For Brands
                    <span className="transform rotate-0">
                    {brandExpanded ? '-' : '+'}
                    </span>
                </h2>
                <div
                    className={`mt-4 transition-all duration-300 ease-in-out ${
                    brandExpanded ? 'block' : 'hidden'
                    }`}
                >
                    <h3 className="text-3xl font-semibold text-white"> Collection and Use of Personal Information:</h3>
                    <ul className="list-disc text-white mt-2 text-xl">
                        <li className="mt-2">Information We Collect: We collect personal information such as name, email address, and contact details when you interact with our brand, subscribe to our newsletter, or make a purchase.</li>
                        <li className="mt-2">How We Use Your Information: We use the collected information to communicate with you, process your orders, provide customer support, and personalize your experience with our brand.</li>
                        <li className="mt-2">Sharing of Information: We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted partners and service providers who assist us in operating our website and conducting our business.</li>
                        <li className="mt-2">Data Security: We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</li>
                        <li className="mt-2">Your Choices: You have the right to access, correct, or delete your personal information at any time. You can also choose to opt-out of receiving marketing communications from us.</li>
                    </ul>
                    <h3 className="text-3xl font-semibold mt-4 text-white">
                    Use of Cookies and Tracking Technologies
                    </h3>
                    <ul className="list-disc text-white mt-2 text-xl">
                        <li className="mt-2">Use of Cookies: We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user behavior.</li>
                        <li className="mt-2">Types of Cookies: We use both session and persistent cookies. Session cookies are temporary and are deleted when you close your browser, while persistent cookies remain on your device for a set period.</li>
                        <li className="mt-2">Third-Party Cookies: We may also allow third-party service providers, such as Google Analytics, to use cookies on our website to gather information about your activities for analytics purposes.</li>
                        <li className="mt-2">Cookie Preferences: You can choose to accept or decline cookies through your browser settings. However, please note that disabling cookies may affect your experience on our website.</li>
                        <li className="mt-2">Updates to Privacy Policy: We may update our privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review our privacy policy periodically for any updates.</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
            </div>
  );
}
