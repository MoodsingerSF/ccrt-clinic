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

export const formErrors = {
  name: "Name should contain only english alphabet, -, _ and whitespace",
  email: "Email address is not valid",
  password: "Password must be at-least 6 characters long",
  confirmPassword: "Passwords haven't matched",
  policy: "You have to accept our policy to create an account.",
};
