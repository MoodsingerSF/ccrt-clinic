import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import DoctorFormTrainingModal from "../modal/DoctorFormTrainingModal";
import ConfirmationModal from "../modal/ConfirmationModal";

const DoctorTrainingInfo = ({
  id,
  instituteName,
  programName,
  startYear,
  endYear,
  training = [],
  setTraining = () => {},
  editable = false,
}) => {
  const classes = useStyles();
  const [showEditableModal, setShowEditableModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const handleDeleteSection = (id) => {
    // console.log(id);
    const items = training.filter((item) => item.id !== id);
    setTraining(items);
  };

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
        {editable && (
          <>
            <IconButton
              className={classes.ccrt__doctor__training__info__edit}
              onClick={() => setShowEditableModal(true)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              className={classes.ccrt__doctor__training__info__delete}
              onClick={() => setConfirmationModal(true)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        )}
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
      {confirmationModal && (
        <ConfirmationModal
          onPositiveFeedback={() => handleDeleteSection(id)}
          onNegativeFeedback={() => setConfirmationModal(false)}
          title={"You want to delete this section"}
        />
      )}
    </>
  );
};

const useStyles = makeStyles(() => ({
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
  ccrt__doctor__training__info__delete: {
    position: "absolute",
    right: "0",
  },
  ccrt__doctor__training__info__edit: {
    position: "absolute",
    right: "50px",
  },
}));

DoctorTrainingInfo.propTypes = {
  id: PropTypes.string.isRequired,
  instituteName: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  startYear: PropTypes.string.isRequired,
  endYear: PropTypes.string.isRequired,
  training: PropTypes.array,
  setTraining: PropTypes.func,
  editable: PropTypes.bool,
};

export default DoctorTrainingInfo;
