import axios from "axios";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import { retrieveAuthorizationToken } from "./LocalStorageController";

export const addCover = async ({ type, itemId }) => {
  const data = {
    type,
    itemId,
  };
  const response = await axios.post(SERVER_PATH + "home-covers", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
  return response.data;
};

export const retrieveAllCovers = async (type = "NON_VISIBLE") => {
  const { data } = await axios.get(SERVER_PATH + "home-covers", {
    params: { type },
  });
  return data.map((item) => ({
    ...item,
    link:
      item.type === "BLOG"
        ? "http://localhost:3000/blogs/" + item.itemId
        : "http://localhost:3000/doctors/" + item.itemId,
  }));
};

export const deleteCover = async (coverId) => {
  await axios.delete(SERVER_PATH + "home-covers/" + coverId, {
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
};

export const visibleCover = async (coverId, visibilityType) => {
  const data = { visibilityType };
  await axios.put(SERVER_PATH + "home-covers/" + coverId, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
};
