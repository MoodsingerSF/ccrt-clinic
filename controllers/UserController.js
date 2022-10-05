import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { Role } from "../enums/Role";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import { processDate } from "../misc/functions";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "./LocalStorageController";
const headers = () => ({
  "Content-Type": "application/json",
  Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
});

export const processUserDetails = (user) => {
  return {
    ...user,
    // profileImageUrl:
    //   "https://moodsinger.com/album-arts-m/be50b66f17dc4e689c4ed7c017247854/default.jpg",
    fullName: user.firstName + " " + user.lastName,
    specializations: user.specializations.map((item) => item.name),
  };
};
export const retrieveUserDetails = async (userId) => {
  const response = await axios.get(SERVER_PATH + "users/" + userId);
  console.log(response.data);
  return processUserDetails(response.data);
};

export const createAdmin = async (firstName, lastName, email, password) => {
  const data = { firstName, lastName, email, password };
  const response = await axios.post(SERVER_PATH + "users/admin", data, {
    headers: headers(),
  });
  return response.status === StatusCodes.OK;
};

export const retrievePendingDoctors = async (page = 0, limit = 15) => {
  const { data } = await axios.get(SERVER_PATH + "users/doctors", {
    params: {
      page,
      limit,
      status: "PENDING",
    },
  });
  return data.map((doctor) => processUserDetails(doctor));
};

export const retrieveFeeChangingRequests = async (
  page = 0,
  limit = 15,
  status
) => {
  const { data } = await axios.get(SERVER_PATH + "fee-changing-requests", {
    params: {
      page,
      limit,
      status,
    },
    headers: {
      Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
    },
  });
  return data;
};

