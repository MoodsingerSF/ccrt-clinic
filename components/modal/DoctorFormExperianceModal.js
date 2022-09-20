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

const DoctorFormExperianceModal = ({
  open,
  onNegativeFeedback,
  experiances,
  setExperiances,
  id = "",
  title = "",
  organizationName = "",
  departmentName = "",
  divisionName = "",
  start = "",
  end = "",
  editable = false,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);

  const [jobTitle, setJobTitle] = useState(title);
  const [organization, setOrganization] = useState(organizationName);
  const [department, setDepartment] = useState(departmentName);
  const [division, setDivision] = useState(divisionName);
  const [startYear, setStartYear] = useState(start);
  const [endYear, setEndYear] = useState(end);

  const handleSubmitExperiance = () => {
    if (validate(jobTitle, organization, department, startYear, endYear)) {
      const experianceItem = {
        id: getId.next().value.toLocaleString(),
        jobTitle,
        organization,
        department,
        division,
        startYear,
        endYear,
      };
      setExperiances([...experiances, experianceItem]);
      setJobTitle("");
      setOrganization("");
      setDepartment("");
      setDivision("");
      setStartYear("");
      setEndYear("");
      onNegativeFeedback();
    } else {
      setShowError(true);
    }
  };

  const handleSubmitEditExperiance = () => {
    if (validate(jobTitle, organization, department, startYear, endYear)) {
      const experianceItem = {
        id: id,
        jobTitle,
        organization,
        department,
        division,
        startYear,
        endYear,
      };
      setExperiances((prev) =>
        prev.map((item) => (item.id === id ? experianceItem : item))
      );
      setJobTitle("");
      setOrganization("");
      setDepartment("");
      setDivision("");
      setStartYear("");
      setEndYear("");
      onNegativeFeedback();
    } else {
      setShowError(true);
    }
  };

  const validate = (jobTitle, organization, department, startYear, endYear) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      !validateInput(jobTitle) &&
      !validateInput(organization) &&
      !validateInput(department) &&
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
              {editable ? "update experiance" : "add experiance"}
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
          <Grid item xs={12}>
            <DoctorInfoFormTextField
              placeholder={"Job title"}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              error={showError && validateInput(jobTitle)}
              errorText={"Required"}
            />
          </Grid>
          <Grid item xs={12}>
            <DoctorInfoFormTextField
              placeholder={"Ogranization"}
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              error={showError && validateInput(organization)}
              errorText={"Required"}
            />
          </Grid>
          <Grid item xs={12}>
            <DoctorInfoFormTextField
              placeholder={"Department"}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              error={showError && validateInput(department)}
              errorText={"Required"}
            />
          </Grid>
          <Grid item xs={12}>
            <DoctorInfoFormTextField
              placeholder={"Division (optional)"}
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              //   error={showError && validateInput(department)}
              //   errorText={"Required"}
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
              editable ? handleSubmitEditExperiance : handleSubmitExperiance
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

DoctorFormExperianceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  experiances: PropTypes.array.isRequired,
  setExperiances: PropTypes.func.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  organizationName: PropTypes.string,
  departmentName: PropTypes.string,
  divisionName: PropTypes.string,
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
export default DoctorFormExperianceModal;
