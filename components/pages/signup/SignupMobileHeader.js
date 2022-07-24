import React from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../../public/image/logo/logo.png";

const SignupMobileHeader = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      item
      sm={12}
      alignItems="flex-start"
      justifyContent={"center"}
      className={classes.ccrt__signup__left}
    >
      <Image src={logo} alt="ccrt logo" />
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__signup__left: {
    padding: "20px 30px",
  },
});
export default SignupMobileHeader;
