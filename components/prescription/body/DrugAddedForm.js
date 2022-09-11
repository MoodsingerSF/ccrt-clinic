import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { validateInput } from "../../../controllers/drugAddedFormController";

function* generateId(i) {
  while (true) {
    yield i++;
  }
}
const getId = generateId(0);

const DrugAddedForm = ({ drugLists, setDrugLists }) => {
  const classes = useStyles();

  const [drugName, setDrugName] = useState("");
  const [perDay, setPerDay] = useState("");
  const [when, setWhen] = useState("before eat");
  const [showError, setShowError] = useState(false);

  const handleSubmitDrugName = () => {
    if (validate(drugName, perDay)) {
      const drug = {
        id: getId.next().value,
        drugName,
        perDay,
        when,
      };
      setDrugLists([...drugLists, drug]);
      setDrugName("");
      setPerDay("");
    } else {
      setShowError(true);
    }
  };
  const validate = (drugName, perDay) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = !validateInput(drugName) && !validateInput(perDay);
    return isEverythingAllRight;
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt__prescription__form__wrapper}
    >
      <Grid
        container
        justifyContent={"flex-start"}
        alignItems="center"
        style={{ padding: "0 20px" }}
      >
        <TextField
          size="small"
          placeholder="Write drug name"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          className={classes.ccrt__prescription__form__input}
        />
        {showError && !validate(drugName) && (
          <Typography
            style={{ color: "red", fontSize: "70%", marginBottom: "5px" }}
          >
            This field is required
          </Typography>
        )}
      </Grid>
      <Grid container alignItems="center" flexDirection="row">
        <Grid className={classes.ccrt__prescription__form__input_group}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Per day
            </FormLabel>
            <TextField
              size="small"
              variant="outlined"
              placeholder="1+1+1"
              value={perDay}
              onChange={(e) => setPerDay(e.target.value)}
            />
            {showError && !validate(perDay) && (
              <Typography
                style={{ color: "red", fontSize: "70%", marginBottom: "5px" }}
              >
                This field is required
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid className={classes.ccrt__prescription__form__input_group}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">When</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
            >
              <FormControlLabel
                value="before eat"
                control={<Radio size="small" />}
                label="Before Eat"
              />
              <FormControlLabel
                value="after eat"
                control={<Radio size="small" />}
                label="After Eat"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.ccrt__prescription__form__save_button}>
        <Button fullWidth variant="contained" onClick={handleSubmitDrugName}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__form__wrapper: {
      border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      padding: "10px 0",
      margin: "20px 20px 0",
      borderRadius: "5px",
    },
    ccrt__prescription__form__input: {
      width: "100%",
      marginBottom: "5px",
    },
    ccrt__prescription__form__input_group: {
      marginTop: "5px",
      paddingLeft: "20px",
    },
    ccrt__prescription__form__save_button: {
      padding: "0 20px",
      marginTop: "10px",
    },
  })
);
export default DrugAddedForm;
