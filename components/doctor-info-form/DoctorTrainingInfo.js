import React, { useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import DoctorFormTrainingModal from "../modal/DoctorFormTrainingModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import { processShowDate } from "../../misc/functions";
import { deleteTraining } from "../../controllers/UserController";
import DoctorInfoButton from "../button/DoctorInfoButton";

const DoctorTrainingInfo = ({
  id,
  instituteName,
  programName,
  startYear,
  endYear,
<<<<<<< HEAD
  training,
  setTraining,
  openSnackbar,
=======
  training = [],
  setTraining = () => {},
  editable = false,
>>>>>>> 0583ce3aa54480a6a3114b3fe9b3345bc44dfeb9
}) => {
  const classes = useStyles();
  const [showEditableModal, setShowEditableModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteSection = async (id) => {
    setLoading(true);
    try {
      await deleteTraining(id);
      setTraining(
        training.filter((item) => {
          return item.id !== id;
        })
      );
      setLoading(false);
      openSnackbar("Training entity has been removed successfully.");
      setConfirmationModal(false);
    } catch (error) {
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.code + ":" + data.message);
      }
    }
  };

  const startDate = processShowDate(startYear);
  const endDate = processShowDate(endYear);

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
          {startDate} - {endDate}
        </Typography>
<<<<<<< HEAD

        <DoctorInfoButton
          className={classes.ccrt__doctor__training__info__edit}
          onClick={() => setShowEditableModal(true)}
          icon={<EditIcon fontSize="small" />}
        />
        <DoctorInfoButton
          className={classes.ccrt__doctor__training__info__delete}
          onClick={() => setConfirmationModal(true)}
          icon={<DeleteIcon fontSize="small" />}
        />
=======
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
>>>>>>> 0583ce3aa54480a6a3114b3fe9b3345bc44dfeb9
      </Grid>

      {showEditableModal && (
        <DoctorFormTrainingModal
          open={showEditableModal}
          onNegativeFeedback={() => setShowEditableModal(false)}
          training={training}
          setTraining={setTraining}
          id={id}
          institute={instituteName}
          programName={programName}
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
          loading={loading}
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
  id: PropTypes.number.isRequired,
  instituteName: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
<<<<<<< HEAD
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired,
  training: PropTypes.array.isRequired,
  setTraining: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
=======
  startYear: PropTypes.string.isRequired,
  endYear: PropTypes.string.isRequired,
  training: PropTypes.array,
  setTraining: PropTypes.func,
  editable: PropTypes.bool,
>>>>>>> 0583ce3aa54480a6a3114b3fe9b3345bc44dfeb9
};

export default DoctorTrainingInfo;
