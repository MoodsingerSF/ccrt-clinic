import React from "react";
import { Grid } from "@mui/material";
import { DoctorTableData } from "../../data/dashboardMenu/data";
import { makeStyles } from "@mui/styles";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import DoctorRequestRow from "./DoctorRequestRow";

const DoctorsRequest = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <table className={classes.ccrt__dashboard__dctr__req__table}>
        <thead>
          <tr className={classes.ccrt__dashboard__dctr__req__table__row}>
            <th className={classes.ccrt__dashboard__dctr__req__table__head}>
              Name
            </th>
            <th className={classes.ccrt__dashboard__dctr__req__table__head}>
              Email
            </th>
            <th className={classes.ccrt__dashboard__dctr__req__table__head}>
              Status
            </th>
            <th className={classes.ccrt__dashboard__dctr__req__table__head}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {DoctorTableData.map((doctor) => {
            return <DoctorRequestRow key={doctor.id} doctor={doctor} />;
          })}
        </tbody>
      </table>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard__dctr__req__table: {
    background: "#ffffff",
    width: "100%",
    borderCollapse: "collapse",
    margin: "25px 0",
  },
  ccrt__dashboard__dctr__req__table__row: {
    background: DEFAULT_COLOR_MINUS_2,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },

  ccrt__dashboard__dctr__req__table__head: {
    padding: "12px 0",
    width: "200px",
  },
});
export default DoctorsRequest;
