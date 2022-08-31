import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
const AppBarLink = ({ name, link }) => {
  const classes = useStyles();
  return (
    <Grid item xs className={classes.anchorContainerStyle}>
      <Grid container alignItems="center" justifyContent={"center"}>
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
      width: "100%",
      color: "inherit",
      fontSize: "85%",
      textDecoration: "none",
      textAlign: "center",
      padding: 10,
      fontWeight: 500,
      transition: "color 0.4s ease",
      "&:hover": {
        color: "#fff",
      },
    },
    anchorContainerStyle: {
      transition: "background 0.4s ease-in",
      // margin: "0 5px",
      "&:hover": {
        background: theme.palette.secondary.main,
        // color: "#fff",
      },
    },
  })
);

export default AppBarLink;
