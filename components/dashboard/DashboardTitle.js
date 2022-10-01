import { Grid, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
const DashboardTitle = ({ title, children }) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Typography className={classes.titleStyle}>{title}</Typography>
      <Grid item xs={2}>
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
