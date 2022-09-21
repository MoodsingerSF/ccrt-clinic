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
