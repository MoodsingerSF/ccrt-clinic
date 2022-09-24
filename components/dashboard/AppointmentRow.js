import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import ConfirmationModal from "../modal/ConfirmationModal";
import PropTypes from "prop-types";
import AppointmentDetailsShowBackdrop from "../backdrops/AppointmentDetailsShowBackdrop";
import { Context } from "../../contexts/user-context/UserContext";
import { Role } from "../../enums/Role";
import AppointmentTableButton from "../button/AppointmentTableButton";
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
}) => {
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
      <tr className={classes.ccrt__table__cell__row}>
        <td className={classes.ccrt__table__cell}>{index + 1}</td>
        <td className={classes.ccrt__table__cell}>
          {patient.firstName + " " + patient.lastName}
        </td>
        <td className={classes.ccrt__table__cell}>{bookingTime}</td>
        <td className={classes.ccrt__table__cell}>{timeSlot}</td>
        {/* <td className={classes.ccrt__table__cell}>{status}</td> */}
        <td className={classes.ccrt__table__cell}>
          {getRole() === Role.ADMIN && (
            <>
              <button
                style={{ textTransform: "capitalize" }}
                onClick={() => setAppointmentDetailsBackdrop(true)}
              >
                patient details
              </button>
              <button
                style={{ textTransform: "capitalize" }}
                onClick={() => setAppointmentDetailsBackdrop(true)}
              >
                doctor details
              </button>
              {status === APPOINTMENT_STATUS.PENDING && (
                <button
                  style={{ textTransform: "capitalize" }}
                  onClick={() => setAppointmentDetailsBackdrop(true)}
                >
                  cancel
                </button>
              )}
            </>
          )}
          {getRole() === Role.DOCTOR && (
            <>
              {status === APPOINTMENT_STATUS.PENDING && (
                <AppointmentTableButton
                  title={"End Appointment"}
                  onClick={() => setShowCompletionConfirmationModal(true)}
                />
              )}
              <AppointmentTableButton
                title={"view details"}
                onClick={() => setAppointmentDetailsBackdrop(true)}
              />

              {/* {status === APPOINTMENT_STATUS.PENDING && (
                <AppointmentTableButton
                  title={"Cancel Appointment"}
                  onClick={() => setShowConfirmationModal(true)}
                />
              )} */}
            </>
          )}
          {status === APPOINTMENT_STATUS.PENDING && (
            <AppointmentTableButton
              title={"Cancel Appointment"}
              onClick={() => setShowCancellationConfirmationModal(true)}
            />
          )}
          {getRole() === Role.USER && (
            <button
              style={{ textTransform: "capitalize" }}
              onClick={() => setAppointmentDetailsBackdrop(true)}
            >
              view details
            </button>
          )}
        </td>
        {(getRole() === Role.ADMIN || getRole() === Role.USER) && (
          <td className={classes.ccrt__table__cell}>{`${DoctorFee} tk`}</td>
        )}

        {(status === APPOINTMENT_STATUS.FINISHED ||
          status === APPOINTMENT_STATUS.PENDING) && (
          <td className={classes.ccrt__table__cell}>
            <AppointmentTableButton
              title={"prescription"}
              onClick={() => {
                setOpenPrescriptionForViewing(true);
              }}
            />
          </td>
        )}
        {getRole() === Role.DOCTOR && (
          <>
            {status === APPOINTMENT_STATUS.PENDING && (
              <td className={classes.ccrt__table__cell}>
                <AppointmentTableButton
                  title={"add prescription"}
                  onClick={() => {
                    setOpenPrescriptionForEditing(true);
                  }}
                  // onClick={() => setShowConfirmationModal(true)}
                />
              </td>
            )}
          </>
        )}

        {status === APPOINTMENT_STATUS.PENDING && (
          <td className={classes.ccrt__table__cell}>
            <a
              href={meetingLink}
              style={{ textDecoration: "none", fontSize: "100%" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Meeting
            </a>
            {/* <AppointmentTableButton
              title={"link"}
              // onClick={() => setShowConfirmationModal(true)}
            /> */}
          </td>
        )}
      </tr>
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
          title="Do you want to cancel it?"
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
  ccrt__table__cell__row: {
    // cursor: "pointer",
    borderBottom: "1px solid rgba(113, 110, 182, 0.15)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: theme.palette.custom.TABLE_HOVER_COLOR,
    },
  },
  ccrt__table__cell: {
    padding: "12px 6px 12px 12px",
    textAlign: "center",
    fontSize: "80%",
    textTransform: "capitalize",
    fontWeight: "400",
  },
}));

AppointmentRow.propTypes = {
  index: PropTypes.number.isRequired,
  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,

  bookingTime: PropTypes.string.isRequired,
  timeSlot: PropTypes.string.isRequired,
  // date: PropTypes.string.isRequired,
  // typeOfCancer,
  meetingLink: PropTypes.string.isRequired,
  DoctorFee: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
};

export default AppointmentRow;
