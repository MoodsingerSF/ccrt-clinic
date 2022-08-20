import React, { useState } from "react";
import {
  Button,
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
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DEFAULT_COLOR, DEFAULT_COLOR_MINUS_2 } from "../../../misc/colors";
import DoctorTimeScheduleDialog from "../../dialogs/DoctorTimeScheduleDialog";

const Days = [
  {
    id: "1",
    day: "Saturday",
    timeSlot: ["1:00 PM - 1:10 PM", "1:00 PM - 1:10 PM"],
  },
  {
    id: "2",
    day: "Sunday",
    timeSlot: [],
  },
  {
    id: "3",
    day: "Monday",
    timeSlot: [],
  },

  {
    id: "4",
    day: "Tuesday",
    timeSlot: [],
  },
  {
    id: "5",
    day: "Wednesday",
    timeSlot: [],
  },
  {
    id: "6",
    day: "Thursday",
    timeSlot: [],
  },
  {
    id: "7",
    day: "Friday",
    timeSlot: ["1:00 PM - 1:10 PM"],
  },
];

const DoctorTimeSlot = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState(false);
  const [ScheduleTime, setScheduleTime] = useState("");

  const handleClickOpen = (day) => {
    setOpen(true);
    console.log(day);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    console.log("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.log("You clicked the delete icon.");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
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
                          key={{ index }}
                          sx={{
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
                          }}
                          label={time}
                          // label="10.00AM - 11.00AM"
                          variant="outlined"
                          className={classes.ccrt__dctr__time__slot__chip}
                          onClick={handleClick}
                          onDelete={handleDelete}
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
        setScheduleTime={setScheduleTime}
      />
    </Grid>
  );
};

export default DoctorTimeSlot;

const useStyles = makeStyles({
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
    borderBottom: `1.1px solid ${DEFAULT_COLOR}`,
  },
  ccrt__dctr__add__time__slot__icon: {
    marginLeft: "5px",
    marginTop: "4px",
    cursor: "pointer",
    fontSize: "18px",
  },
  ccrt__dctr__time__slot__chip: {
    margin: "5px",
    backgroundColor: DEFAULT_COLOR_MINUS_2,
    color: "#FFFFFF",
    border: "none",
    height: "35px",
    borderRadius: "3px",
  },
});
