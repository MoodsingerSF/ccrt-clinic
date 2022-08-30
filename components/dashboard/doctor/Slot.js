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
const Slot = ({
  day,
  slotId,
  enabled,
  startTime,
  endTime,
  openSnackbar,
  onSuccessfulEnabling,
  onSuccessfulDisabling,
  openLoader,
  closeLoader,
}) => {
  const classes = useStyles();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
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
        onDelete={() => {
          setOpenConfirmationModal(true);
        }}
        deleteIcon={
          enabled ? (
            <Tooltip title="Disable slot">
              <VisibilityOffIcon fontSize="small" />
            </Tooltip>
          ) : (
            <Tooltip title="Enable slot">
              <VisibilityIcon fontSize="small" />
            </Tooltip>
          )
        }
      />
      {openConfirmationModal && (
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
    </>
  );
};

Slot.propTypes = {
  day: PropTypes.string.isRequired,
  slotId: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  startTime: PropTypes.object.isRequired,
  endTime: PropTypes.object.isRequired,
  openLoader: PropTypes.func.isRequired,
  closeLoader: PropTypes.func.isRequired,
  onSuccessfulEnabling: PropTypes.func.isRequired,
  onSuccessfulDisabling: PropTypes.func.isRequired,
  openSnackbar: PropTypes.func.isRequired,
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
