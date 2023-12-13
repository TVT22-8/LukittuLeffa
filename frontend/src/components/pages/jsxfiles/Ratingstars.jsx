import React from 'react';
import { StarFill } from 'react-bootstrap-icons';

const RatingStars = ({ rating }) => {
  const stars = Array.from({ length: 10 }, (_, index) => index + 1 <= rating);

  return (
    <div>
      {stars.map((isFilled, index) => (
        <StarFill key={index} color={isFilled ? 'gold' : 'lightgray'} size={24} />
      ))}
    </div>
  );
};

export default RatingStars;
