import React, { useState } from "react";
import { Modal, Typography, Grid, TextField, useTheme } from "@mui/material";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";

import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import CustomButton from "../button/CustomButton";

import { endAppointment } from "../../controllers/AppointmentController";

const AppointmentConfirmationModal = ({
  open,
  onClose,
  appointmentId,
  openSnackbar,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const onEndAppointment = async () => {
    try {
      setLoading(true);
      const hasEnded = await endAppointment(appointmentId, code);
      if (hasEnded) {
        openSnackbar("Appointment has been ended successfully.");
      }
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };

  return (
    <Modal open={open}>
      <Grid
        container
        // className={classes.modal__container}
        className={classNames({
          [classes.modal__container_Mobile]: !matches,
          [classes.modal__container_DesktopSm]: matches,
          [classes.modal__container_DesktopMd]: matchesMD,
          [classes.modal__container_DesktopLg]: matchesLG,
        })}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h6" component="h2">
            {"End the appointment"}
          </Typography>
          <Grid container justifyContent="center" alignItems="center">
            <Typography className={classes.modal__subtitle}>
              {
                "Please enter the code below, a code was sent to patient's email address. "
              }
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
          <TextField
            size="small"
            fullWidth
            color="primary"
            placeholder="Enter Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Grid>

        <Grid
          container
          spacing={2}
          style={{ marginTop: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={6}>
            <CustomButton title={"Cancel"} onClick={onClose} />
          </Grid>
          <Grid item xs={6}>
            <CustomButton
              loading={loading}
              title={"End Appointment"}
              onClick={onEndAppointment}
            />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

const useStyles = makeStyles({
  modal__container_Mobile: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: DEFAULT_COLOR_MINUS_2,
    textAlign: "center",
    width: "90%",
    background: "#fff",
    borderRadius: "6px",
    padding: "50px 50px",
    boxShadow: 24,
  },
  modal__container_DesktopSm: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: DEFAULT_COLOR_MINUS_2,
    textAlign: "center",
    width: "50%",
    background: "#fff",
    borderRadius: "6px",
    padding: "50px 50px",
    boxShadow: 24,
  },
  modal__container_DesktopMd: {
    width: "50%",
  },
  modal__container_DesktopLg: {
    width: "40%",
  },
  modal__subtitle: {
    marginBottom: "20px",
    fontSize: "80%",
  },
});

AppointmentConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointmentId: PropTypes.string.isRequired,
  openSnackbar: PropTypes.func.isRequired,
};
export default AppointmentConfirmationModal;
