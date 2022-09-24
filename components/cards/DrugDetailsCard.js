import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import React from "react";
import PropTypes from "prop-types";
const DrugDetailsCard = ({
  serialNo,
  drugName,
  hasPerDayRule,
  perDayRule,
  morning,
  noon,
  night,
  duration,
}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.ccrt__prescription__drug_item}>
      <Typography className={classes.ccrt__prescription__drug_item__index}>
        {serialNo}.
      </Typography>
      <Typography className={classes.ccrt__prescription__drug_name}>
        {drugName}
      </Typography>

      <Grid
        container
        flexDirection={"column"}
        className={classes.ccrt__prescription__drug__rule}
      >
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
        {duration && duration !== "" && duration !== " " && (
          <Typography className={classes.ccrt__prescription__drug__perDay}>
            {`${duration}s`}
          </Typography>
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
};
const useStyles = makeStyles(() =>
  createStyles({
    ccrt__prescription__drug_item: {
      padding: "0 0 0 20px",
      // background: "#f1ffff",
      margin: "20px 0 5px 0",
      height: "70px",
    },
    ccrt__prescription__drug_item__index: {
      marginRight: "5px",
    },
    ccrt__prescription__drug_name: {
      fontSize: "100%",
      fontWeight: 500,
    },
    ccrt__prescription__drug__rule: {
      marginLeft: "20px",
    },
    ccrt__prescription__drug__perDay: {
      fontSize: "90%",
    },
    ccrt__prescription__drug__when: {
      fontSize: "90%",
      marginLeft: "20px",
    },
  })
);

export default DrugDetailsCard;
