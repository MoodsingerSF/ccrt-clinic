import React from "react";
import { Grid } from "@mui/material";
import Link from "next/link";
import { makeStyles } from "@mui/styles";

const MiddleSection = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      item
      sm={4}
    >
      <Link href="#">
        <a className={classes.ccrt__footer__middle__section}>Contribute</a>
      </Link>
      <Link href="#">
        <a className={classes.ccrt__footer__middle__section}>Privacy Policy</a>
      </Link>
      <Link href="#">
        <a className={classes.ccrt__footer__middle__section}>Terms</a>
      </Link>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__footer__middle__section: {
    color: "inherit",
    textDecoration: "none",
    fontSize: "90%",
    fontWeight: "500",
    transition: "transform 0.12s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));
export default MiddleSection;
