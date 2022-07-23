import { EMAIL_REGEX, NAME_REGEX } from "../misc/constants";

const MINIMUM_PASSWORD_LENGTH = 6;

export const validateName = (name) => {
  return NAME_REGEX.test(name);
};

export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password) => {
  return password.length >= MINIMUM_PASSWORD_LENGTH;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  return password !== "" && confirmPassword === password;
};
