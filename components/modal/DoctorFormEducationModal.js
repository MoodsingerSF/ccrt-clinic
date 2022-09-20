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
import {
  addEducation,
  updateEducation,
} from "../../controllers/UserController";
import BasicDatePicker from "../misc/BasicDatePicker";

import CustomButton from "../button/CustomButton";

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
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [degree, setDegree] = useState(degreeName);
  const [subject, setSubject] = useState(subjectName);
  const [institutionName, setInstitutionName] = useState(institute);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const handleSubmitEducation = async () => {
    try {
      if (!validate(degree, subject, institutionName, startDate, endDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await addEducation(
        degree,
        subject,
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

  const handleSubmitEditEducation = async () => {
    try {
      if (!validate(degree, subject, institutionName, startDate, endDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await updateEducation(
        degree,
        subject,
        institutionName,
        startDate,
        endDate,
        id
      );
      setEducation((prev) =>
        prev.map((item) => (item.id === id ? data : item))
      );
      setLoading(false);
      onNegativeFeedback();
    } catch (error) {
      console.log(error);
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
          spacing={2}
          className={classes.ccrt__modal__content__container}
        >
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12} md={12} lg={6}>
              <DoctorInfoFormTextField
                label={"Degree name"}
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
          <Grid item xs={12}>
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

DoctorFormEducationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  setEducation: PropTypes.func.isRequired,
  id: PropTypes.number,
  institute: PropTypes.string,
  degree: PropTypes.string,
  subject: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  editable: PropTypes.bool,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
};

export default DoctorFormEducationModal;
