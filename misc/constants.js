export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_REGEX = /^[a-zA-Z\- ]+$/;
export const EMPTY_OR_WHITESPACE = /^\s*$/;
export const NUMBER_REGEX = /^-?\d+\.?\d*$/;
export const BIRTHDATE_REGEX =
  /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
export const SERVER_PATH = "http://127.0.0.1:8080/";
export const SNACKBAR_INITIAL_STATE = { open: false, message: "" };
export const SNACKBAR_TIMEOUT = 6000;
export const AUTHORIZATION_HEADER_PREFIX = "Bearer ";
const modalAppBarHeight = 8;
export const MODAL_APP_BAR_HEIGHT = `${modalAppBarHeight}vh`;
export const MODAL_CONTENT_CONTAINER_HEIGHT = `${100 - modalAppBarHeight}vh`;
export const DOMAIN_ADDRESS = "http://localhost:3000/";
export const DASHBOARD_TITLE_MARGIN_TOP = 25;
export const DAY_CODES = {
  saturday: "SAT",
  sunday: "SUN",
  monday: "MON",
  tuesday: "TUE",
  wednesday: "WED",
  thursday: "THU",
  friday: "FRI",
};
