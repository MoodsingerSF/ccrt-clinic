import React from "react";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import PropType from "prop-types";
import { makeStyles } from "@mui/styles";
import { capitalize, lowerCase } from "lodash";

const DashboardFilterComponent = ({ value, onChange, options }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <FormControl fullWidth>
        <Select
          classes={{ select: classes.select }}
          value={value}
          onChange={onChange}
          inputProps={{ "aria-label": "Without label" }}
        >
          {Object.keys(options).map((key) => (
            <MenuItem
              style={{ fontSize: "85%" }}
              key={key}
              value={options[key]}
            >
              {capitalize(lowerCase(key))}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

DashboardFilterComponent.propTypes = {
  value: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
  options: PropType.array.isRequired,
};

const useStyles = makeStyles((theme) => ({
  select: {
    fontSize: "85%",
    color: theme.palette.custom.BLACK,
    margin: 0,
    padding: "5px 10px",
    textAlign: "center",
    textTransform: "capitalize",
  },
  root: {
    width: "100%",
  },
}));
export default DashboardFilterComponent;
