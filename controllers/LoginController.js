import axios from "axios";
import { SERVER_PATH } from "../misc/constants";

export const login = async (email, password) => {
  const data = { email, password };
  const response = await axios.post(SERVER_PATH + "login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
