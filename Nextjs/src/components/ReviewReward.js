// components/ReviewCard.js

const ReviewCard = ({ review }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex">
        {review.image && (
          <img src={review.image} alt={review.title} className="w-32 h-32 object-cover rounded-md mr-4" />
        )}
        <div>
          <h2 className="text-xl font-semibold mb-2">{review.title}</h2>
          <p className="text-gray-600 mb-2">Rating: {review.rating}</p>
          <p className="text-gray-800 ">{review.content}</p>
        </div>
      </div>
    );
  };
  
  export default ReviewCard;
  