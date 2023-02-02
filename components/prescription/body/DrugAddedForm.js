import React, { useState } from "react";
import {
  FormControlLabel,
  Grid,
  Typography,
  FormGroup,
  Checkbox,
  Switch,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { validateInput } from "../../../controllers/DrugAddedFormController";
import PropTypes from "prop-types";
import CustomButton from "../../button/CustomButton";
import CustomTextField from "../../textfields/CustomTextField";
import DashboardFilterComponent from "../../misc/DashboardFilterComponent";
import { RELATION_WITH_MEAL } from "../../../misc/constants";
function* generateId(i) {
  while (true) {
    yield i++;
  }
}
const getId = generateId(0);

const DrugAddedForm = ({ addDrug, onClose }) => {
  const classes = useStyles();

  const [drugName, setDrugName] = useState("");
  const [perDayRule, setPerDayRule] = useState("");
  const [morning, setMorning] = useState(false);
  const [noon, setNoon] = useState(false);
  const [night, setNight] = useState(false);
  const [days, setDays] = useState("");
  const [unit, setUnit] = useState("days");
  const [timeGap, setTimeGap] = useState(null);
  const [timeUnit, setTimeUnit] = useState("minutes");
  const [relationWithMeal, setRelationWithMeal] = useState(
    RELATION_WITH_MEAL.BEFORE
  );

  const [hasFixedScheduleRule, setHasFixedScheduleRule] = useState(false);
  const [showError, setShowError] = useState(false);
  const validateSchedule = () => {
    const rule = !hasFixedScheduleRule && (morning || noon || night);
    return rule || (hasFixedScheduleRule && perDayRule !== "");
  };

  const handleSubmitDrugName = () => {
    if (validate(drugName) && validateSchedule()) {
      const drug = {
        id: getId.next().value,
        drugName,
        perDayRule,
        morning,
        noon,
        night,
        duration: {
          value: days,
          unit,
        },

        timeGapWithMeal: timeGap ? `${timeGap} ${timeUnit}` : null,
        relationWithMeal,
      };
      addDrug(drug);
      setDrugName("");
      setPerDayRule("");
      onClose();
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
        // style={{ padding: "0 20px" }}
      >
        <Grid item xs={12}>
          <CustomTextField
            placeholder="Drug name..."
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
          />
        </Grid>

        {showError && !validate(drugName) && (
          <Typography
            className={classes.ccrt__prescription__drug_added_form__error__text}
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
        <Typography className={classes.sectionTitleStyle}>Schedule</Typography>
        <FormControlLabel
          control={
            <Switch
              size="small"
              defaultChecked
              onChange={() => setHasFixedScheduleRule(!hasFixedScheduleRule)}
            />
          }
        />
      </Grid>
      <Grid container className={classes.ccrt__prescription__form__input_group}>
        {!hasFixedScheduleRule ? (
          <Grid container justifyContent={"flex-start"} alignItems="center">
            <FormGroup row>
              <FormControlLabel
                classes={{
                  label: classes.checkboxLabelStyle,
                }}
                control={
                  <Checkbox
                    className={classes.checkboxStyle}
                    size="small"
                    value={morning}
                    onChange={() => setMorning(true)}
                  />
                }
                label="Morning"
              />
              <FormControlLabel
                classes={{
                  label: classes.checkboxLabelStyle,
                }}
                control={
                  <Checkbox
                    className={classes.checkboxStyle}
                    size="small"
                    value={morning}
                    onChange={() => setNoon(true)}
                  />
                }
                label="Noon"
              />
              <FormControlLabel
                classes={{
                  label: classes.checkboxLabelStyle,
                }}
                control={
                  <Checkbox
                    className={classes.checkboxStyle}
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
            <Grid item xs={12}>
              <CustomTextField
                placeholder="schedule..."
                value={perDayRule}
                onChange={(e) => setPerDayRule(e.target.value)}
              />
            </Grid>
          </>
        )}
      </Grid>
      <Grid container>
        {showError && !validateSchedule() && (
          <Typography
            className={classes.ccrt__prescription__drug_added_form__error__text}
          >
            This field is required
          </Typography>
        )}
      </Grid>
      <Grid container>
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <Typography className={classes.sectionTitleStyle}>
            When to Eat (optional)
          </Typography>
        </Grid>
        <Grid container spacing={1} style={{ marginTop: 5 }}>
          <Grid item xs={6}>
            <CustomTextField
              placeholder="time gap with meal"
              value={timeGap}
              onChange={(e) => setTimeGap(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <DashboardFilterComponent
              value={timeUnit}
              onChange={(e) => {
                setTimeUnit(e.target.value);
              }}
              options={{
                minutes: "minutes",
                hours: "hours",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <DashboardFilterComponent
              value={relationWithMeal}
              onChange={(e) => {
                setRelationWithMeal(e.target.value);
              }}
              options={{
                [RELATION_WITH_MEAL.AFTER]: "after meal",
                [RELATION_WITH_MEAL.BEFORE]: "before meal",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        className={classes.ccrt_prescription__duration__form_control}
        item
        xs={12}
      >
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <Typography className={classes.sectionTitleStyle}>
            Duration (optional)
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <CustomTextField
            placeholder="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <DashboardFilterComponent
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
            }}
            options={{
              days: "days",
              weeks: "weeks",
              months: "months",
              years: "years",
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent={"flex-end"}
        alignItems="center"
        className={classes.ccrt__prescription__form__save_button}
        spacing={2}
      >
        <Grid item xs={3}>
          <CustomButton title="Cancel" onClick={onClose} />
        </Grid>
        <Grid item xs={3}>
          <CustomButton title="Add" onClick={handleSubmitDrugName} />
        </Grid>
      </Grid>
    </Grid>
  );
};

DrugAddedForm.propTypes = {
  addDrug: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__form__wrapper: {
      // border: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
      padding: "30px 0",
      // margin: "20px 20px 10px 20px",
      // borderRadius: "5px",
    },
    ccrt__prescription__form__input: {
      width: "100%",
      marginBottom: "5px",
    },
    ccrt__prescription__form__input_group: {
      marginTop: 10,
      // marginBottom: 5,
      // padding: "0 20px",
    },
    ccrt__prescription__form__save_button: {
      // padding: "0 20px",
      marginTop: "10px",
    },
    ccrt__prescription__drug_added_form__error__text: {
      color: "red",
      fontSize: "70%",
      marginTop: 5,
    },
    ccrt_prescription__duration__heading: {
      width: "100%",
      textAlign: "center",
      padding: 20,
      borderBottom: `1px solid ${theme.palette.custom.DEFAULT_COLOR_3}`,
    },
    ccrt_prescription__duration__item: {
      padding: "0 0 0 20px",
      background: "#f1ffff",
      margin: "20px 0 5px 0",
      height: "70px",
    },
    checkboxLabelStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "80%",
      fontWeight: "bold",
    },
    checkboxStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "80%",
      fontWeight: "bold",
    },
    input: {
      fontSize: "80%",
      color: theme.palette.custom.BLACK,
      fontWeight: 500,
    },
    sectionTitleStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "85%",
      fontWeight: 500,
    },
  })
);
export default DrugAddedForm;
