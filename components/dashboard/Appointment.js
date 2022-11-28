import React, { useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DashboardTitle from "./DashboardTitle";
import {
  APPOINTMENT_STATUS,
  DASHBOARD_TITLE_MARGIN_TOP,
} from "../../misc/constants";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import { makeStyles, createStyles, useTheme } from "@mui/styles";
import AppointmentRow from "./AppointmentRow";
// import { Role } from "../../enums/Role";
// import { Context } from "../../contexts/user-context/UserContext";
import BasicDatePicker from "../misc/BasicDatePicker";
import dayjs from "dayjs";
import { processDate } from "../../misc/functions";
import useAppointmentsOfUser from "../../hooks/useAppointmentsOfUser";
import CustomButton from "../button/CustomButton";
import LoaderComponent from "../misc/LoaderComponent";
import DashboardFilterComponent from "../misc/DashboardFilterComponent";

const getDate = (dateObj) => {
  const date = new Date(dateObj["$d"]);
  return processDate(date);
};

const Appointment = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(APPOINTMENT_STATUS.PENDING);
  const [date, setDate] = useState(dayjs());
  const { appointments, loading, hasMore } = useAppointmentsOfUser(
    page,
    15,
    getDate(date),
    status
  );
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
      >
        <DashboardTitle title={"Appointments"}>
          <DashboardFilterComponent
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
            options={APPOINTMENT_STATUS}
          />
        </DashboardTitle>
      </Grid>
      <Grid
        container
        // justifyContent={"space-between"}
        alignItems="center"
        style={{ marginBottom: 10 }}
      >
        <Grid item style={{ marginLeft: 0 }}>
          <BasicDatePicker
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
              setPage(0);
            }}
          />
        </Grid>
      </Grid>
      <Grid container>
        {loading ? (
          <LoaderComponent />
        ) : appointments.length === 0 ? (
          <NoContentToShowComponent title={"No appointments to show."} />
        ) : (
          <Grid container>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography className={classes.titleStyle}>
                        Patient Name
                      </Typography>
                    </TableCell>
                    {isDesktop && (
                      <TableCell align="center">
                        <Typography className={classes.titleStyle}>
                          Booking Time
                        </Typography>
                      </TableCell>
                    )}
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Slot Time
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography className={classes.titleStyle}>
                        Actions
                      </Typography>
                    </TableCell>
                    {isDesktop && (
                      <TableCell align="center">
                        <Typography className={classes.titleStyle}>
                          Doctor Fee
                        </Typography>
                      </TableCell>
                    )}

                    {(status === APPOINTMENT_STATUS.FINISHED ||
                      status === APPOINTMENT_STATUS.PENDING) && (
                      <TableCell align="center">
                        <Typography className={classes.titleStyle}>
                          Prescription
                        </Typography>
                      </TableCell>
                    )}

                    {status === APPOINTMENT_STATUS.PENDING && (
                      <TableCell align="center">
                        <Typography className={classes.titleStyle}>
                          Meeting Link
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment, index) => {
                    return (
                      <TableRow key={appointment.appointmentId} hover>
                        <AppointmentRow
                          appointmentId={appointment.appointmentId}
                          index={index}
                          meetingLink={appointment.meetingLink}
                          date={appointment.date}
                          bookingTime={appointment.creationTime}
                          timeSlot={appointment.timeSlot}
                          DoctorFee={appointment.fee}
                          status={appointment.status}
                          patient={appointment.patient}
                          doctor={appointment.doctor}
                        />
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container justifyContent={"center"} alignItems="center">
              <Grid item xs={12} sm={4}>
                {hasMore && (
                  <CustomButton
                    title={"Load More"}
                    // loading={loading}
                    onClick={() => setPage((prev) => prev + 1)}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    table: {
      "& thead th": {
        background: theme.palette.custom.BLACK,
      },

      "& tbody tr:hover": {
        background: theme.palette.custom.TABLE_HOVER_COLOR,
      },
    },
    titleStyle: {
      color: "white",
      fontSize: "85%",
      fontWeight: 500,
    },
  })
);
export default Appointment;
