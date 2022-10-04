import axios from "axios";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import { prettyDate } from "./DateController";
import { stringifySlot } from "./DoctorScheduleController";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "./LocalStorageController";

export const retrieveLastAppointmentDates = async (slotId) => {
  const { data } = await axios.get(
    SERVER_PATH + "slots/" + slotId + "/appointments",
    { params: { limit: 5 } }
  );
  return data.map((item) => item.date);
};

export const createAppointment = async (slotId, date) => {
  const response = await axios.post(
    SERVER_PATH + "slots/" + slotId + "/appointments",
    {
      patientUserId: retrieveUserId(),
      date,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );

  return response.data;
};

export const retrieveAppointmentResources = async (appointmentId) => {
  const response = await axios.get(
    SERVER_PATH + "appointments/" + appointmentId + "/resources",
    {
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.data;
};

export const endAppointment = async (appointmentId, code) => {
  const response = await axios.post(
    SERVER_PATH + "appointments/" + appointmentId + "/end",
    { code, userId: retrieveUserId() },
    {
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status === 200;
};

export const cancelAppointment = async (appointmentId) => {
  const response = await axios.post(
    SERVER_PATH + "appointments/" + appointmentId + "/cancel",
    { userId: retrieveUserId() },
    {
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status === 200;
};

export const addAppointmentResource = async (appointmentId, title, image) => {
  const form = new FormData();
  form.append("title", title);
  form.append("image", image);
  const response = await axios.post(
    SERVER_PATH + "appointments/" + appointmentId + "/resources",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.data;
};

export const updateAppointmentResource = async (
  appointmentId,
  resourceId,
  image
) => {
  const form = new FormData();
  form.append("userId", retrieveUserId());
  form.append("image", image);
  const response = await axios.put(
    SERVER_PATH + "appointments/" + appointmentId + "/resources/" + resourceId,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.data;
};

const processAppointmentDetails = (appointment) => {
  return {
    ...appointment,
    fee: appointment.fee.amount,
    creationTime: prettyDate(appointment.creationTime),
    timeSlot: stringifySlot(appointment.slot),
  };
};

const processAppointments = (appointments) => {
  return appointments.map((item) => processAppointmentDetails(item));
};
export const retrieveAppointmentsOfAnUser = async (
  page,
  limit,
  date,
  status
) => {
  const response = await axios.get(
    SERVER_PATH + "users/" + retrieveUserId() + "/appointments",
    {
      params: {
        page,
        limit,
        date,
        status,
      },
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return processAppointments(response.data);
};

export const createPrescription = async (appointmentId, advice, drugs) => {
  const medications = drugs.map((item) => ({
    medicineName: item.drugName,
    hasFixedScheduleRelatedToPhaseOfDay: item.perDayRule === "",
    schedule: item.perDayRule,
    timeGapWithMeal: "30 Minutes",
    relationWithMeal: "AFTER",
    takeInMorning: item.morning,
    takeInNoon: item.noon,
    takeInNight: item.night,
    duration: item.duration.value + " " + item.duration.unit,
    advice: null,
  }));
  const response = await axios.post(
    SERVER_PATH + "appointments/" + appointmentId + "/prescription",
    { advice, medications },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.data;
};

const processPrescription = (data) => {
  return {
    advice: data.advice,
    medications: data.medications.map((item) => {
      console.log(item.duration);
      const durationSplit = item.duration.split(" ");
      return {
        drugName: item.medicineName,
        perDayRule: item.hasFixedScheduleRelatedToPhaseOfDay
          ? null
          : item.schedule,
        morning: item.takeInMorning,
        noon: item.takeInNoon,
        night: item.takeInNight,
        duration: {
          value: durationSplit[0],
          unit: durationSplit[1],
        },
      };
    }),
  };
};

export const retrievePrescription = async (appointmentId) => {
  const response = await axios.get(
    SERVER_PATH + "appointments/" + appointmentId + "/prescription",
    {
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return processPrescription(response.data);
};
