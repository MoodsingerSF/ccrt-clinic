import React from "react";
import { Backdrop, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import AppointmentDetailsTypography from "../misc/AppointmentDetailsTypography";
import CloseIcon from "@mui/icons-material/Close";
import AppointmentDetailsShowReportRow from "../dashboard/AppointmentDetailsShowReportRow";

const AppointmentDetailsShowBackdrop = ({
  // patient,
  patientName,
  gender,
  dateOfBirth,
  typeOfCancer,
  fileList,
  onNegativeFeedback,
  open,
}) => {
  const classes = useStyles();

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
          <AppointmentDetailsTypography heading="name" text={patientName} />
          <AppointmentDetailsTypography heading="Gender" text={gender} />
          <AppointmentDetailsTypography
            heading="Date of birth"
            text={dateOfBirth}
          />
          <AppointmentDetailsTypography
            heading="Type of Cancer"
            text={typeOfCancer}
          />
          <Grid container justifyContent={"center"} alignItems="center">
            <Grid container>
              <Typography
                style={{
                  fontSize: "95%",
                  textTransform: "capitalize",
                }}
              >
                Reports:
              </Typography>
            </Grid>
            {fileList.map((fileItem) => (
              <AppointmentDetailsShowReportRow
                key={fileItem.id}
                fileItem={fileItem}
              />
            ))}
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
  patient: PropTypes.object.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
export default AppointmentDetailsShowBackdrop;
