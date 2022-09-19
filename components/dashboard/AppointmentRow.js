import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import ConfirmationModal from "../modal/ConfirmationModal";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import AppointmentDetailsShowBackdrop from "../backdrops/AppointmentDetailsShowBackdrop";
import { Context } from "../../contexts/user-context/UserContext";
import { Role } from "../../enums/Role";
import AppointmentTableButton from "../button/AppointmentTableButton";

const AppointmentRow = ({
  index,
  patient,
  patientName,
  bookingTime,
  timeSlot,
  date,
  gender,
  typeOfCancer,
  meetingLink,
  fileList,
  DoctorFee,
  status,
  dateOfBirth,
}) => {
  const classes = useStyles();
  const { getRole } = useContext(Context);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [appointmentDetailsBackdrop, setAppointmentDetailsBackdrop] =
    useState(false);

  const handleCompleteAppointment = () => {};
  const handleDeleteAppointment = () => {};
  return (
    <>
      <tr className={classes.ccrt__table__cell__row}>
        <td className={classes.ccrt__table__cell}>{index + 1}</td>
        <td className={classes.ccrt__table__cell}>{patientName}</td>
        <td className={classes.ccrt__table__cell}>{bookingTime}</td>
        <td className={classes.ccrt__table__cell}>{timeSlot}</td>
        <td className={classes.ccrt__table__cell}>{status}</td>
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
              {status === "upcomming" && (
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
              {status === "upcomming" && (
                <AppointmentTableButton
                  title={"complete"}
                  onClick={() => setShowConfirmationModal(true)}
                />
              )}
              <AppointmentTableButton
                title={"patient details"}
                onClick={() => setAppointmentDetailsBackdrop(true)}
              />

              {status === "upcomming" && (
                <AppointmentTableButton
                  title={" cancel"}
                  onClick={() => setShowConfirmationModal(true)}
                />
              )}
            </>
          )}
          {getRole() === Role.USER && (
            <button
              style={{ textTransform: "capitalize" }}
              onClick={() => setAppointmentDetailsBackdrop(true)}
            >
              doctor details
            </button>
          )}
        </td>
        {getRole() === Role.ADMIN && (
          <td className={classes.ccrt__table__cell}>{DoctorFee}</td>
        )}
        {getRole() === Role.USER && (
          <td className={classes.ccrt__table__cell}>{DoctorFee}</td>
        )}

        {status === "finished" && (
          <td className={classes.ccrt__table__cell}>
            <AppointmentTableButton
              title={"prescription"}
              // onClick={() => setShowConfirmationModal(true)}
            />
          </td>
        )}
        {getRole() === Role.DOCTOR && (
          <>
            {status === "upcomming" && (
              <td className={classes.ccrt__table__cell}>
                <AppointmentTableButton
                  title={"add prescription"}
                  // onClick={() => setShowConfirmationModal(true)}
                />
              </td>
            )}
          </>
        )}

        {status === "upcomming" && (
          <td className={classes.ccrt__table__cell}>
            <AppointmentTableButton
              title={"link"}
              // onClick={() => setShowConfirmationModal(true)}
            />
          </td>
        )}
      </tr>
      {showConfirmationModal && (
        <ConfirmationModal
          title="You complete it?"
          onPositiveFeedback={handleCompleteAppointment}
          onNegativeFeedback={() => {
            setShowConfirmationModal(false);
          }}
        />
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          title="You want to delete it?"
          onPositiveFeedback={handleDeleteAppointment}
          onNegativeFeedback={() => {
            setShowConfirmationModal(false);
          }}
        />
      )}
      {appointmentDetailsBackdrop && (
        <AppointmentDetailsShowBackdrop
          patient={patient}
          patientName={patientName}
          gender={gender}
          dateOfBirth={dateOfBirth}
          typeOfCancer={typeOfCancer}
          fileList={fileList}
          open={appointmentDetailsBackdrop}
          onNegativeFeedback={() => {
            setAppointmentDetailsBackdrop(false);
          }}
        />
      )}
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
};

export default AppointmentRow;
