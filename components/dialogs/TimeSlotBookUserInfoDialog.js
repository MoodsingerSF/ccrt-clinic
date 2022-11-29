import React from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogContent,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@mui/styles";
import ReportComp from "../dashboard/ReportComp";
import {
  addAppointmentResource,
  retrieveAppointmentResources,
  updateAppointmentResource,
} from "../../controllers/AppointmentController";
import CustomButton from "../button/CustomButton";

const TimeSlotBookUserInfoDialog = ({
  onNegativeFeedback,
  appointmentId,
  openSnackbar,
}) => {
  const classes = useStyles();

  const getAppointmentResources = async (appointmentId) => {
    const resources = await retrieveAppointmentResources(appointmentId);
    return resources;
  };

  const handleCreateAppointmentResource = async (title, image) => {
    const resource = await addAppointmentResource(appointmentId, title, image);
    return resource;
  };

  const handleUpdateAppointmentResource = async (resourceId, image) => {
    const resource = await updateAppointmentResource(
      appointmentId,
      resourceId,
      image
    );
    return resource;
  };

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={onNegativeFeedback}
      maxWidth={false}
      PaperProps={{ background: "green" }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar className={classes.ccrt__toolbar}>
          <Typography className={classes.ccrt__toolbar__title}>
            {"Patient's Medical Reports"}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onNegativeFeedback}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent style={{ margin: 0, padding: 0 }}>
        <Grid container justifyContent={"center"} alignItems="center">
          <Grid
            container
            justifyContent={"center"}
            alignItems="flex-start"
            // flexDirection={"column"}
            style={{ width: "95%", marginBottom: "10vh" }}
          >
            <Grid container item xs={12} md={6}>
              <ReportComp
                retrieveReports={() => getAppointmentResources(appointmentId)}
                addReport={handleCreateAppointmentResource}
                updateReport={handleUpdateAppointmentResource}
                editable={true}
              />

              <CustomButton
                title="Continue"
                onClick={() => {
                  openSnackbar("Reports has been added to the appointment.");
                  onNegativeFeedback();
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    ccrt__toolbar__title: {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "85%",
      fontWeight: "500",
    },
  })
);

TimeSlotBookUserInfoDialog.propTypes = {
  onNegativeFeedback: PropTypes.bool.isRequired,
  appointmentId: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};

export default TimeSlotBookUserInfoDialog;
