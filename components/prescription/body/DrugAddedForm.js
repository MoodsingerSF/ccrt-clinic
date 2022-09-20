import React, { useState } from "react";
import {
  FormControlLabel,
  Grid,
  TextField,
  Button,
  Typography,
  FormGroup,
  Checkbox,
  Switch,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { validateInput } from "../../../controllers/drugAddedFormController";
import PropTypes from "prop-types";
function* generateId(i) {
  while (true) {
    yield i++;
  }
}
const getId = generateId(0);

const DrugAddedForm = ({ setDrugList }) => {
  const classes = useStyles();

  const [drugName, setDrugName] = useState("");
  const [perDay, setPerDay] = useState("");
  const [morning, setMorning] = useState(false);
  const [noon, setNoon] = useState(false);
  const [night, setNight] = useState(false);

  const [changeOption, setChangeOption] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmitDrugName = () => {
    if (validate(drugName)) {
      const drug = {
        id: getId.next().value,
        drugName,
        perDay,
        morning,
        noon,
        night,
      };
      setDrugList((prev) => [...prev, drug]);
      setDrugName("");
      setPerDay("");
    } else {
      setShowError(true);
    }
  };
  const validate = (drugName) => {
    let isEverythingAllRight = true;
    isEverythingAllRight = !validateInput(drugName);
    // && !validateInput(perDay);
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
      <Grid
        container
        justifyContent={"space-between"}
        alignItems="center"
        className={classes.ccrt__prescription__form__input_group}
      >
        <Typography
          style={{ color: "grey", fontSize: "90%", marginTop: "10px" }}
        >
          When to eat
        </Typography>
        <FormControlLabel
          control={
            <Switch
              size="small"
              defaultChecked
              onChange={() => setChangeOption(!changeOption)}
            />
          }
        />
      </Grid>
      <Grid container className={classes.ccrt__prescription__form__input_group}>
        {changeOption ? (
          <Grid container justifyContent={"center"} alignItems="center">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    value={morning}
                    onChange={() => setMorning(true)}
                  />
                }
                label="Morning"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    value={morning}
                    onChange={() => setNoon(true)}
                  />
                }
                label="Noon"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    value={morning}
                    onChange={() => setNight(true)}
                  />
                }
                label="Night"
              />
            </FormGroup>
          </Grid>
        ) : (
          <>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Write rules"
              value={perDay}
              onChange={(e) => setPerDay(e.target.value)}
            />
            {/* {!changeOption
              ? showError &&
                !validate(perDay) && (
                  <Typography
                    className={
                      classes.ccrt__prescription__drug_added_form__error__text
                    }
                  >
                    This field is required
                  </Typography>
                )
              : null} */}
          </>
        )}
      </Grid>

      <Grid container className={classes.ccrt__prescription__form__save_button}>
        <Button fullWidth variant="contained" onClick={handleSubmitDrugName}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

DrugAddedForm.propTypes = {
  setDrugList: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__form__wrapper: {
      border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      padding: "10px 0",
      margin: "20px 20px 10px 20px",
      borderRadius: "5px",
    },
    ccrt__prescription__form__input: {
      width: "100%",
      marginBottom: "5px",
    },
    ccrt__prescription__form__input_group: {
      marginTop: "5px",
      padding: "0 20px",
    },
    ccrt__prescription__form__save_button: {
      padding: "0 20px",
      marginTop: "10px",
    },
    ccrt__prescription__drug_added_form__error__text: {
      color: "red",
      fontSize: "70%",
      marginBottom: "5px",
    },
  })
);
export default DrugAddedForm;
