import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import { retrieveAuthorizationToken } from "./LocalStorageController";
const processBlogData = (data) => {
  return {
    ...data,
    fullName: data.creator.firstName + " " + data.creator.lastName,
    tags: extractTagNames(data.tags),
    avatar: data.creator.profileImageUrl,
    imageUrl:
      "https://moodsinger.com/album-arts-m/be50b66f17dc4e689c4ed7c017247854/default.jpg",
  };
};
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
  return { status: response.status, data: processBlogData(response.data) };
};

export const updateBlog = async (
  blogId,
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
  const response = await axios.put(SERVER_PATH + "blogs/" + blogId, formData, {
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      "Content-Type": "multipart/form-data",
    },
  });
  return { status: response.status, data: processBlogData(response.data) };
};

const extractTagNames = (tags) => {
  return tags.map((item) => item.name);
};

export const getPendingBlogs = async (page = 0, limit = 15) => {
  const { data } = await axios.get(SERVER_PATH + "blogs", {
    params: {
      status: "PENDING",
      page,
      limit,
    },
  });
  const { blogs, totalBlogs } = data;
  return { blogs: blogs.map((item) => processBlogData(item)), totalBlogs };
};

export const getAcceptedBlogs = async (page = 0, limit = 15) => {
  const { data } = await axios.get(SERVER_PATH + "blogs", {
    params: {
      status: "ACCEPTED",
      page,
      limit,
    },
  });
  const { blogs, totalBlogs } = data;
  return { blogs: blogs.map((item) => processBlogData(item)), totalBlogs };
};

const blogRequestHandler = async (blogId, status) => {
  const response = await axios.put(
    SERVER_PATH + "blogs/" + blogId + "/verification-status",
    { verificationStatus: status },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status === StatusCodes.OK;
};
export const acceptBlog = async (blogId) => {
  const res = await blogRequestHandler(blogId, "ACCEPTED");
  return res;
};

export const rejectBlog = async (blogId) => {
  const res = await blogRequestHandler(blogId, "REJECTED");
  return res;
};

export const retrieveBlogDetails = async (blogId) => {
  const response = await axios.get(SERVER_PATH + "blogs/" + blogId);
  return {
    status: response.status,
    data: processBlogData(response.data),
  };
};

export const retrieveUserBlogs = async (userId, page, limit) => {
  const response = await axios.get(SERVER_PATH + "users/" + userId + "/blogs", {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
  return {
    status: response.status,
    data: response.data.map((item) => processBlogData(item)),
  };
};

export const deleteBlog = async (blogId) => {
  const response = await axios.delete(SERVER_PATH + "blogs/" + blogId, {
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
  return response.status === StatusCodes.NO_CONTENT;
};
