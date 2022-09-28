import axios from "axios";
import { SERVER_PATH } from "../misc/constants";

export const retrieveDoctorsFilter = async (paramsId) => {
  const { data } = await axios.get(SERVER_PATH + "misc/popular-doctors", {
    params: {
      specialization: paramsId,
    },
  });
  return data;
};
