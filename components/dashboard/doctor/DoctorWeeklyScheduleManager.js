import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import DashboardTitle from "../DashboardTitle";
import { getSchedule } from "../../../controllers/DoctorScheduleController";
import DashboardLoaderComponent from "../DashboardLoaderComponent";
import NoContentToShowComponent from "../../misc/NoContentToShowComponent";
import { SNACKBAR_INITIAL_STATE } from "../../../misc/constants";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import {
  handleSnackbarClose,
  handleSnackbarOpen,
} from "../../../misc/functions";
import ScheduleRow from "./ScheduleRow";
import LoaderBackdrop from "../../backdrops/LoaderBackdrop";
// import ConfirmationModal from "../../modal/ConfirmationModal";

const DoctorWeeklyScheduleManager = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  // eslint-disable-next-line no-unused-vars
  const [disableDay, setDisableDay] = useState(true);
  const [schedule, setSchedule] = useState({
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });
  const [loading, setLoading] = useState(false);
  const [openLoaderBackdrop, setOpenLoaderBackdrop] = useState(false);

  // const handleClickOpen = (day) => {
  //   setOpen(true);
  //   setClickDay(day);
  // };

  // const handleClick = (time) => {
  //   if (disableDay === false) {
  //     console.log("You are not able to click");
  //   } else {
  //     // console.log("You clicked the Chip.");
  //     console.log(time);
  //   }
  // };

  // eslint-disable-next-line no-unused-vars
  const handleDelete = (dayId, slotId) => {
    // setSchedule((prev) =>
    //   prev.map((day) => {
    //     if (day.id === dayId) {
    //       return {
    //         ...day,
    //         timeSlots: day.timeSlots.filter((slot) => slot.id !== slotId),
    //       };
    //     } else return day;
    //   })
    // );
  };

  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  const retrieveDoctorSchedule = async () => {
    try {
      setLoading(true);
      const data = await getSchedule();
      setSchedule(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    retrieveDoctorSchedule();
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 20 }}
    >
      <DashboardTitle title="Manage Weekly Schedule" />
      {loading ? (
        <DashboardLoaderComponent />
      ) : schedule === null ? (
        <NoContentToShowComponent title="No schedule to show" />
      ) : (
        <TableContainer style={{ marginTop: 20 }}>
          <Table
            aria-label="simple table"
            classes={{ root: classes.customTable }}
            size="small"
          >
            <TableHead>
              <TableRow
                className={classes.ccrt__doctor__time__slot__table__header}
              >
                <TableCell
                  style={{
                    width: matchesMD ? "15%" : "38%",
                    fontWeight: "bold",
                  }}
                >
                  Day
                </TableCell>
                <TableCell style={{ fontWeight: "bold", textAlign: "left" }}>
                  Time Schedule
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.keys(schedule).map((day) => {
                return (
                  <ScheduleRow
                    key={day}
                    day={day}
                    slots={schedule[day]}
                    openSnackbar={openSnackbar}
                    onSuccess={(dayCode, data) => {
                      setSchedule((prev) => ({ ...prev, [dayCode]: data }));
                    }}
                    openLoader={() => setOpenLoaderBackdrop(true)}
                    closeLoader={() => setOpenLoaderBackdrop(false)}
                    onSuccessfulEnabling={(day, slotId) => {
                      setSchedule((prev) => ({
                        ...prev,
                        [day]: prev[day].map((slot) => {
                          if (slot.slotId === slotId)
                            return { ...slot, enabled: true };
                          else return slot;
                        }),
                      }));
                    }}
                    onSuccessfulDisabling={(day, slotId) => {
                      setSchedule((prev) => ({
                        ...prev,
                        [day]: prev[day].map((slot) => {
                          if (slot.slotId === slotId)
                            return { ...slot, enabled: false };
                          else return slot;
                        }),
                      }));
                    }}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => {
          handleSnackbarClose(setSnackbar);
        }}
      />
      <LoaderBackdrop open={openLoaderBackdrop} />
      {/* <ConfirmationModal title="Are you sure you want to remove this slot?" /> */}
    </Grid>
  );
};

export default DoctorWeeklyScheduleManager;

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__doctor__time__slot__header: {
      margin: "30px 0",
      fontWeight: "500",
      fontSize: "135%",
    },
    customTable: {
      "& .MuiTableCell-sizeSmall": {
        padding: "0px 0px 0px 16px",
      },
    },
    ccrt__doctor__time__slot__table__header: {
      borderBottom: `1.1px solid ${theme.palette.custom.DEFAULT_COLOR}`,
    },
  })
);
