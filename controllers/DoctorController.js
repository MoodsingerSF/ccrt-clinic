import axios from "axios";
import { SERVER_PATH } from "../misc/constants";
import { processUserDetails } from "./UserController";

export const retrieveDoctorsBySpecialization = async (
  page,
  limit,
  specializationId,
  cancelToken
) => {
  const { data } = await axios.get(SERVER_PATH + "misc/popular-doctors", {
    cancelToken: cancelToken,
    params: {
      page,
      limit,
      specialization: specializationId,
    },
  });
  return data.map((doctor) => processUserDetails(doctor));
};

export const retrieveAllSpecializations = async (page, limit) => {
  const { data } = await axios.get(SERVER_PATH + "specializations", {
    params: { page, limit },
  });
  return data;
};
