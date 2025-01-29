const useCustomFormatAmount = amount => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return ''; // Return a placeholder for invalid inputs
  }
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
