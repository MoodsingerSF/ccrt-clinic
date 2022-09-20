import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { AUTHORIZATION_HEADER_PREFIX, SERVER_PATH } from "../misc/constants";
import {
  retrieveAuthorizationToken,
  retrieveUserId,
} from "./LocalStorageController";
const headers = () => ({
  "Content-Type": "application/json",
  Authorization: AUTHORIZATION_HEADER_PREFIX + retrieveAuthorizationToken(),
});

const processUserDetails = (user) => {
  return {
    ...user,
    profileImageUrl:
      "https://moodsinger.com/album-arts-m/be50b66f17dc4e689c4ed7c017247854/default.jpg",
    fullName: user.firstName + " " + user.lastName,
    patient_served: 0,
    department: "Oncology",
    specialization: "Oncology",
    patient_count: 0,
    degree: " MBBS, FCPS (Surgery)",
    specializations: user.specializations.map((item) => item.name),
    education: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac augue imperdiet, porttitor urna in, accumsan nisl. Integer aliquet ex eu libero pulvinar blandit. Sed sodales urna ac eleifend suscipit. Quisque eget sollicitudin augue. Fusce pharetra dui non risus dapibus, quis efficitur ipsum congue. Fusce ut lobortis ligula. Nullam eget nisi urna. Sed ac viverra lacus. Quisque ultricies ac ex sit amet faucibus.`,
    experience: `Cras purus lorem, aliquet non ornare nec, cursus at neque. Phasellus egestas cursus nisi ut porttitor. Maecenas suscipit orci vitae luctus elementum. Sed suscipit dolor in lorem sollicitudin, id rhoncus nibh feugiat. Praesent a dolor malesuada mauris hendrerit venenatis sit amet nec massa. Integer rutrum eros eget purus laoreet, suscipit finibus purus pellentesque.`,
  };
};
export const retrieveUserDetails = async (userId) => {
  const response = await axios.get(SERVER_PATH + "users/" + userId);
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
