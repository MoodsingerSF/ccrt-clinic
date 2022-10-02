import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SettingCard from "../../components/setting/SettingCard";

const Settings = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classes.ccrt__setting__container}
    >
      <Grid container justifyContent={"center"} alignItems="center">
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

const useStyles = makeStyles((theme) => ({
  ccrt__setting__container: {
    marginTop: "12vh",
    height: "88vh",
  },
}));
export default Settings;
