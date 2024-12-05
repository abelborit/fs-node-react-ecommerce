import { useState } from "react";

export const useRatingProduct = (initialRating: number = 0) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleStarRating = (value: number) => {
    if (value === rating) {
      /* Si selecciona la misma estrella se reduce el rating en 1 */
      setRating(rating - 1);
    } else if (value >= 0 && value <= 5) {
      setRating(value);
    }
  };

  const clearRating = () => {
    setRating(0);
  };

  return {
    rating,
    handleStarRating,
    clearRating,
  };
};
