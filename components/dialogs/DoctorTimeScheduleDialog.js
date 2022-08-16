import React, { useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import { Alert, Snackbar, Typography } from "@mui/material";

const DoctorTimeScheduleDialog = ({ open, handleClose, setScheduleTime }) => {
  const [startHour, setStartHour] = useState("");
  const [startMin, setStartMin] = useState("");
  const [startAMorPM, setStartAMorPM] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMin, setEndMin] = useState("");
  const [endAMorPM, setEndAMorPM] = useState("");
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
      // setEndTime(endTime);
      console.log(startTime, endTime);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: "100%",
          }}
        >
          Create Your Schedules
        </DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small">Hour</InputLabel>
            <Select
              value={startHour}
              label="Hour"
              onChange={handleChangeStartHour}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small">Minute</InputLabel>
            <Select
              value={startMin}
              label="Hour"
              onChange={handleChangeStartMin}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"00"}>00</MenuItem>
              <MenuItem value={"01"}>01</MenuItem>
              <MenuItem value={"02"}>02</MenuItem>
              <MenuItem value={"03"}>03</MenuItem>
              <MenuItem value={"04"}>04</MenuItem>
              <MenuItem value={"05"}>05</MenuItem>
              <MenuItem value={"06"}>06</MenuItem>
              <MenuItem value={"07"}>07</MenuItem>
              <MenuItem value={"08"}>08</MenuItem>
              <MenuItem value={"09"}>09</MenuItem>
              <MenuItem value={"10"}>10</MenuItem>
              <MenuItem value={"11"}>11</MenuItem>
              <MenuItem value={"12"}>12</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel>AM/PM</InputLabel>
            <Select
              value={startAMorPM}
              label="AM/PM"
              onChange={handleChangeStartAMorPM}
            >
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="PM">PM</MenuItem>
            </Select>
          </FormControl>
          <Typography
            style={{
              textAlign: "center",
              fontSize: "100%",
              fontWeight: "700",
              margin: "10px 0",
            }}
          >
            To
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small">Hour</InputLabel>
            <Select value={endHour} label="Hour" onChange={handleChangeEndHour}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small">Minute</InputLabel>
            <Select value={endMin} label="Hour" onChange={handleChangeEndMin}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"00"}>00</MenuItem>
              <MenuItem value={"01"}>01</MenuItem>
              <MenuItem value={"02"}>02</MenuItem>
              <MenuItem value={"03"}>03</MenuItem>
              <MenuItem value={"04"}>04</MenuItem>
              <MenuItem value={"05"}>05</MenuItem>
              <MenuItem value={"06"}>06</MenuItem>
              <MenuItem value={"07"}>07</MenuItem>
              <MenuItem value={"08"}>08</MenuItem>
              <MenuItem value={"09"}>09</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={17}>17</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={19}>19</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={21}>21</MenuItem>
              <MenuItem value={22}>22</MenuItem>
              <MenuItem value={23}>23</MenuItem>
              <MenuItem value={24}>24</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel>AM/PM</InputLabel>
            <Select
              value={endAMorPM}
              label="AM/PM"
              onChange={handleChangeEndAMorPM}
            >
              <MenuItem value={"AM"}>AM</MenuItem>
              <MenuItem value={"PM"}>PM</MenuItem>
            </Select>
          </FormControl>
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
    </div>
  );
};

DoctorTimeScheduleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  setScheduleTime: PropTypes.string,
};

export default DoctorTimeScheduleDialog;
