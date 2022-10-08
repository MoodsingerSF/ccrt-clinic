import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";

const AppointmentDetailsTypography = ({ heading, text }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      // item
      // xs={7}
      // flexDirection={"column"}
      justifyContent={"flex-start"}
      alignItems="center"
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
const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__appointment__details__typography__container: {
      marginBottom: "10px",
    },
    ccrt__appointment__details__header: {
      fontSize: "85%",
      textTransform: "capitalize",
      fontWeight: "bold",
      marginRight: 8,
      color: theme.palette.custom.DEFAULT_COLOR,
    },
    ccrt__appointment__details__title: {
      fontSize: "85%",
      fontWeight: 500,
      color: theme.palette.custom.BLACK,
      textTransform: "capitalize",
    },
  })
);
AppointmentDetailsTypography.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default AppointmentDetailsTypography;
