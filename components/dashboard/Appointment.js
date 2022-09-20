import React, { useState } from "react";
import { Grid } from "@mui/material";
import DashboardTitle from "./DashboardTitle";
import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import DashboardLoaderComponent from "./DashboardLoaderComponent";
import { makeStyles, createStyles } from "@mui/styles";
import AppointmentRow from "./AppointmentRow";
import test from "../../public/image/home-page/doctors/trial.jpg";

const Appointment = () => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [patientList, setPatientList] = useState([
    {
      id: "1",
      name: "Md. Samsuzzaman Shakil",
      timeSlot: "10.00 AM - 10.20 AM",
      date: "12-09-2022",
      gender: "male",
      dateOfBirth: "12-10-1996",
      typeOfCancer: "Blood cancer",
      fileList: [
        { id: "1", title: "X-ray", file: test },
        { id: "2", title: "Blood test", file: test },
      ],
    },
    {
      id: "2",
      name: "Apple",
      timeSlot: "10.30 AM - 10.50 AM",
      date: "12-09-2022",
      gender: "male",
      dateOfBirth: "12-10-1996",
      typeOfCancer: "Blood cancer",
      fileList: [
        { id: "1", title: "X-ray", file: test },
        { id: "2", title: "Blood test", file: test },
      ],
    },
    {
      id: "3",
      name: "Kuber",
      timeSlot: "11.00 AM - 11.20 AM",
      date: "12-09-2022",
      gender: "male",
      dateOfBirth: "12-10-1996",
      typeOfCancer: "Blood cancer",
      fileList: [
        { id: "1", title: "X-ray", file: test },
        { id: "2", title: "Blood test", file: test },
      ],
    },
  ]);
  // eslint-disable-next-line no-unused-vars
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
                  <th className={classes.ccrt__table__heading}>Name</th>
                  <th className={classes.ccrt__table__heading}>Slot Time</th>
                  <th className={classes.ccrt__table__heading}>Date</th>
                  <th className={classes.ccrt__table__heading}>Status</th>
                </tr>
              </thead>
              <tbody style={{}}>
                {patientList.map((patient, index) => {
                  return (
                    <AppointmentRow
                      key={patient.id}
                      index={index}
                      patient={patient}
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
