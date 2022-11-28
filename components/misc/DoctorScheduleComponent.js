import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import React from "react";
import ScheduleRow from "../dashboard/doctor/ScheduleRow";
import PropTypes from "prop-types";
const DoctorScheduleComponent = ({
  schedule,
  setSchedule,
  openSnackbar,
  openLoader,
  closeLoader,
  editable = false,
  clickable = false,
  // onClick,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <TableContainer style={{ marginTop: 20 }}>
      <Table
        aria-label="simple table"
        classes={{ root: classes.customTable }}
        size="small"
      >
        <TableHead>
          <TableRow className={classes.ccrt__doctor__time__slot__table__header}>
            <TableCell
              style={{
                width: matchesMD ? "15%" : "20%",
              }}
            >
              <Typography className={classes.tableHeaderStyle}>Day</Typography>
            </TableCell>
            <TableCell style={{ textAlign: "left" }}>
              <Typography className={classes.tableHeaderStyle}>
                Time Schedule
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.keys(schedule).map((day) => {
            return (
              <ScheduleRow
                key={day}
                editable={editable}
                day={day}
                slots={schedule[day]}
                openSnackbar={openSnackbar}
                onSuccess={(dayCode, data) => {
                  setSchedule((prev) => ({ ...prev, [dayCode]: data }));
                }}
                openLoader={openLoader}
                closeLoader={closeLoader}
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
                clickable={clickable}
                // onClick={onClick}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
DoctorScheduleComponent.propTypes = {
  schedule: PropTypes.object.isRequired,
  setSchedule: PropTypes.func,
  openSnackbar: PropTypes.func,
  openLoader: PropTypes.func,
  closeLoader: PropTypes.func,
  editable: PropTypes.bool,
  clickable: PropTypes.bool,
};
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
      borderBottom: `1.1px solid ${theme.palette.custom.BLACK}`,
      paddingBottom: 5,
    },
    tableHeaderStyle: {
      fontWeight: "bold",
      fontSize: "90%",
      color: theme.palette.custom.BLACK,
      paddingBottom: 10,
    },
  })
);

export default DoctorScheduleComponent;
