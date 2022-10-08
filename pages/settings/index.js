import React, { useContext } from "react";
import { Grid } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import SettingCard from "../../components/setting/SettingCard";
import Lottie from "lottie-react";
import animationData from "../../public/animations/settings.json";
import { Context } from "../../contexts/user-context/UserContext";
import ForbiddenComponent from "../../components/misc/ForbiddenComponent";
import { isGuest } from "../../controllers/UserController";
import { APP_BAR_HEIGHT, BODY_HEIGHT } from "../../misc/constants";
const Settings = () => {
  const { getRole } = useContext(Context);
  const classes = useStyles();
  const theme = useTheme();
  if (isGuest(getRole())) return <ForbiddenComponent />;
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt__setting__container}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        container
        justifyContent={"center"}
        alignItems="center"
        style={{ background: theme.palette.custom.BLACK, height: "100%" }}
      >
        <Lottie
          animationData={animationData}
          style={{ height: "50vh", width: "100%" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        container
        justifyContent={"center"}
        alignItems="center"
      >
        <SettingCard
          title={"Change your account password"}
          buttonText={"change password"}
          link={"/settings/change-password"}
        />
        <SettingCard
          title={"update your profile information"}
          buttonText={"update profile"}
          link={"/dashboard/profile"}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__setting__container: {
    marginTop: APP_BAR_HEIGHT,
    height: BODY_HEIGHT,
  },
}));
export default Settings;
