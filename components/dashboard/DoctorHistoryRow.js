import React, { useState } from "react";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "../modal/ConfirmationModal";
import PropTypes from "prop-types";

const DoctorHistoryRow = ({
  index,
  name,
  timeSlot,
  date,
  status,
  userId,
  patientList,
  setPatientList,
}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleDeleteCompleteTask = () => {
    const patients = [...patientList];
    const patient = patients.filter((t) => t.id !== userId);
    setPatientList(patient);
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{timeSlot}</TableCell>
        <TableCell align="center">{date}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => setShowConfirmationModal(true)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      {showConfirmationModal && (
        <ConfirmationModal
          title="Are you sure you want to delete this patient history?"
          onPositiveFeedback={handleDeleteCompleteTask}
          onNegativeFeedback={() => {
            setShowConfirmationModal(false);
          }}
        />
      )}
    </>
  );
};

DoctorHistoryRow.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  timeSlot: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  patientList: PropTypes.array.isRequired,
  setPatientList: PropTypes.func.isRequired,
};
export default DoctorHistoryRow;
