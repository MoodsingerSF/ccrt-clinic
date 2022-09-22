import React, { useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import DoctorEducationSection from "../components/doctor-info-form/DoctorEducationSection";
import DoctorTrainingSection from "../components/doctor-info-form/DoctorTrainingSection";
import DoctorAwardSection from "../components/doctor-info-form/DoctorAwardSection";
import DoctorExperianceSection from "../components/doctor-info-form/DoctorExperianceSection";
import CustomSnackbar from "../components/snackbar/CustomSnackbar";
import { SNACKBAR_INITIAL_STATE } from "../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../misc/functions";

const DoctorInfoForm = ({ headingShow = true, educationList = [] }) => {
  const classes = useStyles();

  const theme = useTheme();
  const IsDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [education, setEducation] = useState(educationList);
  const [training, setTraining] = useState(trainingList);
  const [experiances, setExperiances] = useState(experienceList);
  const [award, setAward] = useState(awardList);

  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      style={{ marginTop: headingShow && "12vh" }}
    >
      <h1 className={classes.ccrt__doctor__info__form__heading}>
        {headingShow && "Doctor details"}
      </h1>
      <Grid container style={{ width: IsDesktop ? "75%" : "100%" }}>
        <Grid container>
          <DoctorEducationSection
            education={education}
            setEducation={setEducation}
            openSnackbar={openSnackbar}
          />
        </Grid>
        <Grid container>
          <DoctorTrainingSection
            training={training}
            setTraining={setTraining}
            openSnackbar={openSnackbar}
          />
        </Grid>
        <Grid container>
          <DoctorExperianceSection
            experiances={experiances}
            setExperiances={setExperiances}
            openSnackbar={openSnackbar}
          />
        </Grid>
        <Grid container>
          <DoctorAwardSection award={award} setAward={setAward} />
        </Grid>
      </Grid>
      <CustomSnackbar
        open={snackbar.open}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
        message={snackbar.message}
      />
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__doctor__info__form__heading: {
    width: "100%",
    textAlign: "center",
  },
}));

DoctorInfoForm.propTypes = {
  headingShow: PropTypes.bool,
  educationList: PropTypes.array,
  trainingList: PropTypes.array,
  experienceList: PropTypes.array,
  awardList: PropTypes.array,
};
export default DoctorInfoForm;
