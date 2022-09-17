import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";

const DurationAddedForm = ({
  onKeyDown,
  days,
  setDays,
  showError,
  validate,
  unit,
  setUnit,
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={1}
      className={classes.ccrt_prescription__durstion__form_control}
      onKeyDown={onKeyDown}
    >
      <Grid item xs={12}>
        <Typography className={classes.ccrt__prescription__duration__heading}>
          How many days
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        {showError && !validate(days) && (
          <Typography className={classes.ccrt__prescription__error__text}>
            This field is required
          </Typography>
        )}
      </Grid>
      <Grid item={6}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Unit</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={unit}
            label="Unit"
            onChange={(e) => setUnit(e.target.value)}
          >
            <MenuItem value="days">days</MenuItem>
            <MenuItem value="week">weeks</MenuItem>
            <MenuItem value="month">months</MenuItem>
            <MenuItem value="year">years</MenuItem>
          </Select>
          {showError && validate(unit) && (
            <Typography className={classes.ccrt__prescription__error__text}>
              This field is required
            </Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt_prescription__durstion__form_control: {
      padding: "20px 0 10px 20px",
    },
    ccrt__prescription__error__text: {
      color: "red",
      fontSize: "70%",
      marginBottom: "5px",
    },
    ccrt__prescription__duration__heading: {
      fontSize: "90%",
      color: grey[600],
    },
  })
);

DurationAddedForm.propTypes = {
  onKeyDown: PropTypes.func,
  days: PropTypes.string,
  setDays: PropTypes.func,
  showError: PropTypes.bool,
  validate: PropTypes.func,
  unit: PropTypes.string,
  setUnit: PropTypes.func,
};
export default DurationAddedForm;
