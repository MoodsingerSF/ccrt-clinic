import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";
const CloseButton = ({ onClose }) => {
  const classes = useStyles();
  return (
    <IconButton onClick={onClose}>
      <CloseIcon className={classes.iconStyle} />
    </IconButton>
  );
};

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    iconStyle: {
      color: theme.palette.custom.RED,
      fontSize: "120%",
      cursor: "pointer",
    },
  })
);

export default CloseButton;
