import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
const EducationCard = ({ degree, subject, institutionName }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid container>
        <Typography className={classes.degreeStyle}>{degree}</Typography>
        <Typography
          style={{
            color: "white",
            fontSize: "80%",
            fontWeight: "bold",
            margin: "0px 5px",
          }}
        >
          in
        </Typography>
        <Typography className={classes.degreeStyle}>{subject}</Typography>
      </Grid>
      <Typography className={classes.institutionNameStyle}>
        {institutionName}
      </Typography>
    </Grid>
  );
};

EducationCard.propTypes = {
  degree: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  institutionName: PropTypes.string.isRequired,
};
const useStyles = makeStyles(() => ({
  degreeStyle: {
    color: "white",
    fontSize: "80%",
    fontWeight: "bold",
  },
  institutionNameStyle: {
    color: "white",
    fontSize: "80%",
    fontWeight: "bold",
  },
}));

export default EducationCard;
