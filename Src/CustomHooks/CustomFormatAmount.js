const useCustomFormatAmount = amount => {
  if (amount >= 10000000) {
    return `${amount / 10000000}Cr`; // For Crore
  } else if (amount >= 100000) {
    return `${amount / 100000}L`; // For Lakh
  } else if (amount >= 1000) {
    return `${amount / 1000}K`; // For Thousand
  }
  return amount.toString();
};

export default useCustomFormatAmount;
