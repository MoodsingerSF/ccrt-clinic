import { Grid, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { createStyles, makeStyles } from "@mui/styles";
const DonationLink = ({ icon, title, onClick }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      onClick={() => {
        if (onClick) onClick();
      }}
      alignItems="center"
      style={{ cursor: "pointer" }}
    >
      {icon}
      <Typography className={classes.titleStyle}>{title}</Typography>
    </Grid>
  );
};
DonationLink.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const useStyles = makeStyles(() =>
  createStyles({
    titleStyle: {
      color: "white",
      fontSize: "85%",
      fontWeight: "500",
      marginLeft: 10,
    },
  })
);

export default DonationLink;
