/* eslint-disable react/prop-types */
import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import PropTypes from "prop-types";
const DoctorInfoFormTextField = ({
  // eslint-disable-next-line react/prop-types
  placeholder,
  type,
  value,
  onChange,
  error = false,
  errorText = "",
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        InputProps={{
          classes: {
            input: classes.resize,
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

const useStyles = makeStyles(() => ({
  resize: {
    fontSize: "90%",
  },
  ccrt_error_text: {
    color: "red",
    fontSize: "70%",
    marginBottom: "5px",
  },
}));
export default DoctorInfoFormTextField;
