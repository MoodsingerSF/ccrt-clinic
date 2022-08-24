import React from "react";
import { TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

const InputField = ({
  placeholder,
  onChange,
  value,
  type,
  error,
  errorText,
}) => {
  return (
    <>
      <TextField
        fullWidth
        placeholder={placeholder}
        variant="outlined"
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        style={{ marginBottom: "10px" }}
      />
      {error && (
        <Typography
          style={{ color: "red", fontSize: "70%", marginBottom: "5px" }}
        >
          {errorText}
        </Typography>
      )}
    </>
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorText: PropTypes.string,
};
export default InputField;
