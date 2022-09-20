import React, { useState } from "react";
import { Grid } from "@mui/material";
import MiddleSection from "./middle/MiddleSection";
import PropTypes from "prop-types";
import SelectGender from "./middle/SelectGender";
import { makeStyles, createStyles } from "@mui/styles";

const PrescriptionMiddle = ({
  patientName,
  setPatientName,
  patientGender,
  setPatientGender,
  patientAge,
  setPatientAge,
}) => {
  const classes = useStyles();
  const [isEditMood, setIsEditMood] = useState(false);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="flex-start"
      className={classes.ccrt__prescription__middle__container}
    >
      <Grid item sm={12} lg={4}>
        <MiddleSection
          heading="name"
          title="Enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          tooltip="Rename"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPatientName(e.target.value);
            }
          }}
          isEditMood={isEditMood}
          setIsEditMood={setIsEditMood}
        />
      </Grid>
      <Grid item sm={12} lg={4}>
        <SelectGender
          heading="gender"
          title="Enater patient gender"
          value={patientGender}
          onChange={(e) => setPatientGender(e.target.value)}
          tooltip="Edit gender"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPatientGender(e.target.value);
            }
          }}
          isEditMood={isEditMood}
          setIsEditMood={setIsEditMood}
        />
      </Grid>
      <Grid item sm={12} lg={4}>
        <MiddleSection
          heading="age"
          title="Enter patient age"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
          tooltip="Edit age"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPatientAge(e.target.value);
            }
          }}
          isEditMood={isEditMood}
          setIsEditMood={setIsEditMood}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__middle__container: {
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      padding: "20px 0",
    },
  })
);
PrescriptionMiddle.propTypes = {
  patientName: PropTypes.string.isRequired,
  setPatientName: PropTypes.func.isRequired,
  patientGender: PropTypes.string.isRequired,
  setPatientGender: PropTypes.func.isRequired,
  patientAge: PropTypes.string.isRequired,
  setPatientAge: PropTypes.func.isRequired,
};
export default PrescriptionMiddle;
