import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
const SignUpTextField = ({
  label,
  type,
  value,
  onChange,
  error = false,
  errorText = "",
}) => {
  return (
    <Grid container item xs={12}>
      <TextField
        fullWidth
        variant="standard"
        label={label}
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        style={{ marginBottom: "5px" }}
      />
      {error && (
        <Typography
          style={{ color: "red", fontSize: "70%", marginBottom: "5px" }}
        >
          {errorText}
        </Typography>
      )}
    </Grid>
  );
};

SignUpTextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
};

export default SignUpTextField;
