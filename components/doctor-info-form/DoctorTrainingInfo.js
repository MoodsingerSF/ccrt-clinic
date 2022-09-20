import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import DoctorFormTrainingModal from "../modal/DoctorFormTrainingModal";

const DoctorTrainingInfo = ({
  id,
  instituteName,
  programName,
  startYear,
  endYear,
  training,
  setTraining,
}) => {
  const classes = useStyles();
  const [showEditableModal, setShowEditableModal] = useState(false);
  return (
    <>
      <Grid
        container
        flexDirection={"column"}
        className={classes.ccrt__training__section__content__container}
      >
        <Typography
          className={
            classes.ccrt__training__section__content__content__heading_1
          }
        >
          {instituteName}
        </Typography>
        <Typography
          className={
            classes.ccrt__training__section__content__content__heading_2
          }
        >
          {programName}
        </Typography>
        <Typography
          className={
            classes.ccrt__training__section__content__content__heading_3
          }
        >
          {startYear} - {endYear}
        </Typography>
        <IconButton
          className={classes.ccrt__doctor__training__info__edit}
          onClick={() => setShowEditableModal(true)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Grid>

      {showEditableModal && (
        <DoctorFormTrainingModal
          open={showEditableModal}
          onNegativeFeedback={() => setShowEditableModal(false)}
          training={training}
          setTraining={setTraining}
          id={id}
          institute={instituteName}
          program={programName}
          start={startYear}
          end={endYear}
          editable={true}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__training__section__content__container: {
    position: "relative",
    margin: "10px 0",
  },
  ccrt__training__section__content__content__heading_1: {
    fontSize: "110%",
    fontWeight: "500",
  },
  ccrt__training__section__content__content__heading_2: {
    fontSize: "90%",
    fontWeight: "400",
  },
  ccrt__training__section__content__content__heading_3: {
    fontSize: "80%",
    fontWeight: "300",
  },
  ccrt__doctor__training__info__edit: {
    position: "absolute",
    right: "0",
  },
}));

DoctorTrainingInfo.propTypes = {
  id: PropTypes.string.isRequired,
  instituteName: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  startYear: PropTypes.string.isRequired,
  endYear: PropTypes.string.isRequired,
  training: PropTypes.array.isRequired,
  setTraining: PropTypes.func.isRequired,
};

export default DoctorTrainingInfo;
