import { IconButton, Snackbar } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { SNACKBAR_TIMEOUT } from "../../misc/constants";
import CloseIcon from "@mui/icons-material/Close";
import { createStyles, makeStyles } from "@mui/styles";
const CustomSnackbar = ({ open, onClose, message }) => {
  const classes = useStyles();
  return (
    <Snackbar
      open={open}
      autoHideDuration={SNACKBAR_TIMEOUT}
      onClose={onClose}
      message={message}
      classes={{ root: classes.root }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: "white",
      // width:""
    },
  })
);

CustomSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default CustomSnackbar;
