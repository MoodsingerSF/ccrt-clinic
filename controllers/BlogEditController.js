// import axios from "axios";
// import { SERVER_PATH } from "../misc/constants";

export const isBlogTitleCorrect = (title) => {
  return title !== "";
};
export const isTagListCorrect = (tagList) => {
  return tagList.length > 0;
};

export const isCoverPhotoCorrect = (photo) => {
  return photo !== null;
};

// export const createBlog = async (title, description) => {
//   try {
//     const response = await axios.post(SERVER_PATH + "blogs");
//   } catch (error) {}
// };
