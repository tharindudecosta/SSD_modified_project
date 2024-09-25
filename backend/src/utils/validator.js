const isValidString = (string) => {
  return string.length > 0;
};

const isValidCurrencyAmount = (currency) => {
  const regex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
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
    /^\+?(\d{1,4})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return regex.test(number);
};

const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
;
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
