import axios from "axios";
import { SERVER_PATH } from "../misc/constants";

export const searchSpecializations = async (cancelToken, prefix) => {
  const { data } = await axios({
    method: "GET",
    url: SERVER_PATH + "specializations/search",
    params: { prefix },
    cancelToken: new axios.CancelToken((e) => (cancelToken.current = e)),
  });
  return data;
};

export const retrievePopularSpecializations = async (page = 0, limit = 0) => {
  const { data } = await axios({
    method: "GET",
    url: SERVER_PATH + "misc/popular-specializations",
    params: { page, limit },
  });
  return data;
};
