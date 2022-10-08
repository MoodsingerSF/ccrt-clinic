import React from "react";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { useful_links_data, USEFUL_LINKS_TITLE } from "../../data/footer/data";

const UsefulLinks = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <Typography className={classes.headerStyle}>
        {USEFUL_LINKS_TITLE}
      </Typography>
      <Grid direction={"column"} container style={{ marginTop: 10 }}>
        {useful_links_data.map((link) => (
          <Grid item key={link.id}>
            <Link href={link.link}>
              <a className={classes.ccrt__footer__link}>{link.heading}</a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__footer__link: {
    display: "flex",
    // color: "inherit",
    textDecoration: "none",
    fontSize: "80%",
    fontWeight: "500",
    transition: "color 0.12s ease",
    color: theme.palette.custom.BLACK,
    "&:hover": {
      color: theme.palette.primary.main_minus_2,
    },
  },
  headerStyle: {
    color: theme.palette.custom.BLACK,
    fontWeight: "bold",
    fontSize: "130%",
    textTransform: "capitalize",
  },
}));
export default UsefulLinks;
