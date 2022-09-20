import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import ConfirmationModal from "../modal/ConfirmationModal";
import { IconButton, Tooltip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PropTypes from "prop-types";
import AppointmentDetailsShowBackdrop from "../backdrops/AppointmentDetailsShowBackdrop";

const AppointmentRow = ({ index, patient }) => {
  const classes = useStyles();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [appointmentDetailsBackdrop, setAppointmentDetailsBackdrop] =
    useState(false);

  const handleCompleteAppointment = () => {};
  return (
    <>
      <tr className={classes.ccrt__table__cell__row}>
        <td className={classes.ccrt__table__cell}>{index + 1}</td>
        <td className={classes.ccrt__table__cell}>{patient.name}</td>
        <td className={classes.ccrt__table__cell}>{patient.timeSlot}</td>
        <td className={classes.ccrt__table__cell}>{patient.date}</td>
        <td className={classes.ccrt__table__cell}>
          <Tooltip title="complete" arrow>
            <IconButton
              size="small"
              variant="contained"
              color="success"
              onClick={() => setShowConfirmationModal(true)}
            >
              <DoneIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="view" arrow>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={() => setAppointmentDetailsBackdrop(true)}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </td>
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
      {appointmentDetailsBackdrop && (
        <AppointmentDetailsShowBackdrop
          patient={patient}
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
    cursor: "pointer",
    borderBottom: "1px solid rgba(113, 110, 182, 0.15)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: theme.palette.custom.TABLE_HOVER_COLOR,
    },
  },
  ccrt__table__cell: {
    padding: "12px 6px 12px 12px",
    wordWrap: "break-word",
    textAlign: "center",
    fontSize: "90%",
  },
}));

AppointmentRow.propTypes = {
  index: PropTypes.number.isRequired,
  patient: PropTypes.object.isRequired,
};

export default AppointmentRow;
