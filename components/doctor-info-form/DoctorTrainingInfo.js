import React, { useState } from "react";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import DoctorFormTrainingModal from "../modal/DoctorFormTrainingModal";
import { processShowDate } from "../../misc/functions";
import { deleteTraining } from "../../controllers/UserController";
import DoctorInfoHOC from "./DoctorInfoHOC";
import { useStyles } from "./DoctorInfoStyle";

const DoctorTrainingInfo = ({
  id,
  instituteName,
  programName,
  startYear,
  endYear,
  openSnackbar,
  training = [],
  setTraining = () => {},
  editable = false,
}) => {
  const classes = useStyles();
  const [showEditableModal, setShowEditableModal] = useState(false);

  const handleDelete = async (id) => {
    await deleteTraining(id);
  };

  const startDate = processShowDate(startYear);
  const endDate = processShowDate(endYear);

  return (
    <DoctorInfoHOC
      editable={editable}
      editModal={
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
      }
      showEditableModal={showEditableModal}
      setShowEditableModal={setShowEditableModal}
      openSnackbar={openSnackbar}
      onDelete={handleDelete}
      onSuccess={() => {
        setTraining(
          training.filter((item) => {
            return item.id !== id;
          })
        );
      }}
    >
      <>
        <Typography className={classes.ccrt__doctor__info__content__heading_2}>
          {programName}
        </Typography>
        <Typography className={classes.ccrt__doctor__info__content__heading_1}>
          {instituteName}
        </Typography>

        <Typography className={classes.ccrt__doctor__info__content__heading_3}>
          {startDate} - {endDate}
        </Typography>
      </>
    </DoctorInfoHOC>
  );
};

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
