import { Chip, Tooltip } from "@mui/material";
import React, { useState } from "react";
import {
  disableSlot,
  enableSlot,
  getSlotTimeAsString,
} from "../../../controllers/DoctorScheduleController";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import ConfirmationModal from "../../modal/ConfirmationModal";
import TimeSlotBookDialog from "../../dialogs/TimeSlotBookDialog";
import TimeSlotBookUserInfoDialog from "../../dialogs/TimeSlotBookUserInfoDialog";
const Slot = ({
  day,
  slotId,
  enabled,
  startTime,
  endTime,
  openSnackbar = () => {},
  onSuccessfulEnabling = () => {},
  onSuccessfulDisabling = () => {},
  openLoader = () => {},
  closeLoader = () => {},
  editable = false,
  clickable = false,
}) => {
  const classes = useStyles();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openTimeSlotBookedDialog, setOpenTimeSlotBookedDialog] =
    useState(false);
  const [openUserInfoModal, setOpenUserInfoModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleEnableSlot = async (slotId) => {
    try {
      openLoader();
      await enableSlot(slotId);
      setOpenConfirmationModal(false);
      closeLoader();
      onSuccessfulEnabling(day, slotId);
      openSnackbar("Time slot has been enabled successfully");
    } catch (error) {
      closeLoader();
      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };

  const handleDisableSlot = async (slotId) => {
    try {
      openLoader();
      await disableSlot(slotId);
      setOpenConfirmationModal(false);
      closeLoader();
      onSuccessfulDisabling(day, slotId);
      openSnackbar("Time slot has been disabled successfully");
    } catch (error) {
      closeLoader();
      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };
  return (
    <>
      <Chip
        key={slotId}
        label={getSlotTimeAsString({ startTime, endTime })}
        color={enabled ? "primary" : "error"}
        clickable={enabled}
        className={classes.ccrt__doctor__time__slot__chip}
        onClick={
          clickable
            ? () => {
                setOpenTimeSlotBookedDialog(true);
              }
            : null
        }
        onDelete={
          editable
            ? () => {
                setOpenConfirmationModal(true);
              }
            : null
        }
        deleteIcon={
          editable ? (
            enabled ? (
              <Tooltip title="Disable slot">
                <VisibilityOffIcon fontSize="small" />
              </Tooltip>
            ) : (
              <Tooltip title="Enable slot">
                <VisibilityIcon fontSize="small" />
              </Tooltip>
            )
          ) : null
        }
      />
      {editable && openConfirmationModal && (
        <ConfirmationModal
          title={`Are you sure you want to ${
            enabled ? "disable" : "enable"
          } this slot?`}
          subTitle={
            enabled
              ? "If you disable this slot, no patient will be able to book this slot."
              : "If you enable this slot, patients will be able to book this slot."
          }
          onNegativeFeedback={() => {
            setOpenConfirmationModal(false);
          }}
          onPositiveFeedback={() => {
            if (enabled) {
              handleDisableSlot(slotId);
            } else {
              handleEnableSlot(slotId);
            }
          }}
        />
      )}
      {clickable && openTimeSlotBookedDialog && (
        <TimeSlotBookDialog
          title="book slot for"
          onNegativeFeedback={() => {
            setOpenTimeSlotBookedDialog(false);
          }}
          onPositiveFeedback={(date) => {
            setSelectedDate(date);
            setOpenUserInfoModal(true);
          }}
          startTime={startTime}
          endTime={endTime}
          day={day}
          slotId={slotId}
        />
      )}
      {openUserInfoModal && (
        <TimeSlotBookUserInfoDialog
          onNegativeFeedback={() => {
            setOpenUserInfoModal(false);
          }}
          selectedDate={selectedDate}
        />
      )}
    </>
  );
};

Slot.propTypes = {
  day: PropTypes.string.isRequired,
  slotId: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  startTime: PropTypes.object.isRequired,
  endTime: PropTypes.object.isRequired,
  openLoader: PropTypes.func,
  closeLoader: PropTypes.func,
  onSuccessfulEnabling: PropTypes.func,
  onSuccessfulDisabling: PropTypes.func,
  openSnackbar: PropTypes.func,
  editable: PropTypes.bool,
  clickable: PropTypes.bool,
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__doctor__time__slot__chip: {
      "&:hover": {
        "& .MuiChip-deleteIcon": {
          color: "#fff",
        },
      },
      "& .MuiChip-deleteIcon": {
        color: "#fff",
        fontSize: "20px",
        marginBottom: "3px",
      },
      margin: "5px 5px 5px 0px",
      border: "none",
      height: "35px",
      borderRadius: "3px",
    },
  })
);

export default Slot;
