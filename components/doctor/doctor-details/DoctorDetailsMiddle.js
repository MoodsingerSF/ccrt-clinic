import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
import DoctorEducationInfo from "../../doctor-info-form/DoctorEducationInfo";
import DoctorAwardInfo from "../../doctor-info-form/DoctorAwardInfo";
import DoctorExperienceInfo from "../../doctor-info-form/DoctorExperienceInfo";
import CustomChip from "../../chip/CustomChip";
import DoctorTrainingInfo from "../../doctor-info-form/DoctorTrainingInfo";

const DoctorDetailsMiddle = ({
  name,
  about,
  specializations,
  awards,
  education,
  experiences,
  trainings,
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
      <Grid container>
        {specializations.map((item) => (
          <CustomChip key={item} title={item} />
        ))}
      </Grid>

      {about && (
        <Typography
          className={classes.ccrt__doct__details__page__education__description}
        >
          {about}
        </Typography>
      )}
      <Grid
        container
        direction="column"
        className={classes.ccrt__doct__details__page__description__container}
      >
        <Typography className={classes.sectionTitle}>Education</Typography>
        {education.map((item) => (
          <DoctorEducationInfo
            key={item.id}
            id={item.id}
            instituteName={item.institutionName}
            degreeName={item.degree}
            subjectName={item.subject}
            startYear={item.startDate}
            endYear={item.endDate}
            education={education}
          />
        ))}
        <Typography className={classes.sectionTitle}>Trainings</Typography>

        {trainings.map((item) => (
          <DoctorTrainingInfo
            key={item.id}
            id={item.id}
            instituteName={item.instituteName}
            programName={item.program}
            startYear={item.startDate}
            endYear={item.endDate}
          />
        ))}
        <Typography className={classes.sectionTitle}>Experience</Typography>

        {experiences.map((item) => (
          <DoctorExperienceInfo
            key={item.id}
            id={item.id}
            organization={item.organization}
            jobTitle={item.title}
            department={item.department}
            division={item.division}
            startYear={item.startDate}
            endYear={item.endDate}
          />
        ))}
        <Typography className={classes.sectionTitle}>Awards</Typography>

        {awards.map((item) => (
          <DoctorAwardInfo
            key={item.id}
            id={item.id}
            title={item.name}
            year={item.year}
            award={item}
          />
        ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doct__details__page__info__container: {},
    ccrt__doct__details__page__dctr__name: {
      fontSize: "140%",
      fontWeight: "bold",
      textTransform: "capitalize",
      color: theme.palette.custom.BLACK,
      // margin: "0 0 5px 0",
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
      fontSize: "80%",
      color: theme.palette.custom.BLACK,
      fontWeight: 500,
      // marginBottom: "15px",
    },
    ccrt__doct__details__page__experience__description: {
      textAlign: "justify",
      fontSize: "95%",
      color: "#6d6d6d",
    },
    sectionTitle: {
      color: theme.palette.custom.BLACK,
      fontSize: "100%",
      fontWeight: "bold",
    },
  })
);

DoctorDetailsMiddle.propTypes = {
  name: PropTypes.string.isRequired,
  specializations: PropTypes.array.isRequired,
  awards: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
  experiences: PropTypes.array.isRequired,
  trainings: PropTypes.array.isRequired,
  about: PropTypes.string,
};
export default DoctorDetailsMiddle;
