import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
const AppBarLink = ({ name, link }) => {
  const classes = useStyles();
  return (
    <Grid item xs className={classes.anchorContainerStyle}>
      <Grid
        container
        alignItems="center"
        justifyContent={"center"}
        style={{ height: "100%" }}
      >
        <Link href={link}>
          <a className={classes.anchorStyle}>{name}</a>
        </Link>
      </Grid>
    </Grid>
  );
};

AppBarLink.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) =>
  createStyles({
    anchorStyle: {
      color: "black",
      fontSize: "80%",
      textDecoration: "none",
      textAlign: "center",
      padding: 10,
      fontWeight: 600,
    },
    anchorContainerStyle: {
      height: "100%",
      "&:hover": {
        background: theme.palette.secondary.main,
      },
    },
  })
);

export default AppBarLink;
