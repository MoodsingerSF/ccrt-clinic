import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

const SettingCard = ({ title, buttonText, link }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt__setting__card__container}
    >
      <Grid container item xs={12} lg={6}>
        <Typography className={classes.ccrt__setting__text}>{title}</Typography>
      </Grid>
      <Grid container item xs={12} lg={6} justifyContent="flex-end">
        <Typography
          className={classes.ccrt__setting__button}
          onClick={() => router.push(link)}
        >
          {buttonText}
        </Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__setting__card__container: {
    width: "80%",
    padding: "40px 20px",
    borderRadius: "5px",
    background: "#9180BA",
    marginTop: "20px",
  },
  ccrt__setting__text: {
    textTransform: "capitalize",
    fontSize: "102%",
    color: "#fff",
  },
  ccrt__setting__button: {
    background: "#9DCB80",
    padding: "10px 50px",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "80%",
    cursor: "pointer",
    textTransform: "uppercase",
  },
}));

SettingCard.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default SettingCard;
