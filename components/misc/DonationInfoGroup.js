import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BOX_SHADOW } from "../../misc/colors";

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

const useStyles = makeStyles((theme) => ({
  ccrt__donation__text_group__container: {
    boxShadow: BOX_SHADOW,
    padding: "10px",
    borderRadius: "3px",
    margin: "20px 0",
  },
  ccrt__donate_modal__label: {
    fontSize: "85%",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  ccrt__donate_modal__text: {
    fontSize: "90%",
    fontWeight: "300",
    borderRadius: "5px",
    textAlign: "justify",
  },
}));
export default DonationInfoGroup;
