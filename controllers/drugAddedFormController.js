import { EMPTY_OR_WHITESPACE } from "../misc/constants";

export const validateInput = (name) => {
  return EMPTY_OR_WHITESPACE.test(name);
};
