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

const DoctorFormEducationModal = ({
  open,
  onNegativeFeedback,
  education,
  setEducation,
  id = "",
  institute = "",
  degree = "",
  subject = "",
  start = "",
  end = "",
  editable = false,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);

  const [degreeName, setDegreeName] = useState(degree);
  const [subjectName, setSubjectName] = useState(subject);
  const [instituteName, setInstituteName] = useState(institute);
  const [startYear, setStartYear] = useState(start);
  const [endYear, setEndYear] = useState(end);

  const handleSubmitEducation = () => {
    if (validate(degreeName, subjectName, instituteName, startYear, endYear)) {
      const degree = {
        id: getId.next().value.toLocaleString(),
        degreeName,
        subjectName,
        instituteName,
        startYear,
        endYear,
      };
      setEducation([...education, degree]);
      setDegreeName("");
      setSubjectName("");
      setInstituteName("");
      setStartYear("");
      setEndYear("");
      onNegativeFeedback();
    } else {
      setShowError(true);
    }
  };

  const handleSubmitEditEducation = () => {
    if (validate(degreeName, subjectName, instituteName, startYear, endYear)) {
      const degree = {
        id: id,
        degreeName,
        subjectName,
        instituteName,
        startYear,
        endYear,
      };
      setEducation((prev) =>
        prev.map((item) => (item.id === id ? degree : item))
      );
      setDegreeName("");
      setSubjectName("");
      setInstituteName("");
      setStartYear("");
      setEndYear("");
      onNegativeFeedback();
    } else {
      setShowError(true);
    }
  };

  const validate = (
    degreeName,
    subjectName,
    instituteName,
    startYear,
    endYear
  ) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      !validateInput(degreeName) &&
      !validateInput(subjectName) &&
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
                placeholder={"Degree name"}
                value={degreeName}
                onChange={(e) => setDegreeName(e.target.value)}
                error={showError && validateInput(degreeName)}
                errorText={"Required"}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <DoctorInfoFormTextField
                placeholder={"Subject"}
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                error={showError && validateInput(subjectName)}
                errorText={"Required"}
              />
            </Grid>
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
            onClick={
              editable ? handleSubmitEditEducation : handleSubmitEducation
            }
          >
            {editable ? "update" : "save"}
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles((theme) => ({
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
  education: PropTypes.array.isRequired,
  setEducation: PropTypes.func.isRequired,
  id: PropTypes.string,
  institute: PropTypes.string,
  degree: PropTypes.string,
  subject: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
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
