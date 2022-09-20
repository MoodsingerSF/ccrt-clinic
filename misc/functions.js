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
