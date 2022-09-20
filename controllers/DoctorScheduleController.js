import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "./LocalStorageController";
export const WEEK_DAYS = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];
export const getSlotTimeAsString = ({ startTime, endTime }) => {
  return `${prettyTime(
    startTime.hour,
    startTime.minute,
    startTime.phase
  )} - ${prettyTime(endTime.hour, endTime.minute, endTime.phase)}`;
};

const processScheduleData = (schedule) => {
  const data = {};
  WEEK_DAYS.map((day) => {
    data[day] = schedule[day].map((item) => parseSlot(item));
  });
  return data;
};

const prettyTime = (hour, minute, phase) => {
  if (
    hour <= 0 ||
    hour > 12 ||
    minute < 0 ||
    minute > 59 ||
    (phase !== "AM" && phase !== "PM")
  ) {
    return "Invalid Time";
  }
  let hourString = `${hour >= 10 && hour <= 12 ? "" : "0"}${parseInt(hour)}`;
  let minuteString = `${minute >= 10 && minute <= 59 ? "" : "0"}${parseInt(
    minute
  )}`;
  return hourString + ":" + minuteString + " " + phase;
};

const parseTime = (time) => {
  const [hour, minute] = time.split(":");
  return {
    hour: hour > 12 ? hour - 12 : hour,
    minute,
    phase: hour >= 12 ? "PM" : "AM",
  };
};

const stringifyTime = (hour, minute, phase) => {
  const newHour = phase === "PM" ? parseInt(hour) + 12 : parseInt(hour);
  return `${newHour < 10 ? `0${newHour}` : newHour}:${minute}:00`;
};

const parseSlot = (slot) => {
  return {
    ...slot,
    startTime: parseTime(slot.startTime),
    endTime: parseTime(slot.endTime),
  };
};

export const getSchedule = async () => {
  const response = await axios.get(
    SERVER_PATH + "doctors/" + retrieveUserId() + "/schedule"
  );
  return processScheduleData(response.data);
};

export const getActiveSchedule = async (doctorId) => {
  const response = await axios.get(
    SERVER_PATH + "doctors/" + doctorId + "/schedule",
    {
      params: {
        status: "active",
      },
    }
  );
  return processScheduleData(response.data);
};

export const createSlot = async (dayCode, startTime, endTime) => {
  console.log(
    "start time",
    stringifyTime(startTime.hour, startTime.minute, startTime.phase)
  );
  const response = await axios.post(
    SERVER_PATH + "doctors/" + retrieveUserId() + "/schedule",
    {
      userId: retrieveUserId(),
      dayCode,
      startTimeString: stringifyTime(
        startTime.hour,
        startTime.minute,
        startTime.phase
      ),
      endTimeString: stringifyTime(endTime.hour, endTime.minute, endTime.phase),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );

  return response.data.map((item) => parseSlot(item));
};

export const enableSlot = async (slotId) => {
  const response = await axios.put(
    SERVER_PATH + "doctors/" + retrieveUserId() + "/schedule/" + slotId,
    { status: "ENABLED" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status === StatusCodes.OK;
};

export const disableSlot = async (slotId) => {
  const response = await axios.put(
    SERVER_PATH + "doctors/" + retrieveUserId() + "/schedule/" + slotId,
    { status: "DISABLED" },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status === StatusCodes.OK;
};
