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
          <Typography>{text}</Typography>
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
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
      background: theme.palette.primary.main_minus_2,
      color: "#fff",
    },
  },
  ccrt__contact_page_card_icon: {
    position: "absolute",
    left: "30px",
    top: "0",
    bottom: "0",
    margin: "auto",
    width: "88px",
    height: "88px",
    background: "#f7531e",
    padding: "25px",
    borderRadius: "50%",
    textAlign: "center",
    color: "#fff",
  },
  ccrt__contact_page_card_heading: {
    fontSize: "100%",
    lineHeight: "26px",
    fontWeight: "700",
    margin: "0 0 8px",
  },
}));
ContactPageCard.propTypes = {
  icon: PropTypes.element,
  heading: PropTypes.string,
  text: PropTypes.string,
};
export default ContactPageCard;
