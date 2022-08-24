import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "./LocalStorageController";

export const retrieveUserDetails = async () => {
  const response = await axios.get(SERVER_PATH + "users/" + retrieveUserId(), {
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
  return response;
};

export const createAdmin = async (firstName, lastName, email, password) => {
  const data = { firstName, lastName, email, password };
  const response = await axios.post(SERVER_PATH + "users/admin", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
  return response.status === StatusCodes.OK;
};

export const retrievePendingDoctors = async () => {
  const { data } = await axios.get(SERVER_PATH + "users/doctors", {
    params: {
      status: "PENDING",
    },
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
  return data.map((doctor) => ({
    ...doctor,
    profileImageUrl:
      "https://moodsinger.com/album-arts-m/be50b66f17dc4e689c4ed7c017247854/default.jpg",
  }));
};

export const acceptDoctorRequest = async (userId) => {
  const response = await axios.put(
    SERVER_PATH + "users/" + userId + "/verification-status",
    { verificationStatus: "ACCEPTED" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status === 200;
};

export const rejectDoctorRequest = async (userId) => {
  const response = await axios.put(
    SERVER_PATH + "users/" + userId + "/verification-status",
    { verificationStatus: "REJECTED" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status === 200;
};
