import axios from "axios";
import { SERVER_PATH } from "../misc/constants";

export const retrieveLastAppointmentDates = async (slotId) => {
  const { data } = await axios.get(
    SERVER_PATH + "slots/" + slotId + "/appointments",
    { params: { limit: 5 } }
  );
  return data.map((item) => item.date);
};
