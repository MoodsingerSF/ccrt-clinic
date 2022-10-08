import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import CustomButton from "../button/CustomButton";

const SettingCard = ({ title, buttonText, link }) => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
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
        <CustomButton
          title={buttonText}
          onClick={() => router.push(link)}
          color={theme.palette.custom.GREEN}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__setting__card__container: {
    width: "80%",
    padding: "40px 20px",
    borderRadius: "5px",
    background: theme.palette.custom.BLACK,
    marginTop: "20px",
  },
  ccrt__setting__text: {
    textTransform: "capitalize",
    fontSize: "90%",
    color: "white",
    fontWeight: 500,
  },
}));

SettingCard.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default SettingCard;
