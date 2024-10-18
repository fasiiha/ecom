// components/Rating.js
import { useState } from "react";

const Rating = ({ totalStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleRating(index)}
        />
      ))}
    </div>
  );
};

const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    className="w-4 h-4 sm:w-6 sm:h-6"
    viewBox="0 0 24 24"
    fill={filled ? "#384353" : "rgba(124, 127, 132, 0.5)"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default Rating;
