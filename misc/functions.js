import { SNACKBAR_INITIAL_STATE } from "./constants";

export const handleSnackbarOpen = (message, setSnackbar) => {
  setSnackbar({ open: true, message });
};

export const handleSnackbarClose = (setSnackbar) => {
  setSnackbar(SNACKBAR_INITIAL_STATE);
};

export const processDate = (date) => {
  if (date === null) return null;
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${date.getFullYear()}-${month <= 9 ? "0" : ""}${month}-${
    day <= 9 ? "0" : ""
  }${day}`;
};

export const errorHandler = (error, openSnackbar) => {
  if (error && error.response) {
    const { data } = error.response;
    if (data && data.message) {
      openSnackbar(data.message);
    } else {
      openSnackbar("Something went wrong. Please try again later.");
    }
  } else {
    openSnackbar("Something went wrong. Please try again later.");
  }
};

export const processShowDate = (date) => {
  if (date == null) return null;
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${day <= 9 ? "0" : ""}${day}/${
    month <= 9 ? "0" : ""
  }${month}/${year}`;
};

export const getAgeFromBirthDate = (birthDate) => {
  if (!birthDate) return 0;
  const currYear = new Date().getFullYear();
  const birthYear = birthDate.split("-")[0];
  return currYear - birthYear;
};
