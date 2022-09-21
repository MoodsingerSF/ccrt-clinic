import { EMPTY_OR_WHITESPACE, NUMBER_REGEX } from "../misc/constants";

export const validateInput = (name) => {
  return EMPTY_OR_WHITESPACE.test(name);
};

export const validateDate = (date) => {
  return date === null || date === undefined;
};

export const validateYear = (year) => {
  return NUMBER_REGEX.test(year);
};
