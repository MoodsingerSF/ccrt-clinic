import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
const SignUpTextField = ({
  label,
  type,
  placehlder = "",
  value,
  onChange,
  // shrink = false,
  error = false,
  errorText = "",
}) => {
  return (
    <Grid style={{ marginBottom: "10px" }}>
      <TextField
        size="small"
        fullWidth
        label={label}
        type={type}
        placeholder={placehlder}
        value={value}
        onChange={(e) => onChange(e)}
        InputLabelProps={{
          shrink: true,
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

SignUpTextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
  placehlder: PropTypes.string,
};

export default SignUpTextField;
