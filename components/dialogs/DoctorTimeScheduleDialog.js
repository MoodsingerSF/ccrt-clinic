import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import { AM_PM, hours, minutes } from "../../data/doctor-time/data";
import SelectInput from "../select-field/SelectInput";
import { createStyles, makeStyles } from "@mui/styles";
import { DAY_CODES } from "../../misc/constants";

const DoctorTimeScheduleDialog = ({ open, onClose, onAddTimeSlot, day }) => {
  const classes = useStyles();

  const [startHour, setStartHour] = useState("");
  const [startMin, setStartMin] = useState("");
  const [startAMorPM, setStartAMorPM] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMin, setEndMin] = useState("");
  const [endAMorPM, setEndAMorPM] = useState("");
  const [error, setError] = useState(false);
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

  const handleSlotAddition = () => {
    if (
      startHour === "" ||
      startMin === "" ||
      endHour === "" ||
      endMin === "" ||
      startAMorPM === "" ||
      endAMorPM === ""
    ) {
      setError(true);
    } else {
      onAddTimeSlot(
        DAY_CODES[day],
        { hour: startHour, minute: startMin, phase: startAMorPM },
        { hour: endHour, minute: endMin, phase: endAMorPM }
      );
    }
  };

  return (
    <>
      <Dialog open={open} fullWidth onClose={onClose}>
        <DialogTitle className={classes.ccrt__time_form__title}>
          Add a new time slot for {day}
        </DialogTitle>
        <DialogContent>
          {/* <Grid container style={{ width: "50vw" }}> */}
          <Grid container spacing={1}>
            <Grid item xs>
              <SelectInput
                value={startHour}
                label="Hour"
                onChange={handleChangeStartHour}
                times={hours}
              />
            </Grid>

            <Grid item xs>
              <SelectInput
                value={startMin}
                label="Minute"
                onChange={handleChangeStartMin}
                times={minutes}
              />
            </Grid>

            <Grid item xs>
              <SelectInput
                value={startAMorPM}
                label="AM/PM"
                onChange={handleChangeStartAMorPM}
                times={AM_PM}
              />
            </Grid>
          </Grid>

          <Typography className={classes.ccrt__time_form__divider}>
            To
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs>
              <SelectInput
                value={endHour}
                label="Hour"
                onChange={handleChangeEndHour}
                times={hours}
              />
            </Grid>

            <Grid item xs>
              <SelectInput
                value={endMin}
                label="Minute"
                onChange={handleChangeEndMin}
                times={minutes}
              />
            </Grid>

            <Grid item xs>
              <SelectInput
                value={endAMorPM}
                label="AM/PM"
                onChange={handleChangeEndAMorPM}
                times={AM_PM}
              />
            </Grid>
          </Grid>

          {error && (
            <Typography style={{ color: "red", fontSize: "70%", marginTop: 5 }}>
              You must select all the fields.
            </Typography>
          )}
          {/* </Grid> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSlotAddition}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DoctorTimeScheduleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddTimeSlot: PropTypes.func.isRequired,
  day: PropTypes.string.isRequired,
  // setScheduleTime: PropTypes.string,
  // clickDay: PropTypes.string,
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__time_form__title: {
      textAlign: "center",
      textTransform: "capitalize",
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
