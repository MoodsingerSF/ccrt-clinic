import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoctorInfoFormTextField from "../textfields/DoctorInfoFormTextField";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import {
  validateInput,
  validateYear,
} from "../../controllers/DoctorInfoFormController";

function* generateId(i) {
  while (true) {
    yield i++;
  }
}
const getId = generateId(0);

const DoctorFormTrainingModal = ({
  open,
  onNegativeFeedback,
  training,
  setTraining,
  id = "",
  institute = "",
  program = "",
  start = "",
  end = "",
  editable = false,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);
  const [programName, setProgramName] = useState(program);
  const [instituteName, setInstituteName] = useState(institute);
  const [startYear, setStartYear] = useState(start);
  const [endYear, setEndYear] = useState(end);

  const handleSubmitTraining = () => {
    if (validate(programName, instituteName, startYear, endYear)) {
      const trainingItem = {
        id: getId.next().value.toLocaleString(),
        programName,
        instituteName,
        startYear,
        endYear,
      };
      setTraining([...training, trainingItem]);
      setProgramName("");
      setInstituteName("");
      setStartYear("");
      setEndYear("");
      onNegativeFeedback();
    } else {
      setShowError(true);
    }
  };

  const handleSubmitEditTraining = () => {
    if (validate(programName, instituteName, startYear, endYear)) {
      const trainingItem = {
        id: id,
        programName,
        instituteName,
        startYear,
        endYear,
      };
      setTraining((prev) =>
        prev.map((item) => (item.id === id ? trainingItem : item))
      );
      setProgramName("");
      setInstituteName("");
      setStartYear("");
      setEndYear("");
      onNegativeFeedback();
    } else {
      setShowError(true);
    }
  };

  const validate = (programName, instituteName, startYear, endYear) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      !validateInput(programName) &&
      !validateInput(instituteName) &&
      validateYear(startYear) &&
      validateYear(endYear);
    return isEverythingAllRight;
  };

  return (
    <Modal open={open} onClose={onNegativeFeedback}>
      <Box sx={style}>
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          className={classes.ccrt__modal__appbar__container}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems="center"
            className={classes.ccrt__modal__appbar__wrapper}
          >
            <Typography className={classes.ccrt__modal__appbar__text}>
              {editable ? "update training" : "add training"}
            </Typography>
            <IconButton onClick={onNegativeFeedback}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          spacing={2}
          className={classes.ccrt__modal__content__container}
        >
          <Grid item xs={12} spacing={2}>
            <DoctorInfoFormTextField
              placeholder={"Program name"}
              value={programName}
              onChange={(e) => setProgramName(e.target.value)}
              error={showError && validateInput(programName)}
              errorText={"Required"}
            />
          </Grid>
          <Grid item xs={12}>
            <DoctorInfoFormTextField
              placeholder={"Institute name"}
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              error={showError && validateInput(instituteName)}
              errorText={"Required"}
            />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
              <DoctorInfoFormTextField
                placeholder={"Start year"}
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                error={showError && !validateYear(startYear)}
                errorText={"Required"}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <DoctorInfoFormTextField
                placeholder={"End year"}
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                error={showError && !validateYear(endYear)}
                errorText={"Required"}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          className={classes.ccrt__modal__footer__container}
        >
          <Button
            onClick={editable ? handleSubmitEditTraining : handleSubmitTraining}
          >
            {editable ? "update" : "save"}
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__modal__appbar__container: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  ccrt__modal__appbar__wrapper: {
    padding: "10px",
  },
  ccrt__modal__appbar__text: {
    fontSize: "120%",
    textTransform: "capitalize",
  },
  ccrt__modal__content__container: {
    padding: "40px 20px",
  },
  ccrt__modal__footer__container: {
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    padding: "10px",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
};

DoctorFormTrainingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  training: PropTypes.array.isRequired,
  setTraining: PropTypes.func.isRequired,
  id: PropTypes.string,
  institute: PropTypes.string,
  program: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  editable: PropTypes.bool,
};

export default DoctorFormTrainingModal;
