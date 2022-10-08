import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import PropTypes from "prop-types";
import { lowerCase } from "lodash";
const DrugDetailsCard = ({
  serialNo,
  drugName,
  hasPerDayRule,
  perDayRule,
  morning,
  noon,
  night,
  duration,
  timeGapWithMeal,
  relationWithMeal,
}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.ccrt__prescription__drug_item}>
      <Grid container direction="row">
        <Grid item container direction="row">
          <Typography
            className={classes.titleStyle}
          >{`${serialNo}. Drug Name: `}</Typography>
          <Typography className={classes.ccrt__prescription__drug__perDay}>
            {drugName}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        flexDirection={"column"}
        className={classes.ccrt__prescription__drug__rule}
      >
        <Grid container>
          <Typography className={classes.titleStyle}>{`Schedule: `}</Typography>
          <Typography className={classes.ccrt__prescription__drug__perDay}>
            {hasPerDayRule ? (
              perDayRule
            ) : (
              <>
                {morning ? "1" : "0"}
                {"+"}
                {noon ? "1" : "0"}
                {"+"}
                {night ? "1" : "0"}
              </>
            )}
          </Typography>
        </Grid>
        {timeGapWithMeal && relationWithMeal && (
          <Grid container>
            <Typography
              className={classes.titleStyle}
            >{`When to Eat: `}</Typography>
            <Typography className={classes.ccrt__prescription__drug__perDay}>
              {`${timeGapWithMeal} ${lowerCase(relationWithMeal)} meal`}
            </Typography>
          </Grid>
        )}
        {duration && duration !== "" && duration !== " " && (
          <Grid container>
            <Typography
              className={classes.titleStyle}
            >{`Duration: `}</Typography>
            <Typography className={classes.ccrt__prescription__drug__perDay}>
              {`${duration}`}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
DrugDetailsCard.propTypes = {
  serialNo: PropTypes.number.isRequired,
  drugName: PropTypes.string.isRequired,
  hasPerDayRule: PropTypes.bool.isRequired,
  perDayRule: PropTypes.string,
  morning: PropTypes.bool,
  noon: PropTypes.bool,
  night: PropTypes.bool,
  duration: PropTypes.string.isRequired,
  timeGapWithMeal: PropTypes.string,
  relationWithMeal: PropTypes.string,
};
const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__prescription__drug_item: {
      width: "100%",
      padding: "10px 0px",
      // padding: "0 0 0 20px",
      // background: "#f1ffff",
      // margin: "20px 0 5px 0",
      // height: "70px",
    },
    ccrt__prescription__drug_item__index: {
      marginRight: "5px",
      color: theme.palette.custom.BLACK,
      fontWeight: 500,
      fontSize: "85%",
    },
    ccrt__prescription__drug_name: {
      fontSize: "85%",
      fontWeight: "bold",
      color: theme.palette.custom.BLACK,
      textTransform: "capitalize",
    },
    ccrt__prescription__drug__rule: {
      marginLeft: "20px",
    },
    ccrt__prescription__drug__perDay: {
      fontSize: "85%",
      fontWeight: 500,
      color: theme.palette.custom.BLACK,
    },
    ccrt__prescription__drug__when: {
      fontSize: "90%",
      marginLeft: "20px",
    },
    titleStyle: {
      color: theme.palette.custom.BLACK,
      fontSize: "85%",
      fontWeight: 600,
      marginRight: 5,
    },
  })
);

export default DrugDetailsCard;
