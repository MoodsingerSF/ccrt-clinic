import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
import {
  numberInput,
  validateInput,
} from "../../../controllers/drugAddedFormController";
import DurationAddedForm from "./DurationAddedForm";

function* generateId(i) {
  while (true) {
    yield i++;
  }
}
const getId = generateId(0);

const DurationSection = ({ durations, setDurations, showAddedForm }) => {
  const classes = useStyles();
  const [days, setDays] = useState("");
  const [unit, setUnit] = useState("");
  const [showError, setShowError] = useState(false);

  const keyPress = (e) => {
    if (e.key === "Enter") {
      if (validate(days, unit)) {
        const duration = {
          id: getId.next().value,
          day: days,
          unit,
        };
        setDurations([...durations, duration]);
        setDays("");
        setUnit("");
      } else {
        setShowError(true);
      }
    }
  };

  const validate = (days, unit) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = numberInput(days) && !validateInput(unit);
    return isEverythingAllRight;
  };

  return (
    <Grid container justifyContent={"center"} alignItems="center">
      <Typography className={classes.ccrt_prescription__duration__heading}>
        Duration
      </Typography>
      <Grid container>
        {durations && (
          <Grid container>
            {durations.map((item) => (
              <Grid
                container
                justifyContent={"flex-start"}
                alignItems="center"
                key={item.id}
                className={classes.ccrt_prescription__durstion__item}
              >
                <Typography>
                  {item.day} {item.unit}
                </Typography>
              </Grid>
            ))}
          </Grid>
        )}
        {showAddedForm && (
          <DurationAddedForm
            onKeyDown={keyPress}
            days={days}
            setDays={setDays}
            showError={showError}
            validate={validate}
            unit={unit}
            setUnit={setUnit}
          />
        )}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt_prescription__duration__heading: {
      width: "100%",
      textAlign: "center",
      padding: "20px 0",
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
    },
    ccrt_prescription__duration__item: {
      padding: "0 0 0 20px",
      background: "#f1ffff",
      margin: "20px 0 5px 0",
      height: "70px",
    },
  })
);

DurationSection.propTypes = {
  durations: PropTypes.array,
  setDurations: PropTypes.func,
  showAddedForm: PropTypes.bool.isRequired,
};
export default DurationSection;
