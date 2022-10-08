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

export const retrieveMyDonations = async (page, limit) => {
  const { data } = await axios.get(
    SERVER_PATH + "users/" + retrieveUserId() + "/donations",
    {
      params: {
        page,
        limit,
      },
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return data;
};
