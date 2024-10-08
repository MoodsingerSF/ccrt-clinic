import React from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";

const Heading = ({ title }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Typography
      variant="h4"
      gutterBottom
      style={{
        fontSize: matches ? "170%" : "130%",
      }}
      className={classes.ccrt__doctor__card__section__title}
    >
      {title}
    </Typography>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__card__section__title: {
      color: theme.palette.custom.BLACK,
      fontWeight: "600",
      textTransform: "capitalize",
    },
  })
);
Heading.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Heading;
