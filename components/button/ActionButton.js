import { Button } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@mui/styles";
const ActionButton = ({
  icon = null,
  title,
  type = "info",
  onClick,
  fullWidth = false,
}) => {
  const classes = useStyles();
  return (
    <Button
      classes={{
        root:
          type === "success"
            ? classes.rootSuccess
            : type === "error"
            ? classes.rootError
            : classes.rootInfo,
        outlined: classes.outlined,
        text: classes.text,
      }}
      variant="filled"
      size="small"
      fullWidth={fullWidth}
      startIcon={icon}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    rootSuccess: {
      padding: "5px 12px",
      background: `${theme.palette.custom.GREEN}`,
      margin: 0,
      // background: "red",
      fontSize: "70%",
      fontWeight: 600,
      color: "white",
      textTransform: "capitalize",
      marginRight: 10,
      "&:hover": {
        background: `${theme.palette.custom.GREEN}`,
      },
    },
    rootError: {
      padding: "5px 12px",

      background: `${theme.palette.custom.RED}`,

      margin: 0,
      // background: "red",
      fontSize: "70%",
      color: "white",
      textTransform: "capitalize",
      marginRight: 10,
      "&:hover": {
        background: `${theme.palette.custom.RED}`,
      },
    },
    rootInfo: {
      padding: "5px 12px",

      background: `${theme.palette.custom.BLUE}`,

      margin: 0,
      // background: "BLUE",
      fontSize: "70%",
      color: "white",
      textTransform: "capitalize",
      // marginRight: 10,
      "&:hover": {
        background: `${theme.palette.custom.BLUE}`,
      },
    },
    outlined: {
      // borderColor: ,
    },
    text: {
      fontSize: "80%",
    },
  })
);

ActionButton.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool.isRequired,
};

export default ActionButton;
