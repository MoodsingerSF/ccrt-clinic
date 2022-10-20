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
      padding: "10px 0px",
      position: "absolute",
      bottom: 0,
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
