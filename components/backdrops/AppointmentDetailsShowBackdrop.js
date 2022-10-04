import React from "react";
import {
  Avatar,
  Backdrop,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import AppointmentDetailsTypography from "../misc/AppointmentDetailsTypography";
import CloseIcon from "@mui/icons-material/Close";
import { getAgeFromBirthDate } from "../../misc/functions";
import { capitalize, lowerCase } from "lodash";
import { retrieveAppointmentResources } from "../../controllers/AppointmentController";
import ReportComp from "../dashboard/ReportComp";
import { addReport, updateReport } from "../../controllers/UserController";

const AppointmentDetailsShowBackdrop = ({
  patient,
  doctor,
  onNegativeFeedback,
  open,
  appointmentId,
  editable = false,
}) => {
  const classes = useStyles();

  const retrieveUploadedReports = async () => {
    const reports = await retrieveAppointmentResources(appointmentId);
    return reports;
  };

  return (
    <Backdrop
      sx={{
        background: "white",
        color: "black",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        overflowY: "scroll",
      }}
      open={open}
    >
      <Grid container>
        <Tooltip title="close" arrow>
          <IconButton
            className={classes.ccrt__appointment__details__close__button}
            onClick={onNegativeFeedback}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Grid
          container
          justifyContent={"center"}
          alignItems="flex-start"
          style={{ marginTop: 40 }}
        >
          <Grid item xs={3}>
            <Typography className={classes.sectionHeaderStyle}>
              Doctor Details
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="column"
            >
              <Avatar
                src={"/" + doctor.profileImageUrl}
                className={classes.imageStyle}
              />

              <Grid item xs={6}>
                <AppointmentDetailsTypography
                  heading="name"
                  text={doctor.firstName + " " + doctor.lastName}
                />
                <AppointmentDetailsTypography
                  heading="Gender"
                  text={capitalize(lowerCase(doctor.gender))}
                />
              </Grid>
            </Grid>
            <Typography className={classes.sectionHeaderStyle}>
              Patient Details
            </Typography>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction={"column"}
            >
              <Avatar
                src={"/" + patient.profileImageUrl}
                className={classes.imageStyle}
              />
              <Grid item xs={6}>
                <AppointmentDetailsTypography
                  heading="name"
                  text={patient.firstName + " " + patient.lastName}
                />
                <AppointmentDetailsTypography
                  heading="Gender"
                  text={capitalize(lowerCase(patient.gender))}
                />
                <AppointmentDetailsTypography
                  heading="Age"
                  text={getAgeFromBirthDate(patient.birthDate)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={9}
            container
            justifyContent={"center"}
            alignItems="flex-start"
            style={{ overflowY: "auto", height: "100vh" }}
          >
            <Grid
              container
              justifyContent={"center"}
              alignItems="flex-start"
              style={{ width: "90%" }}
            >
              <Typography className={classes.sectionHeaderStyle}>
                Patient Reports
              </Typography>
              <ReportComp
                retrieveReports={retrieveUploadedReports}
                editable={editable}
                addReport={addReport}
                updateReport={updateReport}
              />
              {/* <ReportComp retrieveReports={retrieveUploadedReports} />
              <ReportComp retrieveReports={retrieveUploadedReports} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__appointment__details__wrapper: {
    // width: "50%",
    height: "95vh",
    marginTop: 50,
  },
  ccrt__appointment__details__close__button: {
    position: "fixed",
    top: "2%",
    right: "2%",
  },
  sectionHeaderStyle: {
    fontSize: "120%",
    fontWeight: "bold",
    textAlign: "center",
    color: theme.palette.custom.BLACK,
    marginBottom: 20,
  },
  imageStyle: {
    height: "20vh",
    width: "20vh",
    border: `1px solid ${theme.palette.custom.DEFAULT_COLOR}`,
    marginBottom: 10,
    background: theme.palette.custom.BLACK,
  },
}));
AppointmentDetailsShowBackdrop.propTypes = {
  onNegativeFeedback: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
  editable: PropTypes.bool,

  // gender: PropTypes.string.isRequired,
  // dateOfBirth: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
};
export default AppointmentDetailsShowBackdrop;
