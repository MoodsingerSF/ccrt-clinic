import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import PropTypes from "prop-types";
const CustomTextField = ({ placeholder = "", value, onChange }) => {
  const classes = useStyles();
  return (
    <TextField
      size="small"
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{ className: classes.input }}
    />
  );
};
CustomTextField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: "80%",
    color: theme.palette.custom.BLACK,
    fontWeight: 500,
  },
}));

export default CustomTextField;
