import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
const SignUpTextField = ({
  label = "",
  type,
  placeholder = "",
  value,
  onChange,
  error = false,
  errorText = "",
  variant = "standard",
}) => {
  return (
    <Grid container style={{ marginBottom: "10px" }}>
      <TextField
        variant={variant}
        size="small"
        fullWidth
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
      {error && (
        <Typography style={{ color: "red", fontSize: "70%" }}>
          {errorText}
        </Typography>
      )}
    </Grid>
  );
};

SignUpTextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
};

export default SignUpTextField;
