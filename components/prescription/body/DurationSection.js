import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { validateInput } from "../../../controllers/drugAddedFormController";

function* generateId(i) {
  while (true) {
    yield i++;
  }
}
const getId = generateId(0);

const DurationSection = ({ durations, setDurations, showAddedForm }) => {
  const classes = useStyles();
  const [days, setDays] = useState("");
  const [showError, setShowError] = useState(false);

  const keyPress = (e) => {
    if (e.key === "Enter") {
      if (validate(days)) {
        const duration = {
          id: getId.next().value,
          day: days,
        };
        setDurations([...durations, duration]);
        setDays("");
      } else {
        setShowError(true);
      }
    }
  };

  const validate = (days) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = !validateInput(days);
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
            {durations.map((item, index) => (
              <Grid
                container
                justifyContent={"flex-start"}
                alignItems="center"
                key={item.id}
                className={classes.ccrt_prescription__durstion__item}
              >
                {/* <Typography style={{ marginRight: "5px" }}>
                  {index + 1}.
                </Typography> */}
                <Typography>{item.day}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
        {showAddedForm && (
          <Grid container>
            <FormControl
              className={classes.ccrt_prescription__durstion__form_control}
            >
              <FormLabel id="demo-row-radio-buttons-group-label">
                How many days
              </FormLabel>

              <TextField
                size="small"
                variant="outlined"
                placeholder="7 days"
                value={days}
                onKeyDown={keyPress}
                onChange={(e) => setDays(e.target.value)}
              />
              {showError && !validate(days) && (
                <Typography
                  style={{ color: "red", fontSize: "70%", marginBottom: "5px" }}
                >
                  This field is required
                </Typography>
              )}
            </FormControl>
          </Grid>
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
    ccrt_prescription__durstion__item: {
      padding: "0 0 0 20px",
      background: "#f1ffff",
      margin: "20px 0 5px 0",
      height: "70px",
    },
    ccrt_prescription__durstion__form_control: {
      padding: "20px 0 0 20px",
    },
  })
);

DurationSection.propTypes = {
  durations: PropTypes.array,
  setDurations: PropTypes.func,
  showAddedForm: PropTypes.bool.isRequired,
};
export default DurationSection;
