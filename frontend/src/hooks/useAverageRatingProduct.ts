import { useState, useEffect } from "react";

export const useAverageRatingProduct = (ratings: number[] = []) => {
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (ratings.length === 0) {
      setAverageRating(0);
      return;
    }

    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = total / ratings.length;
    setAverageRating(Math.round(average));
  }, [ratings]);

  return {
    averageRating,
  };
};
