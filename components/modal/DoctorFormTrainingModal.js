import React, { useState } from "react";
import { Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoctorInfoFormTextField from "../textfields/DoctorInfoFormTextField";
import PropTypes from "prop-types";
import {
  validateDate,
  validateInput,
} from "../../controllers/DoctorInfoFormController";
import { addTraining, updateTraining } from "../../controllers/UserController";
import BasicDatePicker from "../misc/BasicDatePicker";
import CustomButton from "../button/CustomButton";
import dayjs from "dayjs";
import { prettyDateDayjs } from "../../controllers/DateController";
import { style, useStyles } from "../../styles/ProfileInfoModalStyle";

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
  openSnackbar,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);
  const [program, setProgram] = useState(programName);
  const [institutionName, setInstitutionName] = useState(institute);
  const [startDate, setStartDate] = useState(start ? dayjs(start) : dayjs());
  const [endDate, setEndDate] = useState(end ? dayjs(end) : dayjs());
  const [loading, setLoading] = useState(false);

  const handleSubmitTraining = async () => {
    const sDate = prettyDateDayjs(startDate).dateObj;
    const eDate = prettyDateDayjs(endDate).dateObj;
    try {
      if (!validate(program, institutionName, sDate, eDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await addTraining(program, institutionName, sDate, eDate);
      setLoading(false);
      onPositiveFeedback(data);
      openSnackbar("Training entity has been added successfully.");
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.message);
      }
    }
  };

  const handleSubmitEditTraining = async () => {
    const sDate = prettyDateDayjs(startDate).dateObj;
    const eDate = prettyDateDayjs(endDate).dateObj;
    try {
      if (!validate(program, institutionName, sDate, eDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await updateTraining(
        id,
        institutionName,
        program,
        sDate,
        eDate
      );
      setTraining((prev) => prev.map((item) => (item.id === id ? data : item)));
      setLoading(false);
      onNegativeFeedback();
      openSnackbar("Training entity has been updated successfully.");
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.message);
      }
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
      <Grid container justifyContent={"center"} alignItems="center" sx={style}>
        <Grid
          container
          justifyContent={"center"}
          alignItems="center"
          style={{ width: "95%" }}
        >
          <Grid container justifyContent={"center"} alignItems="center">
            <Grid
              container
              justifyContent={"space-between"}
              alignItems="center"
              className={classes.ccrt__modal__appbar__wrapper}
            >
              <Typography className={classes.ccrt__modal__appbar__text}>
                {editable ? "update training" : "add training"}
              </Typography>
              <IconButton size={"small"} onClick={onNegativeFeedback}>
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
                label={"Program Name"}
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                error={showError && validateInput(program)}
                errorText={"Required"}
              />
            </Grid>
            <Grid container item xs={12}>
              <DoctorInfoFormTextField
                label={"Institute Name"}
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                error={showError && validateInput(institutionName)}
                errorText={"Required"}
              />
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid container item xs={12} md={12} lg={6}>
                <BasicDatePicker
                  label={"Start Date"}
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
                  label={"End Date"}
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
              onClick={
                editable ? handleSubmitEditTraining : handleSubmitTraining
              }
              size="medium"
              loading={loading}
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
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
  openSnackbar: PropTypes.func.isRequired,
};

export default DoctorFormTrainingModal;
