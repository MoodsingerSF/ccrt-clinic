import React, { useState } from "react";
import {
  createStyles,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { DASHBOARD_TITLE_MARGIN_TOP } from "../../misc/constants";
import DashboardTitle from "./DashboardTitle";
import { makeStyles } from "@mui/styles";
import NoContentToShowComponent from "../misc/NoContentToShowComponent";
import DoctorHistoryRow from "./DoctorHistoryRow";
import DashboardLoaderComponent from "./DashboardLoaderComponent";

const DoctorHistory = () => {
  const classes = useStyle();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [patientList, setPatientList] = useState([
    {
      id: "1",
      name: "shakil",
      timeSlot: "10.00 AM - 10.20 AM",
      date: "12-09-2022",
      status: "complete",
    },
    {
      id: "2",
      name: "Apple",
      timeSlot: "10.30 AM - 10.50 AM",
      date: "12-09-2022",
      status: "complete",
    },
    {
      id: "3",
      name: "Kuber",
      timeSlot: "11.00 AM - 11.20 AM",
      date: "12-09-2022",
      status: "complete",
    },
    {
      id: "4",
      name: "shakil",
      timeSlot: "10.00 AM - 10.20 AM",
      date: "12-09-2022",
      status: "complete",
    },
    {
      id: "5",
      name: "Apple",
      timeSlot: "10.30 AM - 10.50 AM",
      date: "12-09-2022",
      status: "complete",
    },
    {
      id: "6",
      name: "Kuber",
      timeSlot: "11.00 AM - 11.20 AM",
      date: "12-09-2022",
      status: "complete",
    },
    {
      id: "7",
      name: "Kuber",
      timeSlot: "11.00 AM - 11.20 AM",
      date: "12-09-2022",
      status: "complete",
    },
    {
      id: "8",
      name: "shakil",
      timeSlot: "10.00 AM - 10.20 AM",
      date: "12-09-2022",
      status: "complete",
    },
    {
      id: "9",
      name: "Apple",
      timeSlot: "10.30 AM - 10.50 AM",
      date: "12-09-2022",
      status: "complete",
    },
    {
      id: "10",
      name: "Kuber",
      timeSlot: "11.00 AM - 11.20 AM",
      date: "12-09-2022",
      status: "complete",
    },
  ]);

  return (
    <Grid container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginBottom: 10, marginTop: DASHBOARD_TITLE_MARGIN_TOP }}
      >
        <DashboardTitle title={"Patients History"} />
      </Grid>
      <Grid container>
        {loading ? (
          <DashboardLoaderComponent />
        ) : patientList.length === 0 ? (
          <NoContentToShowComponent title={"There is no history"} />
        ) : (
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow
                  className={classes.ccrt__doctor__history__table__header__row}
                >
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Time Slot</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patientList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((patient) => patient.status === "complete")
                  .map((patient, index) => {
                    return (
                      <DoctorHistoryRow
                        key={patient.id}
                        index={index}
                        userId={patient.id}
                        name={patient.name}
                        timeSlot={patient.timeSlot}
                        date={patient.date}
                        status={patient.status}
                        patientList={patientList}
                        setPatientList={setPatientList}
                      />
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={patientList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

const useStyle = makeStyles((theme) =>
  createStyles({
    table: {
      "& thead th": {
        fontWeight: "500",
        color: "#FFFFFF",
        background: theme.palette.primary.main_minus_2,
      },
      "& tbody td": {
        fontWeight: "500",
        fontSize: "90%",
        padding: "10px ",
      },
      "& tbody tr:hover": {
        background: theme.palette.custom.TABLE_HOVER_COLOR,
        cursor: "pointer",
        borderBottom: "1px solid rgba(113, 110, 182, 0.15)",
      },
    },
  })
);
export default DoctorHistory;
