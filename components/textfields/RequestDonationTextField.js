import React from "react";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const RequestDonationTextField = ({
  label,
  value,
  onChange,
  adornment,
  error,
  errorText,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent={"flex-start"}
      alignItems="center"
      className={classes.ccrt_textField_container}
    >
      <Typography className={classes.ccrt_textField_label}>{label}</Typography>
      <Grid container>
        <TextField
          fullWidth
          size="small"
          value={value}
          onChange={(e) => onChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{adornment}</InputAdornment>
            ),
            classes: {
              input: classes.resize,
            },
          }}
        />
        {error && (
          <Typography style={{ color: "red", fontSize: "70%" }}>
            {errorText}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt_textField_container: {
    marginBottom: "15px",
    width: "100%",
  },
  ccrt_textField_label: {
    marginBottom: "5px",
    fontSize: "80%",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  resize: {
    fontSize: "95%",
    fontWeight: "400",
    letterSpacing: "1px",
  },
}));
export default RequestDonationTextField;
