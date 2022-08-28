import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";

const DoctorDetailsMiddle = ({
  name,
  specialty,
  degree,
  education,
  experiance,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent="center"
      item
      xs={12}
      sm={8}
      lg={9}
      className={classes.ccrt__doct__details__page__info__container}
    >
      <Typography className={classes.ccrt__doct__details__page__dctr__name}>
        {name}
      </Typography>
      <Typography
        className={classes.ccrt__doct__details__page__dctr__specialty}
      >
        <strong>Specialty - </strong> {specialty}
        <br />
        <strong>Degree - </strong>
        {degree}
      </Typography>
      <Grid
        container
        className={classes.ccrt__doct__details__page__description__container}
      >
        <Typography
          className={classes.ccrt__doct__details__page__education__description}
        >
          {education}
        </Typography>
        <Typography
          className={classes.ccrt__doct__details__page__experiance__description}
        >
          {experiance}
        </Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doct__details__page__info__container: {},
    ccrt__doct__details__page__dctr__name: {
      fontSize: "140%",
      fontWeight: "500",
      textTransform: "capitalize",
      color: theme.palette.custom.DEFAULT_COLOR_3,
      margin: "0 0 5px 0",
    },
    ccrt__doct__details__page__dctr__specialty: {
      fontSize: "85%",
      color: "#6d6d6d",
      textTransform: "capitalize",
    },
    ccrt__doct__details__page__description__container: {
      margin: "20px 0",
    },
    ccrt__doct__details__page__education__description: {
      textAlign: "justify",
      fontSize: "95%",
      color: "#6d6d6d",
      marginBottom: "15px",
    },
    ccrt__doct__details__page__experiance__description: {
      textAlign: "justify",
      fontSize: "95%",
      color: "#6d6d6d",
    },
  })
);

DoctorDetailsMiddle.propTypes = {
  name: PropTypes.string.isRequired,
  specialty: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  experiance: PropTypes.string.isRequired,
};
export default DoctorDetailsMiddle;
