import React, { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BOX_SHADOW } from "../../misc/colors";
import PropTypes from "prop-types";
import DoctorFormTrainingModal from "../modal/DoctorFormTrainingModal";
import { makeStyles } from "@mui/styles";
import DoctorTrainingInfo from "./DoctorTrainingInfo";

const DoctorTrainingSection = ({ training, setTraining }) => {
  const classes = useStyles();
  const [showTrainingModal, setShowTrainingModal] = useState(false);

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        className={classes.ccrt__training__section__wrapper}
      >
        <Typography className={classes.ccrt__training__section__header}>
          Training
        </Typography>
        {training.length === 0 && (
          <IconButton onClick={() => setShowTrainingModal(true)}>
            <AddIcon />
          </IconButton>
        )}

        {training.length !== 0 &&
          training.map((item) => (
            <DoctorTrainingInfo
              key={item.id}
              id={item.id}
              instituteName={item.instituteName}
              programName={item.programName}
              startYear={item.startYear}
              endYear={item.endYear}
              training={training}
              setTraining={setTraining}
            />
          ))}

        {training.length !== 0 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setShowTrainingModal(true)}
          >
            <AddIcon fontSize="small" /> add another
          </Button>
        )}
      </Grid>
      {showTrainingModal && (
        <DoctorFormTrainingModal
          open={showTrainingModal}
          onNegativeFeedback={() => setShowTrainingModal(false)}
          training={training}
          setTraining={setTraining}
        />
      )}
    </>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__training__section__wrapper: {
    padding: "10px",
    borderRadius: "5px",
    boxShadow: BOX_SHADOW,
    marginBottom: "20px",
  },
  ccrt__training__section__header: {
    fontSize: "130%",
    fontWeight: "600",
  },
}));

DoctorTrainingSection.propTypes = {
  training: PropTypes.array.isRequired,
  setTraining: PropTypes.func.isRequired,
};
export default DoctorTrainingSection;
