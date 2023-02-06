import React, { useState } from "react";
import { Grid, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoctorInfoFormTextField from "../textfields/DoctorInfoFormTextField";
import PropTypes from "prop-types";
import {
  validateDate,
  validateInput,
} from "../../controllers/DoctorInfoFormController";
import BasicDatePicker from "../misc/BasicDatePicker";
import {
  addExperience,
  updateExperience,
} from "../../controllers/UserController";
import CustomButton from "../button/CustomButton";
import { prettyDateDayjs } from "../../controllers/DateController";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";

const DoctorFormExperienceModal = ({
  open,
  onNegativeFeedback,
  onPositiveFeedback,
  setExperiences,
  id = null,
  titleName = "",
  organizationName = "",
  departmentName = null,
  divisionName = null,
  start = null,
  end = null,
  editable = false,
  openSnackbar,
}) => {
  const classes = useStyles();
  const [showError, setShowError] = useState(false);

  const [title, setTitle] = useState(titleName);
  const [organization, setOrganization] = useState(organizationName);
  const [department, setDepartment] = useState(departmentName);
  const [division, setDivision] = useState(divisionName);
  const [startDate, setStartDate] = useState(start ? dayjs(start) : dayjs());
  const [endDate, setEndDate] = useState(end ? dayjs(end) : dayjs());
  const [loading, setLoading] = useState(false);

  const handleSubmitExperience = async () => {
    const sDate = prettyDateDayjs(startDate).dateObj;
    const eDate = prettyDateDayjs(endDate).dateObj;
    try {
      if (!validate(title, organization, sDate, eDate)) {
        setShowError(true);
        return;
      }
      setLoading(true);
      const data = await addExperience(
        title,
        organization,
        department,
        division,
        sDate,
        eDate
      );
      setLoading(false);
      onPositiveFeedback(data);
      openSnackbar("Experience entity has been added successfully.");
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.message);
      }
    }
  };

  const handleSubmitEditExperience = async () => {
    const sDate = prettyDateDayjs(startDate).dateObj;
    const eDate = prettyDateDayjs(endDate).dateObj;
    try {
      if (!validate(title, organization, sDate, eDate)) {
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
        sDate,
        eDate
      );
      setExperiences((prev) =>
        prev.map((item) => (item.id === id ? data : item))
      );
      setLoading(false);
      onNegativeFeedback();
      openSnackbar("Experience entity has been updated successfully.");
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        const { data } = error.response;
        openSnackbar(data.message);
      }
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
                {editable ? "update experience" : "add experience"}
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
                label={"Job Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={showError && validateInput(title)}
                errorText={"Required"}
              />
            </Grid>
            <Grid item xs={12}>
              <DoctorInfoFormTextField
                label={"Organization"}
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                error={showError && validateInput(organization)}
                errorText={"Required"}
              />
            </Grid>
            <Grid item xs={12}>
              <DoctorInfoFormTextField
                label={"Department (optional)"}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                // error={showError && validateInput(department)}
                // errorText={"Required"}
              />
            </Grid>
            <Grid item xs={12}>
              <DoctorInfoFormTextField
                label={"Division (optional)"}
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                //   error={showError && validateInput(department)}
                //   errorText={"Required"}
              />
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} md={12} lg={6}>
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
              <Grid item xs={12} md={12} lg={6}>
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
                editable ? handleSubmitEditExperience : handleSubmitExperience
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

DoctorFormExperienceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  onPositiveFeedback: PropTypes.func.isRequired,
  setExperiences: PropTypes.func.isRequired,
  id: PropTypes.number,
  title: PropTypes.string,
  organizationName: PropTypes.string,
  departmentName: PropTypes.string,
  divisionName: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  editable: PropTypes.bool,
  titleName: PropTypes.string,
  openSnackbar: PropTypes.func.isRequired,
};
const useStyles = makeStyles((theme) => ({
  ccrt__modal__appbar__wrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  ccrt__modal__appbar__text: {
    fontSize: "100%",
    fontWeight: 500,
    textTransform: "capitalize",
    color: theme.palette.custom.BLACK,
    // marginLeft: 10,
  },
  ccrt__modal__content__container: {
    paddingBottom: 10,
  },
  ccrt__modal__footer__container: {
    marginBottom: 10,
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
export default DoctorFormExperienceModal;
