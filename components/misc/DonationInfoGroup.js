import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
const DonationInfoGroup = ({ label, text }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      flexDirection={"column"}
      className={classes.ccrt__donation__text_group__container}
    >
      <Typography className={classes.ccrt__donate_modal__label}>
        {label}:
      </Typography>
      <Typography className={classes.ccrt__donate_modal__text}>
        {text}
      </Typography>
    </Grid>
  );
};

DonationInfoGroup.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  ccrt__donation__text_group__container: {
    // boxShadow: BOX_SHADOW,
    padding: "10px",
    borderRadius: "3px",
    margin: "20px 0",
    background: theme.palette.custom.BLACK,
  },
  ccrt__donate_modal__label: {
    fontSize: "85%",
    fontWeight: "bold",
    textTransform: "capitalize",
    color: theme.palette.custom.GREEN,
  },
  ccrt__donate_modal__text: {
    fontSize: "85%",
    fontWeight: "500",
    borderRadius: "5px",
    textAlign: "justify",
    color: "white",
  },
}));
export default DonationInfoGroup;
