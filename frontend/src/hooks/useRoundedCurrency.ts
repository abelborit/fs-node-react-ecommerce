export const useRoundedCurrency = () => {
  const handleFormattedValue = (value: number): string => {
    const roundedValue = Math.round(value);

    return roundedValue.toFixed(2);
  };

  return {
    handleFormattedValue,
  };
};
