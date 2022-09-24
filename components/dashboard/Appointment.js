import React, { useContext, useState } from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import DashboardTitle from "./DashboardTitle";
import {
  APPOINTMENT_STATUS,
  DASHBOARD_TITLE_MARGIN_TOP,
} from "../../misc/constants";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import { makeStyles, createStyles } from "@mui/styles";
import AppointmentRow from "./AppointmentRow";
import { Role } from "../../enums/Role";
import { Context } from "../../contexts/user-context/UserContext";
import BasicDatePicker from "../misc/BasicDatePicker";
import dayjs from "dayjs";
import { capitalize, lowerCase } from "lodash";
import { processDate } from "../../misc/functions";
import useAppointmentsOfUser from "../../hooks/useAppointmentsOfUser";
import CustomButton from "../button/CustomButton";
import LoaderComponent from "../misc/LoaderComponent";

const getDate = (dateObj) => {
  const date = new Date(dateObj["$d"]);
  return processDate(date);
};

const Appointment = () => {
  const classes = useStyles();
  const { getRole } = useContext(Context);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(APPOINTMENT_STATUS.PENDING);
  const [date, setDate] = useState(dayjs());
  const { appointments, loading, hasMore } = useAppointmentsOfUser(
    page,
    15,
    getDate(date),
    status
  );
  // console.log(appointments)

  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
      >
        <DashboardTitle title={"Appointments"} />
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        style={{ margin: "10px 0" }}
      >
        <Grid>
          <BasicDatePicker
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
              setPage(0);
            }}
          />
        </Grid>
        <Grid style={{ position: "relative" }}>
          <TextField
            style={{ width: "200px" }}
            size="small"
            id="outlined-select-currency"
            select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(0);
            }}
          >
            {Object.keys(APPOINTMENT_STATUS).map((key) => (
              <MenuItem key={key} value={APPOINTMENT_STATUS[key]}>
                {capitalize(lowerCase(key))}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Grid container>
        {loading ? (
          <LoaderComponent />
        ) : appointments.length === 0 ? (
          <NoContentToShowComponent title={"There is no appointment."} />
        ) : (
          <Grid container>
            <table className={classes.ccrt__table}>
              <thead className={classes.ccrt__table__head}>
                <tr className={classes.ccrt__table__heading__row}>
                  <th className={classes.ccrt__table__heading}>Id</th>
                  <th className={classes.ccrt__table__heading}>Patient Name</th>
                  <th className={classes.ccrt__table__heading}>Booking Time</th>
                  <th className={classes.ccrt__table__heading}>Slot Time</th>
                  {/* <th className={classes.ccrt__table__heading}>Status</th> */}
                  <th className={classes.ccrt__table__heading}>Actions</th>
                  {(getRole() === Role.ADMIN || getRole() === Role.USER) && (
                    <th className={classes.ccrt__table__heading}>Doctor Fee</th>
                  )}

                  {(status === APPOINTMENT_STATUS.FINISHED ||
                    status === APPOINTMENT_STATUS.PENDING) && (
                    <th className={classes.ccrt__table__heading}>
                      Prescription
                    </th>
                  )}
                  {/* {filterValue === "cancelled" && (
                    <th className={classes.ccrt__table__heading}>
                      Cancellation Time
                    </th>
                  )} */}
                  {status === APPOINTMENT_STATUS.PENDING &&
                    getRole() === Role.DOCTOR && (
                      <th className={classes.ccrt__table__heading}>
                        Prescription
                      </th>
                    )}

                  {status === APPOINTMENT_STATUS.PENDING && (
                    <th className={classes.ccrt__table__heading}>
                      Meeting Link
                    </th>
                  )}
                </tr>
              </thead>
              <tbody style={{}}>
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
      background: theme.palette.primary.main_minus_2,
    },
    ccrt__table__heading__row: {
      color: "#fff",
    },
    ccrt__table__heading: {
      padding: "18px 6px 18px 12px",
      fontSize: "90%",
      fontWeight: "500",
    },
  })
);
export default Appointment;
