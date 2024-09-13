const isValidString = (string) => {
  return string.length > 0;
};

const isValidCurrencyAmount = (currency) => {
  // Change currency validation regex
  const regex = /^[1-9]\d*(\.\d+)?$/;
  return regex.test(currency);
};

const isValidDate = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
};

const isValidNumber = (number) => {
  const regex = /^-?\d+$/;
  return regex.test(number);
};

const isValidPhoneNumber = (number) => {
  const regex =
    /\s*(?:\+?(\d{1,3}))?[\W\D\s]^|()*(\d[\W\D\s]*?\d[\D\W\s]*?\d)[\W\D\s]*(\d[\W\D\s]*?\d[\D\W\s]*?\d)[\W\D\s]*(\d[\W\D\s]*?\d[\D\W\s]*?\d[\W\D\s]*?\d)(?: *x(\d+))?\s*$/gm;
  return regex.test(number);
};

const isValidEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(password);
};

export {
  isValidString,
  isValidCurrencyAmount,
  isValidDate,
  isValidNumber,
  isValidPhoneNumber,
  isValidEmail,
  isValidPassword,
};
