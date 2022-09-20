import { EMPTY_OR_WHITESPACE } from "../misc/constants";

export const validateField = (value) => {
  return EMPTY_OR_WHITESPACE.test(value);
};
