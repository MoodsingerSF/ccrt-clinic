import React from "react";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";

const ContactPageCard = ({ icon, heading, text }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} lg={4}>
      <Grid container className={classes.ccrt__contact_page_card_wrapper}>
        <Grid container className={classes.ccrt__contact_page_card_icon}>
          {icon}
        </Grid>
        <h5 className={classes.ccrt__contact_page_card_heading}>{heading}</h5>
        <Grid container>
          <Typography className={classes.valueStyle}>{text}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__contact_page_card_wrapper: {
    position: "relative",
    background: "#f2f7ff",
    padding: "30px 20px 30px 140px",
    transition: "transform 0.15s ease-in-out,background 0.15s ease-in-out",
  },
  ccrt__contact_page_card_icon: {
    position: "absolute",
    left: "30px",
    top: "0",
    bottom: "0",
    margin: "auto",
    width: "88px",
    height: "88px",
    background: theme.palette.custom.BLACK,
    padding: "25px",
    borderRadius: "50%",
    textAlign: "center",
    color: "#fff",
  },
  ccrt__contact_page_card_heading: {
    fontSize: "100%",
    lineHeight: "26px",
    fontWeight: "bold",
    margin: "0 0 8px",
    color: theme.palette.custom.BLACK,
  },
  valueStyle: {
    fontSize: "85%",
    fontWeight: "500",
    margin: "0 0 8px",
    color: theme.palette.custom.BLACK,
  },
}));
ContactPageCard.propTypes = {
  icon: PropTypes.element,
  heading: PropTypes.string,
  text: PropTypes.string,
};
export default ContactPageCard;
