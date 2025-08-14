export const formatNaira = (amount) => {
  // Handle edge cases
  if (!amount || isNaN(amount) || amount < 0) return '₦0.00';
  
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};