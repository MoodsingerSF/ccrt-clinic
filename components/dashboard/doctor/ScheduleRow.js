import { Button, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import { createSlot } from "../../../controllers/DoctorScheduleController";

import AddIcon from "@mui/icons-material/Add";
import { createStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import DoctorTimeScheduleDialog from "../../dialogs/DoctorTimeScheduleDialog";
import Slot from "./Slot";
const ScheduleRow = ({
  day,
  slots,
  openSnackbar = () => {},
  onSuccess = () => {},
  onSuccessfulEnabling = () => {},
  onSuccessfulDisabling = () => {},
  openLoader = () => {},
  closeLoader = () => {},
  editable = false,
}) => {
  const classes = useStyles();
  const [openAddSlotDialog, setOpenAddSlotDialog] = useState(false);

  const addTimeSlot = async (dayCode, startTime, endTime) => {
    try {
      openLoader();
      const data = await createSlot(dayCode, startTime, endTime);
      onSuccess(day, data);
      setOpenAddSlotDialog(false);
      closeLoader();
      openSnackbar("Time slot has been added successfully");
    } catch (error) {
      closeLoader();
      if (error && error.response) {
        openSnackbar(error.response.data.message);
      }
    }
  };

  return (
    <>
      <TableRow key={day} style={{ height: 45 }}>
        <TableCell style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          {day}
        </TableCell>
        <TableCell>
          {slots.map((slot) => {
            return (
              <Slot
                key={slot.slotId}
                day={day}
                slotId={slot.slotId}
                enabled={slot.enabled}
                startTime={slot.startTime}
                endTime={slot.endTime}
                openLoader={openLoader}
                closeLoader={closeLoader}
                openSnackbar={openSnackbar}
                onSuccessfulDisabling={onSuccessfulDisabling}
                onSuccessfulEnabling={onSuccessfulEnabling}
                editable={editable}
              />
            );
          })}
          {editable && (
            <Button
              color="primary"
              onClick={() => setOpenAddSlotDialog(true)}
              startIcon={
                <AddIcon
                  fontSize="small"
                  className={classes.ccrt__doctor__add__time__slot__icon}
                />
              }
              style={{
                fontSize: "80%",
              }}
            >
              Add New Slot
            </Button>
          )}
        </TableCell>
      </TableRow>
      {editable && (
        <DoctorTimeScheduleDialog
          open={openAddSlotDialog}
          onClose={() => {
            setOpenAddSlotDialog(false);
          }}
          onAddTimeSlot={addTimeSlot}
          day={day}
        />
      )}
    </>
  );
};

ScheduleRow.propTypes = {
  day: PropTypes.string.isRequired,
  slots: PropTypes.array.isRequired,
  openSnackbar: PropTypes.func,
  onSuccess: PropTypes.func,
  openLoader: PropTypes.func,
  closeLoader: PropTypes.func,
  onSuccessfulEnabling: PropTypes.func,
  onSuccessfulDisabling: PropTypes.func,
  editable: PropTypes.bool,
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__doctor__add__time__slot__icon: {
      // marginLeft: "5px",
      // marginTop: "4px",
      cursor: "pointer",
      fontSize: "18px",
    },

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
      margin: "5px",
      // backgroundColor: theme.palette.custom.DEFAULT_COLOR_MINUS_2,
      // color: "#FFFFFF",
      border: "none",
      height: "35px",
      borderRadius: "3px",
    },
  })
);

export default ScheduleRow;
