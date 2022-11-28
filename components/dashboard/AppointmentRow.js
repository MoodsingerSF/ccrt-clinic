import React, { useContext, useState } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import ConfirmationModal from "../modal/ConfirmationModal";
import PropTypes from "prop-types";
import AppointmentDetailsShowBackdrop from "../backdrops/AppointmentDetailsShowBackdrop";
import { Context } from "../../contexts/user-context/UserContext";
import { Role } from "../../enums/Role";
import {
  APPOINTMENT_STATUS,
  SNACKBAR_INITIAL_STATE,
} from "../../misc/constants";
import AppointmentConfirmationModal from "../modal/AppointmentConfirmationModal";
import LoaderBackdrop from "../backdrops/LoaderBackdrop";
import { cancelAppointment } from "../../controllers/AppointmentController";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import PrescriptionModal from "../modal/PrescriptionModal";
import { Grid, TableCell, Typography, useMediaQuery } from "@mui/material";
import ActionButton from "../button/ActionButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

const AppointmentRow = ({
  index,
  patient,
  doctor,
  bookingTime,
  timeSlot,
  appointmentId,
  meetingLink,
  DoctorFee,
  status,
  date,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  const { getRole } = useContext(Context);
  const [openPrescriptionForViewing, setOpenPrescriptionForViewing] =
    useState(false);
  const [openPrescriptionForEditing, setOpenPrescriptionForEditing] =
    useState(false);

  const [showCompletionConfirmationModal, setShowCompletionConfirmationModal] =
    useState(false);
  const [
    showCancellationConfirmationModal,
    setShowCancellationConfirmationModal,
  ] = useState(false);
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);

  const [appointmentDetailsBackdrop, setAppointmentDetailsBackdrop] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };
  const handleDeleteAppointment = async () => {
    try {
      setLoading(true);
      const hasCancelled = await cancelAppointment(appointmentId);
      if (hasCancelled) {
        openSnackbar("Appointment has been cancelled successfully.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };
  return (
    <>
      <TableCell align="left">
        <Typography className={classes.textStyle}>
          {index + 1}. {patient.firstName + " " + patient.lastName}
        </Typography>
      </TableCell>
      {isDesktop && (
        <TableCell align="center">
          <Typography className={classes.textStyle}>{bookingTime}</Typography>
        </TableCell>
      )}
      <TableCell align="center">
        <Typography className={classes.textStyle}>{timeSlot}</Typography>
      </TableCell>
      {/* <TableCell >{status}</TableCell> */}
      <TableCell align="center">
        <Grid item style={{ marginRight: 10, marginBottom: 10 }}>
          <ActionButton
            title="View Details"
            icon={<VisibilityIcon />}
            type="info"
            onClick={() => setAppointmentDetailsBackdrop(true)}
          />
        </Grid>
        {getRole() === Role.DOCTOR && (
          <>
            {status === APPOINTMENT_STATUS.PENDING && (
              <Grid item style={{ marginRight: 10, marginBottom: 10 }}>
                <ActionButton
                  title={"End Appointment"}
                  onClick={() => setShowCompletionConfirmationModal(true)}
                  type="success"
                  icon={<CheckIcon />}
                />
              </Grid>
            )}
          </>
        )}
        {status === APPOINTMENT_STATUS.PENDING && (
          <Grid item style={{ marginRight: 10, marginBottom: 10 }}>
            <ActionButton
              icon={<ClearIcon />}
              title="Cancel Appointment"
              type="error"
              onClick={() => setShowCancellationConfirmationModal(true)}
            />
          </Grid>
        )}
      </TableCell>

      {isDesktop && (
        <TableCell align="center">
          <Typography
            className={classes.textStyle}
          >{`${DoctorFee} tk`}</Typography>
        </TableCell>
      )}

      {(status === APPOINTMENT_STATUS.FINISHED ||
        status === APPOINTMENT_STATUS.PENDING) && (
        <TableCell align="center">
          <ActionButton
            title={
              getRole() === Role.DOCTOR
                ? "Edit Prescription"
                : "View Prescription"
            }
            onClick={() => {
              if (getRole() === Role.DOCTOR) {
                setOpenPrescriptionForEditing(true);
              } else {
                setOpenPrescriptionForViewing(true);
              }
            }}
            type="info"
            icon={getRole() === Role.DOCTOR ? <EditIcon /> : <VisibilityIcon />}
          />
        </TableCell>
      )}

      {status === APPOINTMENT_STATUS.PENDING && (
        <TableCell align="center">
          <a
            href={meetingLink}
            className={classes.linkStyle}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Meeting
          </a>
        </TableCell>
      )}
      {showCompletionConfirmationModal && (
        <AppointmentConfirmationModal
          open={showCompletionConfirmationModal}
          onClose={() => setShowCompletionConfirmationModal(false)}
          appointmentId={appointmentId}
          openSnackbar={openSnackbar}
        />
      )}
      {showCancellationConfirmationModal && (
        <ConfirmationModal
          title="Do you want to cancel this appointment?"
          onPositiveFeedback={handleDeleteAppointment}
          onNegativeFeedback={() => {
            setShowCancellationConfirmationModal(false);
          }}
        />
      )}
      {<LoaderBackdrop open={loading} />}
      {appointmentDetailsBackdrop && (
        <AppointmentDetailsShowBackdrop
          patient={patient}
          doctor={doctor}
          open={appointmentDetailsBackdrop}
          onNegativeFeedback={() => {
            setAppointmentDetailsBackdrop(false);
          }}
          appointmentId={appointmentId}
          editable={getRole() === Role.USER && new Date(date) < new Date()}
        />
      )}
      {openPrescriptionForEditing && (
        <PrescriptionModal
          open={true}
          onClose={() => {
            setOpenPrescriptionForEditing(false);
          }}
          appointmentId={appointmentId}
          patient={patient}
          doctor={doctor}
          editable={true}
        />
      )}
      {openPrescriptionForViewing && (
        <PrescriptionModal
          open={true}
          onClose={() => {
            setOpenPrescriptionForViewing(false);
          }}
          appointmentId={appointmentId}
          patient={patient}
          doctor={doctor}
          date={date}
        />
      )}
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  textStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "85%",
    fontWeight: 500,
  },
  linkStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "85%",
    textDecoration: "none",
    letterSpacing: 0,
    fontWeight: 600,
  },
}));

AppointmentRow.propTypes = {
  index: PropTypes.number.isRequired,
  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,

  bookingTime: PropTypes.string.isRequired,
  timeSlot: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  // typeOfCancer,
  meetingLink: PropTypes.string.isRequired,
  DoctorFee: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
};

export default AppointmentRow;
