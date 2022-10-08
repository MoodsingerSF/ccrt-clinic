import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
import { DatePicker } from "@mui/x-date-pickers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { prettyDate2 } from "../../controllers/DateController";
const BasicDatePicker = ({
  label = "",
  value,
  onChange,
  error = false,
  errorText = "",
  format = false,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  let dateDetails = null;
  if (value && value["$d"]) dateDetails = prettyDate2(value["$d"]);

  return (
    <Grid container item xs={12}>
      {dateDetails && (
        <Grid container alignItems={"center"}>
          <Grid item>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Typography className={classes.dayStyle}>
                {dateDetails.day}
              </Typography>
              <IconButton
                aria-label="select date"
                size="small"
                style={{ color: theme.palette.custom.BLACK }}
                onClick={() => setOpen(true)}
              >
                <CalendarMonthIcon style={{ fontSize: "120%" }} />
              </IconButton>
            </Grid>
            <Grid container>
              <Typography className={classes.monthStyle}>
                {dateDetails.month}
              </Typography>
              <Typography className={classes.dateStyle}>
                {dateDetails.date}, {dateDetails.year}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography className={classes.titleStyle}>{label}</Typography>
          </Grid>
        </Grid>
      )}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          orientation="portrait"
          open={open}
          label={label}
          value={value}
          showToolbar={false}
          onClose={() => setOpen(false)}
          onChange={onChange}
          style={{ padding: 0, margin: 0 }}
          renderInput={() => null}
          inputFormat={format ? "YYYY-MM-DD" : "DD-MM-YYYY"}
        />
      </LocalizationProvider>
      {error && (
        <Typography style={{ color: "red", fontSize: "70%" }}>
          {errorText}
        </Typography>
      )}
    </Grid>
  );
};
BasicDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  format: PropTypes.bool,
};
const useStyles = makeStyles((theme) => ({
  root: {
    // background: theme.palette.custom.BLACK,
    // borderRadius: 10,
  },
  input: {
    color: theme.palette.custom.BLACK,
    fontSize: "100%",
    fontWeight: 500,
  },
  dayStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "200%",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  monthStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "120%",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  dateStyle: {
    fontSize: "120%",
    marginLeft: 10,
    color: theme.palette.custom.BLACK,
    fontWeight: "bold",
  },
  titleStyle: {
    fontSize: "100%",
    marginLeft: 30,
    color: theme.palette.custom.BLACK,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
}));
export default BasicDatePicker;
