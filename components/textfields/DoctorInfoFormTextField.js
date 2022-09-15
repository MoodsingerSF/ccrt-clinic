import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const DoctorInfoFormTextField = ({
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

const useStyles = makeStyles((theme) => ({
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
