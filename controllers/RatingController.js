import axios from "axios";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "./LocalStorageController";

const processRatingData = (ratings) => {
  const data = {
    ratingGiverUserId: retrieveUserId(),
    ratings: ratings.map(({ id, rating }) => ({ criteriaId: id, rating })),
  };
  return data;
};
export const getRatingCriteria = async () => {
  const response = await axios.get(SERVER_PATH + "rating_criteria");
  return response;
};

export const postUserRating = async (doctorId, ratings) => {
  const response = await axios.post(
    SERVER_PATH + "users/" + doctorId + "/rating",
    processRatingData(ratings),
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

export const updateUserRating = async (doctorId, ratings) => {
  const response = await axios.put(
    SERVER_PATH + "users/" + doctorId + "/rating",
    processRatingData(ratings),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  // console.log(response);
  return response;
};

export const retrieveAverageRating = async (doctorId) => {
  const response = await axios.get(
    SERVER_PATH + "users/" + doctorId + "/rating"
  );
  return response;
};

export const retrieveUserRatingGivenToDoctor = async (doctorId) => {
  const { data } = await axios.get(
    SERVER_PATH + "users/" + doctorId + "/rating",
    {
      params: {
        rater: retrieveUserId(),
      },
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );

  if (data.ratings.length === 0) {
    const newArr = data.criteria.map((item) => ({
      id: item.id,
      rating: 0,
      criteriaTitle: item.title,
      maxValue: item.maxValue,
    }));
    return { isRatingAlreadyGiven: false, data: newArr };
  } else {
    const newArr = data.ratings.map((item) => ({
      ...item.ratingCriteria,
      rating: item.rating,
    }));

    return { isRatingAlreadyGiven: true, data: newArr };
  }
};
