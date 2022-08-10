import axios from "axios";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import { retrieveAuthorizationToken } from "./LocalStorageController";

export const isBlogTitleCorrect = (title) => {
  return title !== "";
};
export const isTagListCorrect = (tagList) => {
  return tagList.length > 0;
};

export const isCoverPhotoCorrect = (photo) => {
  return photo !== null;
};

export const createBlog = async (
  title,
  description,
  creatorUserId,
  image,
  tags
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("creatorUserId", creatorUserId);
  formData.append("image", image);
  formData.append("tagStrings", tags.join(","));
  const response = await axios.post(SERVER_PATH + "blogs", formData, {
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
