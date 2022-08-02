import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { DoctorTableData } from "../../data/dashboardMenu/data";
import { makeStyles } from "@mui/styles";
import { DEFAULT_COLOR_MINUS_2 } from "../../misc/colors";
import DoctorRequestRow from "./DoctorRequestRow";
import classNames from "classnames";

const DoctorsRequest = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container>
      <table className={classes.ccrt__dashboard__dctr__req__table}>
        <thead>
          <tr className={classes.ccrt__dashboard__dctr__req__table__row}>
            <th
              className={classNames({
                [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                  !matchesSm,
                [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                  matchesSm,
              })}
            >
              Name
            </th>
            <th
              className={classNames({
                [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                  !matchesSm,
                [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                  matchesSm,
              })}
            >
              Email
            </th>
            <th
              className={classNames({
                [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                  !matchesSm,
                [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                  matchesSm,
              })}
            >
              Status
            </th>
            <th
              className={classNames({
                [classes.ccrt__dashboard__dctr__req__table__head__mobile]:
                  !matchesSm,
                [classes.ccrt__dashboard__dctr__req__table__head__desktop]:
                  matchesSm,
              })}
            >
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
    background: "#F7F8FC",
    minWidth: "100%",
    width: "auto",
    borderCollapse: "collapse",
    margin: "25px 0",
  },
  ccrt__dashboard__dctr__req__table__row: {
    background: DEFAULT_COLOR_MINUS_2,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },

  ccrt__dashboard__dctr__req__table__head__desktop: {
    padding: "12px 0",
    // width: "200px",
    fontSize: "100%",
  },
  ccrt__dashboard__dctr__req__table__head__mobile: {
    fontSize: "80%",
    padding: "12px 0",
  },
});
export default DoctorsRequest;
