import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { date } from "../misc/GetDate";
import { makeStyles } from "@mui/styles";

const TimeSlotBookDialog = ({
  title,
  onNegativeFeedback,
  timeSlot,
  day,
  onPositiveFeedback,
}) => {
  const classes = useStyles();
  const [getAllDate, setGetAllDate] = useState(null);
  const [selectDate, setSelectDate] = useState("");
  console.log(selectDate);
  const handleChangeSelectedDate = (event, newAlignment) => {
    setSelectDate(newAlignment);
  };

  // console.log(getAllDate);
  const handleGetAllDate = () => {
    const allDate = date.find((item) => item.day === day);
    setGetAllDate(allDate);
    // console.log(allDate);
  };

  useEffect(() => {
    handleGetAllDate();
  }, []);

  return (
    <Dialog open={true} onClose={onNegativeFeedback}>
      <DialogTitle>
        <Typography
          style={{
            textTransform: "capitalize",
            fontSize: "90%",
            fontWeight: "300",
          }}
        >
          {title} <strong>{day}</strong>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          <Typography style={{ textAlign: "center", marginBottom: "20px" }}>
            <strong>{timeSlot}</strong>
          </Typography>
        </DialogContentText>
        <ToggleButtonGroup
          value={selectDate}
          exclusive
          onChange={handleChangeSelectedDate}
          aria-label="Platform"
        >
          {getAllDate?.date.map((dateItem, index) => (
            <ToggleButton
              key={index}
              className={classes.selected}
              value={dateItem}
            >
              {dateItem}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNegativeFeedback}>Cancel</Button>
        <Button
          onClick={() => {
            if (!selectDate) {
              // setOpenUserInfoModal(false);
              return;
            } else {
              onPositiveFeedback(selectDate);
              // setOpenUserInfoModal(true);
            }
            onNegativeFeedback();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme) => ({
  selected: {
    "&&": {
      background: theme.palette.primary.main,
      color: "#fff",
      margin: "5px",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

TimeSlotBookDialog.propTypes = {
  title: PropTypes.string.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  onPositiveFeedback: PropTypes.func.isRequired,
  day: PropTypes.string.isRequired,
  timeSlot: PropTypes.func.isRequired,
};

export default TimeSlotBookDialog;
