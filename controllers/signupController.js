import axios from "axios";
import {
  BIRTHDATE_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  NUMBER_REGEX,
  SERVER_PATH,
} from "../misc/constants";

const MINIMUM_PASSWORD_LENGTH = 6;

export const USER_TYPES = ["USER", "DOCTOR"];
export const USER_GENDERS = ["Male", "Female", "Others"];
export const validateName = (name) => {
  return NAME_REGEX.test(name);
};

export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password) => {
  return password.length >= MINIMUM_PASSWORD_LENGTH;
};

export const validateConfirmPassword = (confirmPassword, password) => {
  return password !== "" && confirmPassword === password;
};

export const validateBirthDate = (birthDate) => {
  return BIRTHDATE_REGEX.test(birthDate);
};

export const validateFee = (fee) => {
  return NUMBER_REGEX.test(fee);
};

export const sendOtp = async (email) => {
  const data = { email };
  const response = await axios.post(SERVER_PATH + "otp", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const verifyOtp = async (otpId, code) => {
  const data = { otpId, code };
  const response = await axios.post(SERVER_PATH + "otp/validation", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const signUp = async (
  userType,
  firstName,
  lastName,
  email,
  password,
  gender,
  birthDate,
  specializationList,
  fee
) => {
  const data = {
    userType,
    firstName,
    lastName,
    email,
    password,
    gender,
    birthDate,
    specializationList,
    fee,
  };
  const response = await axios.post(SERVER_PATH + "users", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
