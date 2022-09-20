import {
  EMAIL_REGEX,
  NAME_REGEX,
  EMPTY_OR_WHITESPACE,
} from "../misc/constants";

export const validateName = (name) => {
  return NAME_REGEX.test(name);
};

export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const validateDescription = (description) => {
  return description !== "";
};

export const validateTitle = (title) => {
  return EMPTY_OR_WHITESPACE.test(title);
};
