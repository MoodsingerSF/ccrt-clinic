import React, { useState } from "react";
import { Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoctorInfoFormTextField from "../textfields/DoctorInfoFormTextField";
import PropTypes from "prop-types";
import {
  validateDate,
  validateInput,
} from "../../controllers/DoctorInfoFormController";
import {
  addEducation,
  updateEducation,
} from "../../controllers/UserController";
import BasicDatePicker from "../misc/BasicDatePicker";
import CustomButton from "../button/CustomButton";
import dayjs from "dayjs";
import { prettyDateDayjs } from "../../controllers/DateController";
import { style, useStyles } from "../../styles/ProfileInfoModalStyle";

const DoctorFormEducationModal = ({
  open,
  onNegativeFeedback,
  onPositiveFeedback,
  setEducation,
  id = null,
  institute = "",
  degreeName = "",
  subjectName = "",
  start = null,
  end = null,
  editable = false,
  openSnackbar,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [degree, setDegree] = useState(degreeName);
  const [subject, setSubject] = useState(subjectName);
  const [institutionName, setInstitutionName] = useState(institute);
  const [startDate, setStartDate] = useState(start ? dayjs(start) : dayjs());
  const [endDate, setEndDate] = useState(end ? dayjs(end) : dayjs());
  const handleSubmitEducation = async () => {
    const sDate = prettyDateDayjs(startDate).dateObj;
    const eDate = prettyDateDayjs(endDate).dateObj;

    try {
      if (!validate(degree, subject, institutionName, sDate, eDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await addEducation(
        degree,
        subject,
        institutionName,
        sDate,
        eDate
      );
      setLoading(false);
      onPositiveFeedback(data);
      openSnackbar("Education entity has been added successfully.");
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.message);
      }
    }
  };

  const handleSubmitEditEducation = async () => {
    const sDate = prettyDateDayjs(startDate).dateObj;
    const eDate = prettyDateDayjs(endDate).dateObj;
    try {
      if (!validate(degree, subject, institutionName, sDate, eDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await updateEducation(
        degree,
        subject,
        institutionName,
        sDate,
        eDate,
        id
      );
      setEducation((prev) =>
        prev.map((item) => (item.id === id ? data : item))
      );
      setLoading(false);
      onNegativeFeedback();
      openSnackbar("Education entity has been updated successfully.");
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.message);
      }
    }
  };

  const validate = (degree, subject, institutionName, startDate, endDate) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      !validateInput(degree) &&
      !validateInput(subject) &&
      !validateInput(institutionName) &&
      !validateDate(startDate) &&
      !validateDate(endDate);
    return isEverythingAllRight;
  };

  return (
    <Modal open={open} onClose={onNegativeFeedback}>
      <Grid container justifyContent={"center"} alignItems="center" sx={style}>
        <Grid container style={{ width: "95%" }}>
          <Grid container justifyContent={"center"} alignItems="center">
            <Grid
              container
              justifyContent={"space-between"}
              alignItems="center"
              className={classes.ccrt__modal__appbar__wrapper}
            >
              <Typography className={classes.ccrt__modal__appbar__text}>
                {editable ? "update education" : "add education"}
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
            // spacing={2}
            className={classes.ccrt__modal__content__container}
          >
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} md={12} lg={6}>
                <DoctorInfoFormTextField
                  label={"Degree Name"}
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  error={showError && validateInput(degree)}
                  errorText={"Required"}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <DoctorInfoFormTextField
                  label={"Subject Name"}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  error={showError && validateInput(subject)}
                  errorText={"Required"}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20, marginBottom: 10 }}>
              <DoctorInfoFormTextField
                label={"Institution Name"}
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                error={showError && validateInput(institutionName)}
                errorText={"Required"}
              />
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} md={12} lg={6}>
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
              <Grid item xs={12} md={12} lg={6}>
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
              onClick={
                editable ? handleSubmitEditEducation : handleSubmitEducation
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

DoctorFormEducationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  onPositiveFeedback: PropTypes.func.isRequired,
  setEducation: PropTypes.func.isRequired,
  id: PropTypes.number,
  institute: PropTypes.string,
  degreeName: PropTypes.string,
  subjectName: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  editable: PropTypes.bool,
  openSnackbar: PropTypes.func.isRequired,
};

export default DoctorFormEducationModal;
