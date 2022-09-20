import { EMPTY_OR_WHITESPACE, BIRTHDATE_REGEX } from "../misc/constants";

export const validateInput = (name) => {
  return EMPTY_OR_WHITESPACE.test(name);
};

export const validateDate = (date) => {
  return date === null || date === undefined;
};
