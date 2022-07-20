import { TextField } from "@mui/material";
import React from "react";

const SignUpTextField = ({ label, type }) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="standard"
      style={{ marginBottom: "5px" }}
      type={type}
    />
  );
};

export default SignUpTextField;
