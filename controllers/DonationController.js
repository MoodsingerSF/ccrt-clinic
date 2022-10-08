import { EMPTY_OR_WHITESPACE } from "../misc/constants";

export const validateEmpty = (value) => {
  return EMPTY_OR_WHITESPACE.test(value);
};
