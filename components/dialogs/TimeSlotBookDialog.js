import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
// import { date } from "../misc/GetDate";
import { makeStyles } from "@mui/styles";
import { getSlotTimeAsString } from "../../controllers/DoctorScheduleController";
import moment from "moment/moment";
import { processDate } from "../../misc/functions";
import {
  getDayCode,
  prettyDate,
  retrieveNextDates,
} from "../../controllers/DateController";
import { retrieveLastAppointmentDates } from "../../controllers/AppointmentController";
import LoaderComponent from "../misc/LoaderComponent";
import classNames from "classnames";

const TimeSlotBookDialog = ({
  slotId,
  title,
  onNegativeFeedback,
  startTime,
  endTime,
  day,
  onPositiveFeedback,
}) => {
  const classes = useStyles();
  const [possibleDates, setPossibleDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const handleChangeSelectedDate = (event, selected) => {
    const foundDate = possibleDates.find((item) => item.date === selected);
    if (foundDate && !foundDate.isBooked) setSelectedDate(selected);
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // console.log(getAllDate);
  const retrieveNextAvailableDays = () => {
    const currentDate = new Date();
    const currDay = currentDate.getDay();
    const slotDay = getDayCode(day);
    if (slotDay === currDay) {
      const modHour =
        parseInt(startTime.hour) +
        (startTime.phase === "AM"
          ? 0
          : parseInt(startTime.hour) !== 12
          ? 12
          : 0);
      const startTimeString = `${modHour}:${startTime.minute}`;

      const nextDaysIntervals = [7, 14, 21, 28];
      const nextDates = retrieveNextDates(currentDate, nextDaysIntervals);
      const currentDateStr = processDate(currentDate);
      const slotStartTime = moment(currentDateStr + " " + startTimeString);
      if (moment().isAfter(slotStartTime)) {
        return nextDates;
      } else {
        return [processDate(currentDate), ...nextDates.slice(0, 3)];
      }
    } else {
      const now = moment();
      const firstDate = now
        .add(
          slotDay > currDay ? slotDay - currDay : 6 - currDay + slotDay + 1,
          "days"
        )
        .toDate();
      // console.log(firstDate.toDate());
      const nextDates = retrieveNextDates(firstDate, [7, 14, 21]);
      // return nextDates;
      return [processDate(firstDate), ...nextDates];
    }
  };

  const getNextPossibleDates = async (slotId) => {
    try {
      setLoading(true);
      const lastAppointmentDates = await retrieveLastAppointmentDates(slotId);

      const nextAvailableDays = retrieveNextAvailableDays();
      const dateObjects = nextAvailableDays.map((item) => ({
        date: item,
        isBooked: lastAppointmentDates.includes(item),
      }));
      setPossibleDates(dateObjects);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNextPossibleDates(slotId);
  }, [slotId]);

  return (
    <Dialog open={true} onClose={onNegativeFeedback} maxWidth="md">
      <DialogTitle>
        <Typography
          style={{
            textTransform: "capitalize",
            fontSize: "75%",
            // fontWeight: 400,
          }}
        >
          {title} <strong>{day}</strong>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="alert-dialog-description">
          <Typography style={{ textAlign: "center", marginBottom: "20px" }}>
            <strong>{getSlotTimeAsString({ startTime, endTime })}</strong>
          </Typography>
        </DialogContentText>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ width: "37vw", height: "18vh" }}
        >
          {loading ? (
            <LoaderComponent />
          ) : (
            <Grid container>
              <Grid container justifyContent="center" alignItems="center">
                <ToggleButtonGroup
                  value={selectedDate}
                  exclusive
                  onChange={handleChangeSelectedDate}
                  aria-label="Platform"
                >
                  {possibleDates.map((dateItem, index) => (
                    <ToggleButton
                      key={index}
                      className={classNames({
                        [classes.selected]: dateItem.isBooked,
                        [classes.nonSelected]: !dateItem.isBooked,
                      })}
                      value={dateItem.date}
                    >
                      <Typography style={{ fontSize: "80%", fontWeight: 500 }}>
                        {prettyDate(dateItem.date)}
                      </Typography>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Grid>
              {error && (
                <Grid container justifyContent="center" alignItems="center">
                  <Typography style={{ fontSize: "75%", color: "red" }}>
                    You must select a date on which you want to make an
                    appointment
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onNegativeFeedback}>Cancel</Button>
        <Button
          onClick={() => {
            if (!selectedDate) {
              setError(true);
              return;
            } else {
              onPositiveFeedback(selectedDate);
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
  nonSelected: {
    "&&": {
      background: theme.palette.primary.main,
      color: "#fff",
      margin: "5px",
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  selected: {
    "&&": {
      background: theme.palette.custom.GREY,
      color: "#fff",
      margin: "5px",
    },
    cursor: "no-drop",
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: theme.palette.secondary.GREY,
    },
  },
}));

TimeSlotBookDialog.propTypes = {
  slotId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onNegativeFeedback: PropTypes.func.isRequired,
  onPositiveFeedback: PropTypes.func.isRequired,
  day: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
};

export default TimeSlotBookDialog;
