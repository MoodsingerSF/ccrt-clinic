import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
const CustomCheckbox = ({ name, checked, value, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          size="small"
          value={value}
          checked={checked}
          onChange={onChange}
        />
      }
      label={
        <Typography style={{ textTransform: "capitalize", fontSize: "100%" }}>
          {name}
        </Typography>
      }
    />
  );
};

CustomCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomCheckbox;
