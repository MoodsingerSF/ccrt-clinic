import React from "react";
import { Grid, Typography } from "@mui/material";
import { prettyDate2 } from "../../../controllers/DateController";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
const DateSection = ({ date }) => {
  const classes = useStyles();
  const dateDetails = prettyDate2(new Date(date));
  return (
    <>
      <Grid item>
        <Grid container justifyContent={"space-between"} alignItems="center">
          <Typography className={classes.dayStyle}>
            {dateDetails.day}
          </Typography>
        </Grid>
        <Grid container>
          <Typography className={classes.monthStyle}>
            {dateDetails.month}
          </Typography>
          <Typography className={classes.dateStyle}>
            {dateDetails.date}, {dateDetails.year}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
DateSection.propTypes = {
  date: PropTypes.string.isRequired,
};
const useStyles = makeStyles(() => ({
  dayStyle: {
    color: "white",
    fontSize: "200%",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  monthStyle: {
    color: "white",
    fontSize: "120%",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  dateStyle: {
    fontSize: "120%",
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
  },
}));
export default DateSection;
