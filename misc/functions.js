import { SNACKBAR_INITIAL_STATE } from "./constants";

export const handleSnackbarOpen = (message, setSnackbar) => {
  setSnackbar({ open: true, message });
};

export const handleSnackbarClose = (setSnackbar) => {
  setSnackbar(SNACKBAR_INITIAL_STATE);
};
