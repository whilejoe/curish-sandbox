// Format phone number for auth0 passwordless sms login
export const formatNumber = phone => {
  if (!phone) return;
  const stripped = phone.replace(/\D/g, '');
  const withCountryCode = `+1${stripped}`;
  return withCountryCode;
};

// abyss-forms validator
export const validatePhone = phone => {
  if (!phone) return;
  const preparedPhone = formatNumber(phone);
  const rgx = /^\+[0-9]{1,15}$/;
  const isValid = rgx.test(preparedPhone);
  console.log('isValid phone number', isValid);
  return !isValid;
};
