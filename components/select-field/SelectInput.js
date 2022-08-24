import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";

const SelectInput = ({ value, label, onChange, times }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 130 }} size="small">
      <InputLabel id="demo-select-small" style={{ fontSize: "90%" }}>
        {label}
      </InputLabel>
      <Select value={value} label={label} onChange={onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {times.map((time, index) => (
          <MenuItem key={index} value={time}>
            {time}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectInput.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  times: PropTypes.array,
};
export default SelectInput;
