import axios from "axios";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "./LocalStorageController";

export const createDonationRequest = async (
  phoneNo,
  disease,
  amount,
  description
) => {
  const requestData = {
    requestorUserId: retrieveUserId(),
    phoneNo,
    disease,
    amount,
    description,
  };
  const { data } = await axios.post(
    SERVER_PATH + "donation-requests",
    requestData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return data;
};

export const retrieveDonationRequests = async (
  page,
  limit,
  requestStatus,
  completionStatus
) => {
  const { data } = await axios.get(SERVER_PATH + "donation-requests", {
    params: {
      page,
      limit,
      "request-status": requestStatus,
      "completion-status": completionStatus,
    },
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
  return data;
};

export const acceptDonationRequest = async (requestId) => {
  const { data } = await axios.put(
    SERVER_PATH + "/donation-requests/" + requestId + "/request-status",
    { requestStatus: "ACCEPTED" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return data;
};

export const rejectDonationRequest = async (requestId) => {
  const { data } = await axios.put(
    SERVER_PATH + "/donation-requests/" + requestId + "/request-status",
    { requestStatus: "REJECTED" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return data;
};

export const endDonationRequest = async (requestId) => {
  const { data } = await axios.put(
    SERVER_PATH + "/donation-requests/" + requestId + "/completion-status",
    { completionStatus: "COMPLETE" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return data;
};

export const retrieveUserDonationRequests = async (page, limit) => {
  const { data } = await axios.get(
    SERVER_PATH + "users/" + retrieveUserId() + "/donation-requests",
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
