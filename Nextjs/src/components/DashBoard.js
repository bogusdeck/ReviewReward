// pages/Dashboard.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ReviewCard from '../components/ReviewCard'; // Assuming you have a ReviewCard component
import { UserAuth } from '../app/context/AuthContext';

const Dashboard = () => {
  const router = useRouter();
  const {user , googleSignIn,logOut}=UserAuth();
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    
    fetch('/api/user/reviews') // You need to define this API route
      .then(response => response.json())
      .then(data => setUserReviews(data))
      .catch(error => console.error('Error fetching user reviews:', error));
  }, []);

  return (
    
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Your Reviews</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    
  );
};

export default Dashboard;