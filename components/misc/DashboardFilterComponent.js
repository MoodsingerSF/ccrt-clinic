import React from "react";
import { MenuItem, TextField } from "@mui/material";
import PropType from "prop-types";

const DashboardFilterComponent = ({ value, onChange }) => {
  return (
    <TextField
      style={{ width: "200px" }}
      size="small"
      id="outlined-select-currency"
      select
      value={value}
      onChange={onChange}
    >
      <MenuItem value="pending">Pending</MenuItem>
      <MenuItem value="finished">Completed</MenuItem>
      <MenuItem value="cancelled">Cancelled</MenuItem>
    </TextField>
  );
};

DashboardFilterComponent.propTypes = {
  value: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
};
export default DashboardFilterComponent;
