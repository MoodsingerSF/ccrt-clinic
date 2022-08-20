import { EMAIL_REGEX, NAME_REGEX } from "../misc/constants";

export const validateName = (name) => {
  return NAME_REGEX.test(name);
};

export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const validateDescription = (description) => {
  return description !== "";
};
