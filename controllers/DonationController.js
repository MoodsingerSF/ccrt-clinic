import axios from "axios";
import {
  AUTHORIZATION_HEADER_PREFIX,
  EMPTY_OR_WHITESPACE,
  SERVER_PATH,
} from "../misc/constants";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "./LocalStorageController";

export const validateEmpty = (value) => {
  return EMPTY_OR_WHITESPACE.test(value);
};
