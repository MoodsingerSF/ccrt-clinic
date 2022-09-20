import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography } from "@mui/material";

const BasicDatePicker = ({
  label = "",
  value,
  onChange,
  error = false,
  errorText = "",
  format = false,
}) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          renderInput={(params) => (
            <TextField fullWidth size="small" {...params} />
          )}
          inputFormat={format ? "YYYY-MM-DD" : "DD-MM-YYYY"}
        />
      </LocalizationProvider>
      {error && (
        <Typography style={{ color: "red", fontSize: "70%" }}>
          {errorText}
        </Typography>
      )}
    </>
  );
};

export default BasicDatePicker;
