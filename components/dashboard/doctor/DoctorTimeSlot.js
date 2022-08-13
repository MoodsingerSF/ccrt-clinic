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
      <Typography variant="h5" component="h4">
        Time slot
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ margin: "10px" }}
      >
        <Button variant="contained">Create your schedule</Button>
      </Grid>
      <TableContainer>
        <Table
          aria-label="simple table"
          classes={{ root: classes.customTable }}
          size="small"
        >
          <TableHead>
            <TableRow
              sx={{
                borderBottom: `1.1px solid ${DEFAULT_COLOR}`,
              }}
            >
              <TableCell style={{ width: "15%" }}>Day</TableCell>
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
                        style={{
                          marginLeft: "5px",
                          marginTop: "4px",
                          cursor: "pointer",
                          fontSize: "18px",
                        }}
                      />
                    </Grid>
                  </TableCell>
                  <TableCell>
                    {day.timeSlot.map((time) => {
                      return (
                        <Chip
                          key={{ time }}
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
                          style={{
                            margin: "5px",
                            backgroundColor: DEFAULT_COLOR_MINUS_2,
                            color: "#FFFFFF",
                            border: "none",
                            height: "35px",
                            borderRadius: "3px",
                          }}
                          onClick={handleClick}
                          onDelete={handleDelete}
                          deleteIcon={<DeleteIcon />}
                        />
                      );
                    })}
                    {/* <Chip
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
                      label={ScheduleTime}
                      // label="10.00AM - 11.00AM"
                      variant="outlined"
                      style={{
                        margin: "5px",
                        backgroundColor: DEFAULT_COLOR_MINUS_2,
                        color: "#FFFFFF",
                        border: "none",
                        height: "35px",
                        borderRadius: "3px",
                      }}
                      onClick={handleClick}
                      onDelete={handleDelete}
                      deleteIcon={<DeleteIcon />}
                    /> */}
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
  customTable: {
    "& .MuiTableCell-sizeSmall": {
      padding: "0px 0px 0px 16px",
    },
  },
});
