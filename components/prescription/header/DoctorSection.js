import React from "react";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CustomChip from "../../chip/CustomChip";
import EducationCard from "../../cards/EducationCard";
const DoctorSection = ({ doctor }) => {
  const classes = useStyles();
  console.log(doctor.education);
  return (
    <>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="flex-start"
      >
        <Typography className={classes.nameStyle}>
          {doctor.firstName + " " + doctor.lastName}
        </Typography>
        <Grid item container style={{ marginTop: 3 }}>
          {doctor.specializations.map((item) => (
            <CustomChip key={item.name} title={item.name} />
          ))}
        </Grid>
        <Grid container style={{ marginTop: 5 }}>
          {doctor.education.map((item) => {
            return (
              <Grid item key={`${item.degree}`} style={{ margin: "5px 0px" }}>
                <EducationCard
                  degree={item.degree}
                  subject={item.subject}
                  institutionName={item.institutionName}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

DoctorSection.propTypes = {
  doctor: PropTypes.object.isRequired,
};
const useStyles = makeStyles(() => ({
  nameStyle: {
    textTransform: "capitalize",
    fontSize: "90%",
    fontWeight: 500,
    color: "white",
  },
}));

export default DoctorSection;
