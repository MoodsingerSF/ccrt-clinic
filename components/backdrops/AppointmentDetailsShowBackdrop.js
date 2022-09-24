import React from "react";
import { Backdrop, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import AppointmentDetailsTypography from "../misc/AppointmentDetailsTypography";
import CloseIcon from "@mui/icons-material/Close";
import { getAgeFromBirthDate } from "../../misc/functions";
import { capitalize, lowerCase } from "lodash";
import { retrieveAppointmentResources } from "../../controllers/AppointmentController";
import ReportComp from "../dashboard/ReportComp";

const AppointmentDetailsShowBackdrop = ({
  patient,
  doctor,
  onNegativeFeedback,
  open,
  appointmentId,
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
      <Tooltip title="close" arrow>
        <IconButton
          className={classes.ccrt__appointment__details__close__button}
          onClick={onNegativeFeedback}
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <Grid container justifyContent={"center"} alignItems="center">
        <Grid className={classes.ccrt__appointment__details__wrapper}>
          <Typography
            style={{
              fontSize: "100%",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Patient Details
          </Typography>
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
          <Typography
            style={{
              fontSize: "100%",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Doctor Details
          </Typography>
          <AppointmentDetailsTypography
            heading="name"
            text={doctor.firstName + " " + doctor.lastName}
          />
          <AppointmentDetailsTypography
            heading="Gender"
            text={capitalize(lowerCase(doctor.gender))}
          />

          {/* <AppointmentDetailsTypography
            heading="Type of Cancer"
            text={typeOfCancer}
          /> */}
          <Grid container justifyContent={"center"} alignItems="center">
            <Typography
              style={{
                fontSize: "100%",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Patient Reports
            </Typography>
            <ReportComp retrieveReports={retrieveUploadedReports} />
            {/* {fileList.map((fileItem) => (
              <AppointmentDetailsShowReportRow
                key={fileItem.id}
                fileItem={fileItem}
              />
            ))} */}
          </Grid>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__appointment__details__wrapper: {
    width: "50%",
    height: "95vh",
  },
  ccrt__appointment__details__close__button: {
    position: "fixed",
    top: "2%",
    right: "2%",
  },
}));
AppointmentDetailsShowBackdrop.propTypes = {
  onNegativeFeedback: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,

  // gender: PropTypes.string.isRequired,
  // dateOfBirth: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
};
export default AppointmentDetailsShowBackdrop;
