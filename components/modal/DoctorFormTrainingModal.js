import React, { useState } from "react";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoctorInfoFormTextField from "../textfields/DoctorInfoFormTextField";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import {
  validateDate,
  validateInput,
} from "../../controllers/DoctorInfoFormController";
import { addTraining, updateTraining } from "../../controllers/UserController";
import BasicDatePicker from "../misc/BasicDatePicker";
import CustomButton from "../button/CustomButton";

const DoctorFormTrainingModal = ({
  open,
  onNegativeFeedback,
  onPositiveFeedback,
  setTraining,
  id = null,
  institute = "",
  programName = "",
  start = null,
  end = null,
  editable = false,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);
  const [program, setProgram] = useState(programName);
  const [institutionName, setInstitutionName] = useState(institute);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [loading, setLoading] = useState(false);

  const updateObj = {
    id,
    institute,
    programName,
    start,
    end,
    editable,
  };
  const updateStateObj = {
    id,
    institutionName,
    program,
    startDate,
    endDate,
    editable,
  };
  console.log("Update Come", updateObj);
  console.log("Update state", updateStateObj);

  const handleSubmitTraining = async () => {
    try {
      if (!validate(program, institutionName, startDate, endDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await addTraining(
        program,
        institutionName,
        startDate,
        endDate
      );
      setLoading(false);
      onPositiveFeedback(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEditTraining = async () => {
    try {
      if (!validate(program, institutionName, startDate, endDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await updateTraining(
        id,
        institutionName,
        program,
        startDate,
        endDate
      );
      setTraining((prev) => prev.map((item) => (item.id === id ? data : item)));
      setLoading(false);
      onNegativeFeedback();
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (program, institutionName, startDate, endDate) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      !validateInput(program) &&
      !validateInput(institutionName) &&
      !validateDate(startDate) &&
      !validateDate(endDate);
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
          <Grid container item xs={12}>
            <DoctorInfoFormTextField
              placeholder={"Program name"}
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              error={showError && validateInput(program)}
              errorText={"Required"}
            />
          </Grid>
          <Grid container item xs={12}>
            <DoctorInfoFormTextField
              placeholder={"Institute name"}
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              error={showError && validateInput(institutionName)}
              errorText={"Required"}
            />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid container item xs={12} md={12} lg={6}>
              <BasicDatePicker
                label={"Start date"}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                error={showError && validateDate(startDate)}
                errorText={"Required"}
                format={true}
              />
            </Grid>
            <Grid container item xs={12} md={12} lg={6}>
              <BasicDatePicker
                label={"End date"}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                error={showError && validateDate(endDate)}
                errorText={"Required"}
                format={true}
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
          <CustomButton
            icon={null}
            title={editable ? "update" : "save"}
            onClick={editable ? handleSubmitEditTraining : handleSubmitTraining}
            size="medium"
            loading={loading}
          />
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
  onPositiveFeedback: PropTypes.func.isRequired,
  setTraining: PropTypes.func.isRequired,
  id: PropTypes.number,
  institute: PropTypes.string,
  programName: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  editable: PropTypes.bool,
};

export default DoctorFormTrainingModal;
