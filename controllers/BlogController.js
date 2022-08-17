import axios from "axios";
import { VerificationStatus } from "../enums/VerificationStatus";
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

export const getPendingBlogs = async (page = 0, limit = 15) => {
  console.log(VerificationStatus.PENDING.value);
  const { data } = await axios.get(SERVER_PATH + "blogs", {
    params: {
      status: VerificationStatus.PENDING.value,
      page,
      limit,
    },
  });
  return data;
};

export const getAcceptedBlogs = async (page = 0, limit = 15) => {
  console.log(VerificationStatus.ACCEPTED.value);
  const { data } = await axios.get(SERVER_PATH + "blogs", {
    params: {
      status: VerificationStatus.ACCEPTED.value,
      page,
      limit,
    },
  });
  return data;
};
