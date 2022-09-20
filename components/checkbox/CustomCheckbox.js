import { FormControlLabel, Radio, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { capitalize, lowerCase } from "lodash";
const CustomCheckbox = ({ name, checked, value, onChange }) => {
  return (
    <FormControlLabel
      value="female"
      control={
        <Radio
          size="small"
          value={value}
          checked={checked}
          onChange={onChange}
        />
      }
      label={
        <Typography style={{ fontSize: "90%" }}>
          {capitalize(lowerCase(name))}
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
