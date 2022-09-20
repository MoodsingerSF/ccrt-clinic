import { SNACKBAR_INITIAL_STATE } from "./constants";

export const handleSnackbarOpen = (message, setSnackbar) => {
  setSnackbar({ open: true, message });
};

export const handleSnackbarClose = (setSnackbar) => {
  setSnackbar(SNACKBAR_INITIAL_STATE);
};

export const processDate = (date) => {
  if (date == null) return null;
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}-${month <= 9 ? "0" : ""}${month}-${
    day <= 9 ? "0" : ""
  }${day}`;
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
