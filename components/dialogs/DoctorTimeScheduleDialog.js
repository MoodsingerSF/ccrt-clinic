import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { Alert, Snackbar, Typography } from "@mui/material";
import { AM_PM, Days, hours, minutes } from "../../data/doctor-time/data";
import SelectInput from "../select-field/SelectInput";
import { createStyles, makeStyles } from "@mui/styles";

const DoctorTimeScheduleDialog = ({ open, handleClose, clickDay }) => {
  const classes = useStyles();

  const [startHour, setStartHour] = useState("");
  const [startMin, setStartMin] = useState("");
  const [startAMorPM, setStartAMorPM] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMin, setEndMin] = useState("");
  const [endAMorPM, setEndAMorPM] = useState("");
  const [ScheduleTime, setScheduleTime] = useState("");
  console.log(ScheduleTime);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChangeStartHour = (event) => {
    setStartHour(event.target.value);
  };
  const handleChangeStartMin = (e) => {
    setStartMin(e.target.value);
  };
  const handleChangeEndHour = (event) => {
    setEndHour(event.target.value);
  };
  const handleChangeEndMin = (e) => {
    setEndMin(e.target.value);
  };
  const handleChangeStartAMorPM = (e) => {
    setStartAMorPM(e.target.value);
  };
  const handleChangeEndAMorPM = (e) => {
    setEndAMorPM(e.target.value);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleSaveDctrTimeSchedule = () => {
    if (
      startHour === "" ||
      startMin === "" ||
      endHour === "" ||
      endMin === "" ||
      startAMorPM === "" ||
      endAMorPM === ""
    ) {
      setOpenSnackbar(true);
    } else {
      const startTime = `${startHour}:${startMin} ${startAMorPM}`;
      const endTime = `${endHour}:${endMin} ${endAMorPM}`;

      setScheduleTime(`${startTime} - ${endTime}`);
      console.log(startTime, endTime);
      const testDay = Days.find((item) => item.day === clickDay);
      console.log(testDay);
      testDay.timeSlot.push(ScheduleTime);

      setStartHour("");
      setStartMin("");
      setStartAMorPM("");
      setEndHour("");
      setEndMin("");
      setEndAMorPM("");
      // setScheduleTime("");
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.ccrt__time_form__title}>
          Create Your Schedules
        </DialogTitle>
        <DialogContent>
          <SelectInput
            value={startHour}
            label="Hour"
            onChange={handleChangeStartHour}
            times={hours}
          />

          <SelectInput
            value={startMin}
            label="Minute"
            onChange={handleChangeStartMin}
            times={minutes}
          />

          <SelectInput
            value={startAMorPM}
            label="AM/PM"
            onChange={handleChangeStartAMorPM}
            times={AM_PM}
          />
          <Typography className={classes.ccrt__time_form__divider}>
            To {clickDay}
          </Typography>
          <SelectInput
            value={endHour}
            label="Hour"
            onChange={handleChangeEndHour}
            times={hours}
          />

          <SelectInput
            value={endMin}
            label="Minute"
            onChange={handleChangeEndMin}
            times={minutes}
          />

          <SelectInput
            value={endAMorPM}
            label="AM/PM"
            onChange={handleChangeEndAMorPM}
            times={AM_PM}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveDctrTimeSchedule}>Save</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Invalid Input Time
        </Alert>
      </Snackbar>
    </>
  );
};

DoctorTimeScheduleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // setScheduleTime: PropTypes.string,
  clickDay: PropTypes.string,
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__time_form__title: {
      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "100%",
    },
    ccrt__time_form__divider: {
      textAlign: "center",
      fontSize: "100%",
      fontWeight: "700",
      margin: "10px 0",
    },
  })
);
export default DoctorTimeScheduleDialog;
