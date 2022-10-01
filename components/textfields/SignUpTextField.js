import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
const SignUpTextField = ({
  label,
  type,
  placeholder = "",
  value,
  onChange,
  error = false,
  errorText = "",
  variant = "standard",
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid item xs={12} style={{ marginBottom: "10px" }}>
      <TextField
        variant={variant}
        size="small"
        fullWidth
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        // classes={{ root: classes.root }}
        InputLabelProps={{
          style: {
            color: theme.palette.custom.BLACK,
            fontSize: "85%",
            fontWeight: 500,
            margin: 0,
            padding: 0,
          },
        }}
        InputProps={{
          className: classes.input,
        }}
      />
      {error && (
        <Typography style={{ color: "red", fontSize: "70%" }}>
          {errorText}
        </Typography>
      )}
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: "85%",
    fontWeight: 500,
    color: theme.palette.custom.BLACK,
    paddingTop: 10,
    margin: 0,
    padding: 0,
  },
  // root: {
  //   fontSize: "85%",
  //   fontWeight: "bold",
  //   color: theme.palette.custom.BLACK,
  // },
}));

SignUpTextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
};

export default SignUpTextField;
