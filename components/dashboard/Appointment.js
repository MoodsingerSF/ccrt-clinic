/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Grid } from "@mui/material";
import DashboardTitle from "./DashboardTitle";
import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import DashboardLoaderComponent from "./DashboardLoaderComponent";
import { makeStyles, createStyles } from "@mui/styles";
import AppointmentRow from "./AppointmentRow";
import test from "../../public/image/home-page/doctors/trial.jpg";
import { Role } from "../../enums/Role";
import { Context } from "../../contexts/user-context/UserContext";
import BasicDatePicker from "../misc/BasicDatePicker";
import dayjs from "dayjs";
import DashboardFilterComponent from "../misc/DashboardFilterComponent";

const Appointment = () => {
  const classes = useStyles();
  const { getRole } = useContext(Context);

  const [patientList, setPatientList] = useState([
    {
      id: "1",
      name: "Md. Samsuzzaman Shakil",
      timeSlot: "10.00 AM - 10.20 AM",
      date: "19-9-2022",
      bookingTime: "10.00 AM",
      gender: "male",
      dateOfBirth: "12-10-1996",
      typeOfCancer: "Blood cancer",
      fileList: [
        { id: "1", title: "X-ray", file: test },
        { id: "2", title: "Blood test", file: test },
      ],
      status: "finished",
      fee: "500",
      meetingLink: "iwgfiywegfyiwgiyfgwiyi",
    },
    {
      id: "2",
      name: "Apple",
      timeSlot: "10.30 AM - 10.50 AM",
      date: "19-9-2022",
      bookingTime: "10.00 AM",
      gender: "male",
      dateOfBirth: "12-10-1996",
      typeOfCancer: "Blood cancer",
      fileList: [
        { id: "1", title: "X-ray", file: test },
        { id: "2", title: "Blood test", file: test },
      ],
      status: "cancelled",
      fee: "500",
      meetingLink: "iwgfiywegfyiwgiyfgwiyi",
    },
    {
      id: "3",
      name: "Kuber",
      timeSlot: "11.00 AM - 11.20 AM",
      date: "19-9-2022",
      bookingTime: "10.00 AM",
      gender: "male",
      dateOfBirth: "12-10-1996",
      typeOfCancer: "Blood cancer",
      fileList: [
        { id: "1", title: "X-ray", file: test },
        { id: "2", title: "Blood test", file: test },
      ],
      status: "pending",
      fee: "500",
      meetingLink: "iwgfiywegfyiwgiyfgwiyi",
    },
    {
      id: "4",
      name: "Apple",
      timeSlot: "10.00 AM - 10.20 AM",
      date: "18-9-2022",
      bookingTime: "10.00 AM",
      gender: "male",
      dateOfBirth: "12-10-1996",
      typeOfCancer: "Blood cancer",
      fileList: [
        { id: "1", title: "X-ray", file: test },
        { id: "2", title: "Blood test", file: test },
      ],
      status: "finished",
      fee: "500",
      meetingLink: "iwgfiywegfyiwgiyfgwiyi",
    },
    {
      id: "5",
      name: "Kuber",
      timeSlot: "10.30 AM - 10.50 AM",
      date: "17-9-2022",
      bookingTime: "10.00 AM",
      gender: "male",
      dateOfBirth: "12-10-1996",
      typeOfCancer: "Blood cancer",
      fileList: [
        { id: "1", title: "X-ray", file: test },
        { id: "2", title: "Blood test", file: test },
      ],
      status: "cancelled",
      fee: "500",
      meetingLink: "iwgfiywegfyiwgiyfgwiyi",
    },
    {
      id: "6",
      name: "Md. Samsuzzaman Shakil",
      timeSlot: "11.00 AM - 11.20 AM",
      date: "19-9-2022",
      bookingTime: "10.00 AM",
      gender: "male",
      dateOfBirth: "12-10-1996",
      typeOfCancer: "Blood cancer",
      fileList: [
        { id: "1", title: "X-ray", file: test },
        { id: "2", title: "Blood test", file: test },
      ],
      status: "pending",
      fee: "500",
      meetingLink: "iwgfiywegfyiwgiyfgwiyi",
    },
  ]);
  const [filterValue, setFilterValue] = useState("pending");
  const [value, setValue] = useState(dayjs());

  const date = new Date(value["$d"]);
  const filterDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const [loading, setLoading] = useState(false);

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
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </Grid>
        <Grid style={{ position: "relative" }}>
          <DashboardFilterComponent
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid container>
        {loading ? (
          <DashboardLoaderComponent />
        ) : patientList.length === 0 ? (
          <NoContentToShowComponent title={"There is no patients"} />
        ) : (
          <Grid container>
            <table className={classes.ccrt__table}>
              <thead className={classes.ccrt__table__head}>
                <tr className={classes.ccrt__table__heading__row}>
                  <th className={classes.ccrt__table__heading}>Id</th>
                  <th className={classes.ccrt__table__heading}>Patient Name</th>
                  <th className={classes.ccrt__table__heading}>Booking Time</th>
                  <th className={classes.ccrt__table__heading}>Slot Time</th>
                  <th className={classes.ccrt__table__heading}>Status</th>
                  <th className={classes.ccrt__table__heading}>Actions</th>
                  {getRole() === Role.ADMIN && (
                    <th className={classes.ccrt__table__heading}>Doctor Fee</th>
                  )}
                  {getRole() === Role.USER && (
                    <th className={classes.ccrt__table__heading}>Doctor Fee</th>
                  )}

                  {filterValue === "finished" && (
                    <th className={classes.ccrt__table__heading}>
                      Prescription
                    </th>
                  )}
                  {/* {filterValue === "cancelled" && (
                    <th className={classes.ccrt__table__heading}>
                      Cancellation Time
                    </th>
                  )} */}
                  {filterValue === "pending" && getRole() === Role.DOCTOR && (
                    <th className={classes.ccrt__table__heading}>
                      Prescription
                    </th>
                  )}

                  {filterValue === "pending" && (
                    <th className={classes.ccrt__table__heading}>
                      Meeting Link
                    </th>
                  )}
                </tr>
              </thead>
              <tbody style={{}}>
                {patientList
                  .filter((items) => items.date === filterDate)
                  .filter((item) => item.status === filterValue)
                  .map((patient, index) => {
                    return (
                      <AppointmentRow
                        key={patient.id}
                        index={index}
                        patientName={patient.name}
                        bookingTime={patient.bookingTime}
                        timeSlot={patient.timeSlot}
                        date={patient.date}
                        gender={patient.gender}
                        typeOfCancer={patient.typeOfCancer}
                        meetingLink={patient.meetingLink}
                        fileList={patient.fileList}
                        DoctorFee={patient.fee}
                        status={patient.status}
                        dateOfBirth={patient.dateOfBirth}
                        // patient={patient}
                      />
                    );
                  })}
              </tbody>
            </table>
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
