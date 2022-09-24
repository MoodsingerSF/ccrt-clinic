import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";

const AppointmentDetailsTypography = ({ heading, text }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      // flexDirection={"column"}
      className={classes.ccrt__appointment__details__typography__container}
    >
      <Typography className={classes.ccrt__appointment__details__header}>
        {heading}:
      </Typography>
      <Typography className={classes.ccrt__appointment__details__title}>
        {text}
      </Typography>
    </Grid>
  );
};
const useStyles = makeStyles(() =>
  createStyles({
    ccrt__appointment__details__typography__container: {
      marginBottom: "10px",
    },
    ccrt__appointment__details__header: {
      fontSize: "80%",
      textTransform: "capitalize",
      fontWeight: 500,
      marginRight: 8,
    },
    ccrt__appointment__details__title: {
      // border: `1px solid ${theme.palette.custom.BORDER}`,
      // padding: "10px 5px",
      fontSize: "80%",
      // fontWeight: "500",
      // lineHeight: "1.25",
      textTransform: "capitalize",
    },
  })
);
AppointmentDetailsTypography.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default AppointmentDetailsTypography;
