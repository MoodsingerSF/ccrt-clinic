import axios from "axios";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "./LocalStorageController";

export const getReatingCriteria = async () => {
  const response = await axios.get(SERVER_PATH + "rating_criteria");
  return response;
};

export const postUserRating = async (doctorId, ratings) => {
  const data = { ratingGiverUserId: retrieveUserId(), ratings };
  const response = await axios.post(
    SERVER_PATH + "users/" + doctorId + "/rating",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response;
};

export const retriveAverageRating = async (doctorId) => {
  const response = await axios.get(
    SERVER_PATH + "users/" + doctorId + "/rating"
  );
  return response;
};

// export const retriveUserRatingGivenDoctor = (doctorId) => {
//   const response = axios.get(SERVER_PATH + "users/" + doctorId + "/rating", {
//     params: {
//       rater: retrieveUserId(),
//     },
//   });
//   return response;
// };