export const acceptFeeRequest = async (requistId) => {
  const data = {
    status: "ACCEPTED",
    adminUserId: retrieveUserId(),
  };
  const response = await axios.put(
    SERVER_PATH + "fee-changing-requests/" + requistId,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response;
};

export const RejectFeeRequest = async (requistId) => {
  const data = {
    status: "REJECTED",
    adminUserId: retrieveUserId(),
  };
  const response = await axios.put(
    SERVER_PATH + "fee-changing-requests/" + requistId,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status;
};

export const acceptDoctorRequest = async (userId) => {
  const response = await axios.put(
    SERVER_PATH + "users/" + userId + "/verification-status",
    { verificationStatus: "ACCEPTED" },
    {
      headers: headers(),
    }
  );
  return response.status === 200;
};

export const rejectDoctorRequest = async (userId) => {
  const response = await axios.put(
    SERVER_PATH + "users/" + userId + "/verification-status",
    { verificationStatus: "REJECTED" },
    {
      headers: headers(),
    }
  );
  return response.status === 200;
};

export const updateFirstName = async (firstName) => {
  await axios.put(
    SERVER_PATH + "users/" + retrieveUserId(),
    { firstName },
    {
      headers: headers(),
    }
  );
};
export const updateLastName = async (lastName) => {
  await axios.put(
    SERVER_PATH + "users/" + retrieveUserId(),
    { lastName },
    {
      headers: headers(),
    }
  );
};
export const updateAbout = async (about) => {
  await axios.put(
    SERVER_PATH + "users/" + retrieveUserId(),
    { about },
    { headers: headers() }
  );
};

export const updateProfilePicture = async (profilePicture) => {
  const formData = new FormData();
  formData.append("image", profilePicture);
  const { data } = await axios.put(
    SERVER_PATH + "users/" + retrieveUserId() + "/profile-picture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return data;
};

export const retrieveAcceptedDoctors = async (page = 0, limit = 15) => {
  const { data } = await axios.get(SERVER_PATH + "users/doctors", {
    params: {
      page,
      limit,
      status: "ACCEPTED",
    },
  });
  return data.map((doctor) => processUserDetails(doctor));
};

export const feeChangingRequests = async (amount, previousAmount, userId) => {
  console.log("Amount", amount, "PreAm", previousAmount);
  const data = {
    amount,
    previousAmount,
    userId,
  };
  const response = await axios.post(
    SERVER_PATH + "fee-changing-requests",
    data,
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

export const addEducation = async (
  degree,
  subject,
  institutionName,
  startDate,
  endDate
) => {
  const data = {
    degree,
    subject,
    institutionName,
    startDate: processDate(startDate),
    endDate: processDate(endDate),
  };
  const response = await axios.post(
    SERVER_PATH + "users/" + retrieveUserId() + "/education",
    data,
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

export const updateEducation = async (
  degree,
  subject,
  institutionName,
  startDate,
  endDate,
  id
) => {
  const data = {
    degree,
    subject,
    institutionName,
    startDate: processDate(startDate),
    endDate: processDate(endDate),
  };
  const response = await axios.put(
    SERVER_PATH + "users/" + retrieveUserId() + "/education/" + id,
    data,
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

export const deleteEducation = async (Id) => {
  const response = await axios.delete(
    SERVER_PATH + "users/" + retrieveUserId() + "/education/" + Id,
    {
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status;
};
const processReport = (report) => {
  return { ...report };
};
const processReports = (reports) => {
  return reports.map((item) => processReport(item));
};

export const addReport = async (title, image) => {
  const form = new FormData();
  form.append("title", title);
  form.append("image", image);
  const { data } = await axios.post(
    SERVER_PATH + "users/" + retrieveUserId() + "/reports",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return processReport(data);
};
export const addTraining = async (
  program,
  institutionName,
  startDate,
  endDate
) => {
  const data = {
    program,
    institutionName,
    startDate: processDate(startDate),
    endDate: processDate(endDate),
  };
  const response = await axios.post(
    SERVER_PATH + "users/" + retrieveUserId() + "/training",
    data,
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

export const retrieveAllReports = async () => {
  const { data } = await axios.get(
    SERVER_PATH + "users/" + retrieveUserId() + "/reports",
    {
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return processReports(data);
};

export const updateTraining = async (
  id,
  institutionName,
  program,
  startDate,
  endDate
) => {
  const data = {
    program,
    institutionName,
    startDate: processDate(startDate),
    endDate: processDate(endDate),
  };
  const response = await axios.put(
    SERVER_PATH + "users/" + retrieveUserId() + "/training/" + id,
    data,
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

export const deleteTraining = async (Id) => {
  const response = await axios.delete(
    SERVER_PATH + "users/" + retrieveUserId() + "/training/" + Id,
    {
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status;
};

export const addExperience = async (
  title,
  organization,
  department = null,
  division = null,
  startDate,
  endDate
) => {
  const data = {
    title,
    organization,
    division: division ? division : null,
    department: department ? department : null,
    startDate: processDate(startDate),
    endDate: processDate(endDate),
  };
  const response = await axios.post(
    SERVER_PATH + "users/" + retrieveUserId() + "/experience",
    data,
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

export const updateExperience = async (
  id,
  title,
  organization,
  department = null,
  division = null,
  startDate,
  endDate
) => {
  const data = {
    title,
    organization,
    division: division ? division : null,
    department: department ? department : null,
    startDate: processDate(startDate),
    endDate: processDate(endDate),
  };
  const response = await axios.put(
    SERVER_PATH + "users/" + retrieveUserId() + "/experience/" + id,
    data,
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

export const deleteExperience = async (Id) => {
  const response = await axios.delete(
    SERVER_PATH + "users/" + retrieveUserId() + "/experience/" + Id,
    {
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status;
};

export const addAward = async (name, year) => {
  const data = {
    name,
    year,
  };
  const response = await axios.post(
    SERVER_PATH + "users/" + retrieveUserId() + "/award",
    data,
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

export const deleteAward = async (Id) => {
  const response = await axios.delete(
    SERVER_PATH + "users/" + retrieveUserId() + "/award/" + Id,
    {
      headers: {
        Authorization:
          AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
      },
    }
  );
  return response.status;
};

export const updateReport = async (resourceId, image) => {
  const form = new FormData();
  form.append("image", image);
  const { data } = await axios.put(
    SERVER_PATH + "users/" + retrieveUserId() + "/reports/" + resourceId,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return processReport(data);
};

export const updateAward = async (name, year, id) => {
  const data = {
    name,
    year,
  };
  const response = await axios.put(
    SERVER_PATH + "users/" + retrieveUserId() + "/award/" + id,
    data,
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

export const updatePassword = async (prevPassword, newPassword) => {
  const { data } = await axios.put(
    SERVER_PATH + "users/" + retrieveUserId() + "/password",
    { previousPassword: prevPassword, password: newPassword },
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

export const findUserByEmail = async (email) => {
  const { data } = await axios.get(SERVER_PATH + "users", {
    params: { email },
  });
  return processUserDetails(data);
};

export const resetPassword = async (userId, code, newPassword) => {
  const { data } = await axios.put(
    SERVER_PATH + "users/" + userId + "/password-reset",
    { resetPasswordToken: code, password: newPassword },
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};

export const sendPasswordResetCode = async (userId) => {
  const { data } = await axios.post(
    SERVER_PATH + "users/" + userId + "/password-reset-verification-code",
    null,
    { headers: { "Content-Type": "application/json" } }
  );
  return data;
};

export const isGuest = (role) =>
  role !== Role.ADMIN && role !== Role.USER && role !== Role.DOCTOR;
