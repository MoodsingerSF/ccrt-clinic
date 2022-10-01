import React from "react";
import { Grid, Typography } from "@mui/material";
// import MiddleSection from "./middle/MiddleSection";
import PropTypes from "prop-types";
// import SelectGender from "./middle/SelectGender";
import { makeStyles, createStyles } from "@mui/styles";
import { capitalize, lowerCase } from "lodash";

const PrescriptionMiddle = ({
  patientName,
  // setPatientName,
  patientGender,
  // setPatientGender,
  patientAge,
  // setPatientAge,
}) => {
  const classes = useStyles();
  // const [isEditMood, setIsEditMood] = useState(false);

  return (
    <Grid container>
      <Grid item xs={4} container className={classes.leftSide}></Grid>
      <Grid
        item
        xs={8}
        container
        justifyContent={"flex-end"}
        alignItems="center"
        className={classes.ccrt__prescription__middle__container}
      >
        <Grid
          item
          xs={9}
          direction={"row"}
          container
          justifyContent="flex-end"
          spacing={3}
        >
          <Grid item>
            <Grid container>
              <Typography
                className={classes.textTitleStyle}
              >{`Name: `}</Typography>
              <Typography className={classes.textStyle}>
                {patientName}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Typography className={classes.textTitleStyle}>
                {`Gender: `}
              </Typography>
              <Typography className={classes.textStyle}>
                {capitalize(lowerCase(patientGender))}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Typography
                className={classes.textTitleStyle}
              >{`Age: `}</Typography>
              <Typography className={classes.textStyle}>
                {patientAge}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__middle__container: {
      borderBottom: `1.4px solid ${theme.palette.custom.BLACK}`,
      padding: "20px",
    },
    textStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "85%",
      fontWeight: 500,
      textTransform: "capitalize",
      marginLeft: 5,
    },
    textTitleStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "90%",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    leftSide: {
      background: theme.palette.custom.BLACK,
    },
  })
);
PrescriptionMiddle.propTypes = {
  patientName: PropTypes.string.isRequired,
  // setPatientName: PropTypes.func.isRequired,
  patientGender: PropTypes.string.isRequired,
  // setPatientGender: PropTypes.func.isRequired,
  patientAge: PropTypes.string.isRequired,
  // setPatientAge: PropTypes.func.isRequired,
};
export default PrescriptionMiddle;
