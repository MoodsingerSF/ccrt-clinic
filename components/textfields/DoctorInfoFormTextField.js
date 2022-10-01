/* eslint-disable react/prop-types */
import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
// import PropTypes from "prop-types";
const DoctorInfoFormTextField = ({
  label,
  placeholder = null,
  type,
  value,
  onChange,
  error = false,
  errorText = "",
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container>
      <TextField
        fullWidth
        size="small"
        label={label}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        InputProps={{
          classes: {
            input: classes.resize,
          },
        }}
        InputLabelProps={{
          style: {
            color: theme.palette.custom.BLACK,
            fontSize: "85%",
            fontWeight: 500,
            margin: 0,
            padding: 0,
          },
        }}
      />
      {error && (
        <Typography className={classes.ccrt_error_text}>{errorText}</Typography>
      )}
    </Grid>
  );
};

// DoctorInfoFormTextField.propTypes={
//   placeholder:Prop,
//   type,
//   value,
//   onChange,
//   error = false,
//   errorText = "",
// }

const useStyles = makeStyles((theme) => ({
  resize: {
    fontSize: "85%",
    color: theme.palette.custom.BLACK,
    fontWeight: 500,
  },
  ccrt_error_text: {
    color: theme.palette.custom.RED,
    fontSize: "70%",
    fontWeight: 500,
    marginTop: "5px",
  },
}));
export default DoctorInfoFormTextField;
