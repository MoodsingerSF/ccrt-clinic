import axios from "axios";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import { retrieveAuthorizationToken } from "./LocalStorageController";

export const createSuggestion = async (name, email, message) => {
  const { data } = await axios.post(
    SERVER_PATH + "suggestions",
    { name, email, message },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};

export const retrieveSuggestions = async (page, limit) => {
  const { data } = await axios.get(SERVER_PATH + "suggestions", {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
  console.log(data);
  return data;
};
