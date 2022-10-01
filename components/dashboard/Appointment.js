import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import DashboardTitle from "./DashboardTitle";
import {
  APPOINTMENT_STATUS,
  DASHBOARD_TITLE_MARGIN_TOP,
} from "../../misc/constants";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import { makeStyles, createStyles } from "@mui/styles";
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
  // const { getRole } = useContext(Context);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(APPOINTMENT_STATUS.PENDING);
  const [date, setDate] = useState(dayjs());
  const { appointments, loading, hasMore } = useAppointmentsOfUser(
    page,
    15,
    getDate(date),
    status
  );
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
            <table className={classes.ccrt__table}>
              <thead className={classes.ccrt__table__head}>
                <tr className={classes.ccrt__table__heading__row}>
                  {/* <th className={classes.ccrt__table__heading}><Typography>Id</Typography></th> */}
                  <th className={classes.ccrt__table__heading}>
                    <Typography className={classes.titleStyle}>
                      Patient Name
                    </Typography>
                  </th>
                  <th className={classes.ccrt__table__heading}>
                    <Typography className={classes.titleStyle}>
                      Booking Time
                    </Typography>
                  </th>
                  <th className={classes.ccrt__table__heading}>
                    <Typography className={classes.titleStyle}>
                      Slot Time
                    </Typography>
                  </th>
                  {/* <th className={classes.ccrt__table__heading}>Status</th> */}
                  <th className={classes.ccrt__table__heading}>
                    {" "}
                    <Typography className={classes.titleStyle}>
                      Actions
                    </Typography>
                  </th>
                  {/* {(getRole() === Role.ADMIN || getRole() === Role.USER) && ( */}
                  <th className={classes.ccrt__table__heading}>
                    <Typography className={classes.titleStyle}>
                      Doctor Fee
                    </Typography>
                  </th>
                  {/* )} */}

                  {(status === APPOINTMENT_STATUS.FINISHED ||
                    status === APPOINTMENT_STATUS.PENDING) && (
                    <th className={classes.ccrt__table__heading}>
                      <Typography className={classes.titleStyle}>
                        Prescription
                      </Typography>
                    </th>
                  )}
                  {/* {filterValue === "cancelled" && (
                    <th className={classes.ccrt__table__heading}>
                      Cancellation Time
                    </th>
                  )} */}
                  {/* {status === APPOINTMENT_STATUS.PENDING &&
                    getRole() === Role.DOCTOR && (
                      <th className={classes.ccrt__table__heading}>
                        <Typography className={classes.titleStyle}>
                          Prescription
                        </Typography>
                      </th>
                    )} */}

                  {status === APPOINTMENT_STATUS.PENDING && (
                    <th className={classes.ccrt__table__heading}>
                      <Typography className={classes.titleStyle}>
                        Meeting Link
                      </Typography>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => {
                  return (
                    <AppointmentRow
                      key={appointment.appointmentId}
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
                  );
                })}
              </tbody>
            </table>
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
    ccrt__table: {
      background: "#fff",
      lineHeight: "1.25",
      marginBottom: "24px",
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: "0",
    },
    ccrt__table__head: {
      background: theme.palette.custom.BLACK,
    },
    ccrt__table__heading__row: {
      color: "#fff",
    },
    ccrt__table__heading: {
      padding: "18px 6px 18px 12px",
      fontSize: "90%",
      fontWeight: "500",
    },
    titleStyle: {
      color: "white",
      fontSize: "85%",
    },
  })
);
export default Appointment;
