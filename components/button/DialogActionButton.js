import React from "react";
import { Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const DialogActionButton = ({ onClick, title }) => {
  const classes = useStyles();
  return (
    <Typography
      onClick={onClick}
      className={classes.ccrt__photo__editing__dialog__action__button}
    >
      {title}
    </Typography>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__photo__editing__dialog__action__button: {
      fontSize: "80%",
      color: "#fff",
      padding: "7px 15px",
      backgroundColor: theme.palette.custom.DEFAULT_COLOR_MINUS_2,
      borderRadius: "5px",
      cursor: "pointer",
      textTransform: "uppercase",
    },
  })
);
export default DialogActionButton;

DialogActionButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
