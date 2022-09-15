import React, { useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import DoctorEducationSection from "../components/doctor-info-form/DoctorEducationSection";
import DoctorTrainingSection from "../components/doctor-info-form/DoctorTrainingSection";
import DoctorAwardSection from "../components/doctor-info-form/DoctorAwardSection";
import DoctorExperianceSection from "../components/doctor-info-form/DoctorExperianceSection";

const DoctorInfoForm = ({ headingShow = true }) => {
  const classes = useStyles();
  const [education, setEducation] = useState([
    // {
    //   id: "1",
    //   degreeName: "Bachelor of Medicine",
    //   subjectName: "Medicine",
    //   instituteName: "Medical University of the Americas",
    //   startYear: "2016",
    //   endYear: "2021",
    // },
  ]);
  // console.log(education);
  const [training, setTraining] = useState([
    // {
    //   id: "0",
    //   programName: "Clinician Investigator Program",
    //   instituteName: "The University of British Columbia, Vancouver",
    //   startYear: "2008",
    //   endYear: "2010",
    // },
    // {
    //   id: "2",
    //   programName: "Clinician Investigator Program",
    //   instituteName: "The University of British Columbia, Vancouver",
    //   startYear: "2012",
    //   endYear: "2014",
    // },
    // {
    //   id: "3",
    //   programName: "Clinician Investigator Program",
    //   instituteName: "The University of British Columbia, Vancouver",
    //   startYear: "2011",
    //   endYear: "2013",
    // },
  ]);
  // console.log(training);
  const [experiances, setExperiances] = useState([
    // {
    //   id: "0",
    //   jobTitle: "Chief Fellow",
    //   organization: "Princess Margaret Cancer Centre",
    //   department: "Department of Radiation Oncology",
    //   division: "Toronto",
    //   startYear: "2008",
    //   endYear: "2010",
    // },
  ]);
  // console.log(experiances);
  const [award, setAward] = useState([
    // {
    //   id: "0",
    //   title: "Marquis Who’s Who in the World",
    //   year: "2010",
    // },
  ]);
  // console.log(award);

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
      <Grid container className={classes.ccrt__doctor__info__form__section}>
        <Grid container>
          <DoctorEducationSection
            education={education}
            setEducation={setEducation}
          />
        </Grid>
        <Grid container>
          <DoctorTrainingSection
            training={training}
            setTraining={setTraining}
          />
        </Grid>
        <Grid container>
          <DoctorExperianceSection
            experiances={experiances}
            setExperiances={setExperiances}
          />
        </Grid>
        <Grid container>
          <DoctorAwardSection award={award} setAward={setAward} />
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__doctor__info__form__heading: {
    width: "100%",
    textAlign: "center",
  },
  ccrt__doctor__info__form__section: {
    width: "75%",
  },
}));

DoctorInfoForm.proptypes = {
  headingShow: PropTypes.bool,
};
export default DoctorInfoForm;
