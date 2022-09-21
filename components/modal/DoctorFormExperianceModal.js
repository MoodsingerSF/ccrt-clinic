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
import BasicDatePicker from "../misc/BasicDatePicker";
import {
  addExperiance,
  updateExperience,
} from "../../controllers/UserController";
import CustomButton from "../button/CustomButton";

const DoctorFormExperianceModal = ({
  open,
  onNegativeFeedback,
  onPositiveFeedback,
  setExperiances,
  id = null,
  titleName = "",
  organizationName = "",
  departmentName = null,
  divisionName = null,
  start = null,
  end = null,
  editable = false,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);

  const [title, setTitle] = useState(titleName);
  const [organization, setOrganization] = useState(organizationName);
  const [department, setDepartment] = useState(departmentName);
  const [division, setDivision] = useState(divisionName);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const [loading, setLoading] = useState(false);

  const handleSubmitExperiance = async () => {
    try {
      if (!validate(title, organization, startDate, endDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await addExperiance(
        title,
        organization,
        department,
        division,
        startDate,
        endDate
      );
      console.log("Clicked");
      setLoading(false);
      onPositiveFeedback(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEditExperiance = async () => {
    try {
      if (!validate(title, organization, startDate, endDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await updateExperience(
        id,
        title,
        organization,
        department,
        division,
        startDate,
        endDate
      );
      setExperiances((prev) =>
        prev.map((item) => (item.id === id ? data : item))
      );
      setLoading(false);
      onNegativeFeedback();
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (title, organization, startDate, endDate) => {
    let isEverythingAllRight = true;
    isEverythingAllRight =
      !validateInput(title) &&
      !validateInput(organization) &&
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={showError && validateInput(title)}
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
              placeholder={"Department (optional)"}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              // error={showError && validateInput(department)}
              // errorText={"Required"}
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
              editable ? handleSubmitEditExperiance : handleSubmitExperiance
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

DoctorFormExperianceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  onPositiveFeedback: PropTypes.func.isRequired,
  setExperiances: PropTypes.func.isRequired,
  id: PropTypes.number,
  title: PropTypes.string,
  organizationName: PropTypes.string,
  departmentName: PropTypes.string,
  divisionName: PropTypes.string,
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
export default DoctorFormExperianceModal;
