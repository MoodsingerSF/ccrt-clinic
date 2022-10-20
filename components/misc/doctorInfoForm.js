import React, { memo, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { APP_BAR_HEIGHT, SNACKBAR_INITIAL_STATE } from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import DoctorAwardSection from "../doctor-info-form/DoctorAwardSection";
import DoctorExperienceSection from "../doctor-info-form/DoctorExperienceSection";
import DoctorTrainingSection from "../doctor-info-form/DoctorTrainingSection";
import DoctorEducationSection from "../doctor-info-form/DoctorEducationSection";

const DoctorInfoForm = ({
  headingShow = true,
  educationList = [],
  trainingList,
  experienceList,
  awardList,
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const IsDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [education, setEducation] = useState(educationList);
  const [training, setTraining] = useState(trainingList);
  const [experiences, setExperiences] = useState(experienceList);
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
      style={{ marginTop: headingShow && APP_BAR_HEIGHT }}
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
          <DoctorExperienceSection
            experiences={experiences}
            setExperiences={setExperiences}
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
export default memo(DoctorInfoForm);
