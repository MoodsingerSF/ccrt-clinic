import axios from "axios";
import { Role } from "../enums/Role";
import { EMAIL_REGEX, NAME_REGEX, SERVER_PATH } from "../misc/constants";

const MINIMUM_PASSWORD_LENGTH = 6;

export const USER_TYPES = [Role.USER, Role.USER];
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
  password
) => {
  const data = { userType, firstName, lastName, email, password };
  const response = await axios.post(SERVER_PATH + "users", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
