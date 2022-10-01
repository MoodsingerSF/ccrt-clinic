import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import DoctorFormTrainingModal from "../modal/DoctorFormTrainingModal";
import ConfirmationModal from "../modal/ConfirmationModal";
import { processShowDate } from "../../misc/functions";
import { deleteTraining } from "../../controllers/UserController";
import ActionButton from "../button/ActionButton";

const DoctorTrainingInfo = ({
  id,
  instituteName,
  programName,
  startYear,
  endYear,
  // training,
  // setTraining,
  openSnackbar,
  training = [],
  setTraining = () => {},
  editable = false,
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
        // flexDirection={"column"}
        className={classes.ccrt__training__section__content__container}
      >
        <Grid item xs={9}>
          <Typography
            className={
              classes.ccrt__training__section__content__content__heading_2
            }
          >
            {programName}
          </Typography>
          <Typography
            className={
              classes.ccrt__training__section__content__content__heading_1
            }
          >
            {instituteName}
          </Typography>

          <Typography
            className={
              classes.ccrt__training__section__content__content__heading_3
            }
          >
            {startDate} - {endDate}
          </Typography>
        </Grid>

        <Grid item xs={3} container justifyContent="flex-end">
          <Grid item>
            {editable && (
              <>
                <ActionButton
                  icon={<EditIcon fontSize="small" />}
                  title={"Remove"}
                  type="error"
                  onClick={() => setConfirmationModal(true)}
                />
                <ActionButton
                  icon={<DeleteIcon fontSize="small" />}
                  title={"Edit"}
                  type="info"
                  onClick={() => setShowEditableModal(true)}
                />
              </>
            )}
          </Grid>
        </Grid>
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
          openSnackbar={openSnackbar}
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

const useStyles = makeStyles((theme) => ({
  ccrt__training__section__content__container: {
    position: "relative",
    margin: "10px 0",
  },
  ccrt__training__section__content__content__heading_1: {
    fontSize: "85%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
  },
  ccrt__training__section__content__content__heading_2: {
    fontSize: "85%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
  },
  ccrt__training__section__content__content__heading_3: {
    fontSize: "80%",
    fontWeight: 500,
    color: theme.palette.custom.GREY,
  },
  ccrt__doctor__training__info__delete: {
    position: "absolute",
    right: "0",
    color: theme.palette.custom.RED,
  },
  ccrt__doctor__training__info__edit: {
    position: "absolute",
    right: "50px",
    color: theme.palette.custom.BLUE,
  },
}));

DoctorTrainingInfo.propTypes = {
  id: PropTypes.number.isRequired,
  instituteName: PropTypes.string.isRequired,
  programName: PropTypes.string.isRequired,
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired,
  training: PropTypes.array.isRequired,
  setTraining: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

export default DoctorTrainingInfo;
