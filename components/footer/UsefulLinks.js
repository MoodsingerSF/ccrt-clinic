import React from "react";
import { Grid } from "@mui/material";
import Link from "next/link";
import { makeStyles } from "@mui/styles";
import { useful_links_data, USEFUL_LINKS_TITLE } from "../../data/footer/data";

const UsefulLinks = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4}>
      <h3>{USEFUL_LINKS_TITLE}</h3>
      {useful_links_data.map((link) => (
        <Link key={link.id} href={link.link}>
          <a className={classes.ccrt__footer__link}>{link.heading}</a>
        </Link>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__footer__link: {
    display: "flex",
    color: "inherit",
    textDecoration: "none",
    fontSize: "90%",
    fontWeight: "500",
    transition: "color 0.12s ease",
    "&:hover": {
      color: theme.palette.primary.main_minus_2,
    },
  },
}));
export default UsefulLinks;
