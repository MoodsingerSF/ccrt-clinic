import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@mui/styles";
const CloseButton = ({ onClose }) => {
  const classes = useStyles();
  return <CloseIcon className={classes.iconStyle} onClick={onClose} />;
};

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles(() =>
  createStyles({
    iconStyle: {
      color: "red",
      fontSize: "120%",
      cursor: "pointer",
    },
  })
);

export default CloseButton;
