import React from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import { HOTLINE } from "../../../data/home/data";
import { HOTLINE_BACKGROUND } from "../../../misc/colors";

const HotlineSection = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      item
      xs={12}
      className={classes.ccrt__home_page__hotline__container}
      style={{}}
    >
      <Grid container style={{ width: "95%" }}>
        <Grid
          item
          xs={12}
          container
          flexDirection="row"
          justifyContent={"center"}
        >
          <Avatar className={classes.avatarStyle}>
            <PhoneIcon
              className={classes.ccrt__home_page__hotline__another__phone_icon}
            />
          </Avatar>
          <Typography className={classes.ccrt__home_page__hotline__textStyle}>
            {HOTLINE}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__home_page__hotline__container: {
      background: HOTLINE_BACKGROUND,
      width: "100%",
      padding: "13px 0px",
      zIndex: "99",
    },
    ccrt__home_page__hotline__textfield__wrapper: {
      position: "relative",
      borderRadius: "10px",
    },
    ccrt__home_page__hotline__textfield: {
      background: "#fff",
      borderRadius: "20px",
    },
    ccrt__home_page__hotline__textfield__button: {
      background: theme.palette.custom.DEFAULT_COLOR_2,
      padding: "4px 10px",
      borderRadius: "15px",
      color: "#fff",
      fontSize: "85%",
      marginRight: "-10px",
      "&:hover": {
        background: theme.palette.custom.DEFAULT_COLOR_2,
      },
    },
    ccrt__home_page__hotline__textfield__button__avatar: {
      background: "#fff",
      marginRight: "10px",
    },
    ccrt__home_page__hotline__phone__icon: {
      color: theme.palette.custom.GREEN,
      padding: "3px",
    },
    ccrt__home_page__hotline__another__phone_icon: {
      color: "white",
    },
    ccrt__home_page__hotline__textStyle: {
      textTransform: "uppercase",
      fontWeight: "700",
      fontSize: "120%",
      color: theme.palette.custom.BLACK,
      marginLeft: 10,
    },
    avatarStyle: {
      background: theme.palette.custom.BLACK,
    },
  })
);
export default HotlineSection;
