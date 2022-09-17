import { EMPTY_OR_WHITESPACE, NUMBER_REGEX } from "../misc/constants";

export const numberInput = (number) => {
  return NUMBER_REGEX.test(number);
};
export const validateInput = (name) => {
  return EMPTY_OR_WHITESPACE.test(name);
};
