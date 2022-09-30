import React, { useState } from "react";
import { Grid, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
import DoctorEducationInfo from "../../doctor-info-form/DoctorEducationInfo";
import DoctorAwardInfo from "../../doctor-info-form/DoctorAwardInfo";
import DoctorExperianceInfo from "../../doctor-info-form/DoctorExperianceInfo";
import CustomChip from "../../chip/CustomChip";
import DoctorTrainingInfo from "../../doctor-info-form/DoctorTrainingInfo";
import PreviewIcon from "@mui/icons-material/Preview";
import ReviewModal from "../../modal/ReviewModal";

const DoctorDetailsMiddle = ({
  name,
  about,
  specializations,
  awards,
  education,
  experiences,
  trainings,
  averageRatings,
  overAllRating,
}) => {
  const classes = useStyles();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent="center"
      className={classes.ccrt__doct__details__page__info__container}
    >
      <Typography className={classes.ccrt__doct__details__page__dctr__name}>
        {name}
      </Typography>
      <Grid container justifyContent={"space-between"}>
        <Rating precision={0.5} value={overAllRating} readOnly size="small" />
        <Tooltip title="more details">
          <IconButton onClick={() => setShowDetails(true)}>
            <PreviewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
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
        className={classes.ccrt__doct__details__page__description__container}
      >
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
        {trainings.map((item) => (
          <DoctorTrainingInfo
            key={item.id}
            id={item.id}
            instituteName={item.instituteName}
            programName={item.programName}
            startYear={item.startYear}
            endYear={item.endYear}
          />
        ))}
        {awards.map((item) => (
          <DoctorAwardInfo
            key={item.id}
            id={item.id}
            title={item.title}
            year={item.year}
            award={item}
          />
        ))}
        {experiences.map((item) => (
          <DoctorExperianceInfo
            key={item.id}
            id={item.id}
            organization={item.organization}
            jobTitle={item.jobTitle}
            department={item.department}
            division={item.division}
            startYear={item.startYear}
            endYear={item.endYear}
          />
        ))}
      </Grid>
      {showDetails && (
        <ReviewModal
          onNegativeFeedback={() => setShowDetails(false)}
          averageRatings={averageRatings}
        />
      )}
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
      fontSize: "85%",
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
  specializations: PropTypes.array.isRequired,
  awards: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
  experiences: PropTypes.array.isRequired,
  trainings: PropTypes.array.isRequired,
  about: PropTypes.string,
  averageRatings: PropTypes.array.isRequired,
  overAllRating: PropTypes.number.isRequired,
};
export default DoctorDetailsMiddle;
