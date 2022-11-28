import { Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@mui/styles";
const DashboardTitle = ({ title, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid
      container
      justifyContent={isDesktop ? "space-between" : "center"}
      alignItems="center"
    >
      <Typography className={classes.titleStyle}>{title}</Typography>
      <Grid
        item
        xs={12}
        sm={3}
        md={2}
        style={{ marginTop: isDesktop ? 0 : 10 }}
      >
        {children}
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  titleStyle: {
    color: theme.palette.custom.BLACK,
    fontSize: "120%",
    fontWeight: "bold",
  },
}));

DashboardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default DashboardTitle;
