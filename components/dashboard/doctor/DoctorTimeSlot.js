import React, { useState } from "react";
import {
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DoctorTimeScheduleDialog from "../../dialogs/DoctorTimeScheduleDialog";
import { Days } from "../../../data/doctor-time/data";

const DoctorTimeSlot = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState(false);
  // const [ScheduleTime, setScheduleTime] = useState("");
  // console.log("sate", ScheduleTime);
  const [clickDay, setClickDay] = useState("");
  const [disableDay, setDisableDay] = useState(true);

  const handleClickOpen = (day) => {
    setOpen(true);
    setClickDay(day);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (time) => {
    if (disableDay === false) {
      console.log("You are not able to click");
    } else {
      console.log("You clicked the Chip.");
      console.log(time);
    }
  };

  const handleDelete = (deleteTime, day) => {
    console.log("You clicked the delete icon.");
    // console.log(deleteTime);
    // console.log(day.day);
    // const times = Days.filter((day) =>
    //   day.timeSlot.filter((time) => time !== deleteTime)
    // );
    // console.log(times);
  };

  // let weekday = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ][new Date().getDay()];
  // console.log(weekday);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "50px" }}
    >
      <Typography
        variant="h5"
        component="h2"
        className={classes.ccrt__dctr__time__slot__header}
      >
        Create your schedule
      </Typography>
      <TableContainer>
        <Table
          aria-label="simple table"
          classes={{ root: classes.customTable }}
          size="small"
        >
          <TableHead>
            <TableRow className={classes.ccrt__dctr__time__slot__table__header}>
              <TableCell style={{ width: matchesMD ? "15%" : "38%" }}>
                Day
              </TableCell>
              <TableCell>Time Schedules</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Days.map((day) => {
              return (
                <TableRow key={day.id}>
                  <TableCell>
                    <Grid container style={{ margin: "10px 0" }}>
                      {day.day}
                      <AddIcon
                        onClick={() => handleClickOpen(day.day)}
                        fontSize="small"
                        className={classes.ccrt__dctr__add__time__slot__icon}
                      />
                    </Grid>
                  </TableCell>
                  <TableCell>
                    {day.timeSlot.map((time, index) => {
                      return (
                        <Chip
                          key={index}
                          label={time}
                          color={disableDay ? "primary" : "error"}
                          clickable={disableDay}
                          className={classes.ccrt__dctr__time__slot__chip}
                          onClick={() => handleClick(time)}
                          onDelete={() => handleDelete(time, day)}
                          // onDelete={() => day.timeSlot.splice(index, 1)}
                          deleteIcon={<DeleteIcon />}
                        />
                      );
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <DoctorTimeScheduleDialog
        open={open}
        handleClose={handleClose}
        // setScheduleTime={setScheduleTime}
        clickDay={clickDay}
      />
    </Grid>
  );
};

export default DoctorTimeSlot;

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dctr__time__slot__header: {
      margin: "30px 0",
      fontWeight: "500",
      fontSize: "135%",
    },
    customTable: {
      "& .MuiTableCell-sizeSmall": {
        padding: "0px 0px 0px 16px",
      },
    },
    ccrt__dctr__time__slot__table__header: {
      borderBottom: `1.1px solid ${theme.palette.custom.DEFAULT_COLOR}`,
    },
    ccrt__dctr__add__time__slot__icon: {
      marginLeft: "5px",
      marginTop: "4px",
      cursor: "pointer",
      fontSize: "18px",
    },

    ccrt__dctr__time__slot__chip: {
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
